import pinoLogger from 'pino'
import { createStream } from 'rotating-file-stream'

const rfsStream = createStream("pino-logger.log", {
    size: "10M", // rotate every 10 MegaBytes written
    interval: "1d", // rotate daily
    compress: "gzip", // compress rotated files
    path: "C://logs"
  });

export const logger = pinoLogger({
    transport: {
        target: 'pino-pretty'
    },
}, rfsStream);