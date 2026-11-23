import prisma from '@@/lib/prisma';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import type { holidayResponse } from '@@/types';

dayjs.extend(utc);
dayjs.extend(timezone);

// 국가별 거래소 현지 시간대 기준으로 오늘 날짜를 판단
const countryTimezone: Record<string, string> = {
  US: 'America/New_York',
  JP: 'Asia/Tokyo',
};

export default defineEventHandler(async (): Promise<holidayResponse[]> => {
  const conditions = Object.entries(countryTimezone).map(([country, tz]) => ({
    country,
    holiday_date: dayjs().tz(tz).format('YYYY-MM-DD'),
  }));

  const holidays = await prisma.holiday.findMany({
    where: { OR: conditions },
    orderBy: { country: 'asc' },
  });

  return holidays.map((item) => ({
    country: item.country,
    holidayDate: item.holiday_date,
    holidayName: item.holiday_name,
    closeTime: item.close_time ? dayjs.utc(item.close_time).format('HH:mm') : null,
  }));
});
