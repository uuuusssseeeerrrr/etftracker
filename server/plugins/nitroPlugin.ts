import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import dayjs from 'dayjs';

export default defineNitroPlugin(async (nitroApp) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault("Asia/Seoul");

  nitroApp.hooks.hook("error", async (error, { event }) => {
    console.error(`${event?.path} Application error:`, error);
  });
});