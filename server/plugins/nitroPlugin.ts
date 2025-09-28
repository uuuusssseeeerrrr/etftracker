import prisma from '@@/lib/prisma';

export default defineNitroPlugin(async (nitroApp) => {
  nitroApp.hooks.hook("error", async (error, { event }) => {
    console.error(`${event?.path} Application error:`, error);
  });
});