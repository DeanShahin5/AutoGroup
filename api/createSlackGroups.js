/**
 * Slack Group Creation API
 *
 * Creates multiple Slack group conversations in batches with automatic retry logic.
 * Handles rate limiting and network errors gracefully.
 *
 * Features:
 * - Batch processing (5 groups at a time)
 * - Automatic retry with exponential backoff (3 retries)
 * - Error handling and logging
 */

import { WebClient } from "@slack/web-api";

const token = process.env.SLACK_BOT_TOKEN;
const web = new WebClient(token);

// Utility function for adding delays between operations
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Handles POST requests to create Slack group conversations
 * @param {Object} req - Request object with groups array and message in body
 * @param {Object} res - Response object
 */
export default async function handler(req, res) {
  if (req.body.groups.length === 0) {
    return res.status(200).json({ ok: true, createdGroups: [] });
  }

  try {
    const createdGroups = [];
    const batchSize = 5;
    const groups = req.body.groups;

    const processBatch = async (batchStart, batchEnd) => {
      const batchGroups = groups.slice(batchStart, batchEnd);
      const batchCreatedGroups = [];

      const groupPromises = batchGroups.map(async (group) => {
        const memberSlackIds = group.members
          .map((member) => member.slackId)
          .filter(Boolean);

        const message = req.body.message;

        if (memberSlackIds.length < 2) {
          console.warn(
            `Group ${group.id} has too few members to create a chat.`
          );
          return null;
        }

        let retries = 3;
        let success = false;
        let groupData = null;

        while (retries > 0 && !success) {
          try {
            const result = await web.conversations.open({
              users: memberSlackIds.join(","),
            });

            if (result.ok) {
              await web.chat.postMessage({
                channel: result.channel.id,
                text: message,
              });

              groupData = {
                groupId: group.id,
                channelId: result.channel.id,
              };
              success = true;
            } else {
              console.error(
                `Failed to create chat for group ${group.id}:`,
                result.error
              );
            }
          } catch (error) {
            console.error(`Error creating chat for group ${group.id}:`, error);
            retries--;
            await delay(1000 * (4 - retries));
          }
        }

        return groupData;
      });

      const results = await Promise.all(groupPromises);

      results.forEach((result) => {
        if (result) {
          batchCreatedGroups.push(result);
        }
      });

      createdGroups.push(...batchCreatedGroups);
    };

    for (let i = 0; i < groups.length; i += batchSize) {
      const batchStart = i;
      const batchEnd = Math.min(i + batchSize, groups.length);
      await processBatch(batchStart, batchEnd);

      if (i + batchSize < groups.length) {
        await delay(500);
      }
    }

    res.status(200).json({ ok: true, createdGroups });
  } catch (error) {
    console.error("Error creating Slack group chats:", error);
    res.status(500).json({ error: error.message });
  }
}
