import prisma from '@@/lib/prisma'

export default defineNitroPlugin(async (nitroApp) => {
  try {
    await prisma.$connect()

    console.log('✅ 데이터베이스 연결 성공: Prisma Client가 정상적으로 초기화되었습니다.')
  } catch (error) {
    console.error('❌ 데이터베이스 연결 실패:', error)
    if (process.env.NODE_ENV !== 'production') {
      console.log('--- 서버 시작을 중단합니다. 데이터베이스 연결을 확인하세요. ---')
      // process.exit(1) // 필요하다면 서버 프로세스 종료
    }
  }
})