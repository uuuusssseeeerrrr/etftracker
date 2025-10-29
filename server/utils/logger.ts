import pino from 'pino';

const isProduction = process.env.NODE_ENV === 'production';
const transport = {
  target: 'pino-pretty',
  options: {
    // 시간 포맷을 human-readable하게 설정
    colorize: true,
    translateTime: 'SYS:HH:MM:ss.l',
    ignore: 'pid,hostname', // 불필요한 필드 제거
  },
}

export const logger = pino({
  level: isProduction ? 'info' : 'debug',
  transport: transport,
  base: {
    env: process.env.NODE_ENV || 'unknown',
  },
});
