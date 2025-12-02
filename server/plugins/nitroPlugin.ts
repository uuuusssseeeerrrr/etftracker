import { logger } from '../utils/logger'

export default defineNitroPlugin(async (nitroApp) => {
  nitroApp.hooks.hook("error", async (error, { event }) => {
    const child = logger.child(error);
    child.error(`${event?.path} Application error`);
  });
});