import { logger } from '../utils/logger'
import prisma from '@@/lib/prisma'

export default defineNitroPlugin(async (nitroApp) => {
  try {
    await prisma.$connect();

    logger.info('✅ 데이터베이스 연결 성공: Prisma Client가 정상적으로 초기화되었습니다.')
  } catch (error: any) {
    const child = logger.child(error)
    child.error('❌ 데이터베이스 연결 실패')
    if (process.env.NODE_ENV !== 'production') {
      logger.warn('--- 서버 시작을 중단합니다. 데이터베이스 연결을 확인하세요. ---')
    }
  }

  nitroApp.hooks.hook('close', async () => {
    await prisma.$disconnect();
  });
})