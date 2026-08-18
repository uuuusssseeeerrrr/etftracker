import { logger } from '../utils/logger'

export default defineNitroPlugin(async (nitroApp) => {
  nitroApp.hooks.hook("error", async (error, { event }) => {
    logger.error(`${event?.path} Application error`, error);
  });
});