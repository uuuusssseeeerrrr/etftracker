import prisma from '@@/lib/prisma';

export default defineNitroPlugin(async (nitroApp) => {
  nitroApp.hooks.hook("error", async (error, { event }) => {
    console.error(`${event?.path} Application error:`, error)
  });

  try {
    await prisma.$connect();
    console.log('✅ 데이터베이스 연결 성공.');
  } catch (e) {
    console.error('❌ 서버 시작 중 치명적인 오류: 데이터베이스 연결 실패', e);
    // 💡 연결 실패 시 서버 프로세스를 종료하여 배포 문제를 조기에 파악
    process.exit(1);
  }
});