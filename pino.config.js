import pinoLogger, { destination } from 'pino'

export const logger = pinoLogger({
    transport: {
        target: 'pino-pretty'
    },
},
    destination(`C://logs/pino-logger.log`));