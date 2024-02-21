-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        11.3.2-MariaDB - mariadb.org binary distribution
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- etf_tracker 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `etf_tracker` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `etf_tracker`;

-- 테이블 etf_tracker.etf_list 구조 내보내기
CREATE TABLE IF NOT EXISTS `etf_list` (
  `market` varchar(10) NOT NULL DEFAULT '' COMMENT '시장코드',
  `stock_code` varchar(20) NOT NULL DEFAULT '' COMMENT '종목코드',
  `stock_name` varchar(255) DEFAULT NULL COMMENT '종목명',
  `company_name` varchar(20) DEFAULT NULL COMMENT '회사명',
  `reg_date` datetime DEFAULT NULL COMMENT '생성일',
  PRIMARY KEY (`market`,`stock_code`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='etf목록';

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 etf_tracker.etf_stock_list 구조 내보내기
CREATE TABLE IF NOT EXISTS `etf_stock_list` (
  `market` varchar(10) NOT NULL DEFAULT '' COMMENT '시장코드',
  `etf_stock_code` varchar(20) NOT NULL DEFAULT '' COMMENT 'ETF종목코드',
  `stock_code` varchar(20) NOT NULL COMMENT '일반종목코드',
  `reg_date` datetime DEFAULT NULL COMMENT '생성일',
  PRIMARY KEY (`market`,`etf_stock_code`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='ETF 주식 목록';

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 etf_tracker.stock_list 구조 내보내기
CREATE TABLE IF NOT EXISTS `stock_list` (
  `market` varchar(10) NOT NULL DEFAULT '',
  `stock_code` varchar(20) NOT NULL DEFAULT '',
  `stock_name` varchar(255) DEFAULT NULL,
  `reg_date` datetime DEFAULT NULL,
  PRIMARY KEY (`market`,`stock_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='주식목록';

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 etf_tracker.stock_price_history 구조 내보내기
CREATE TABLE IF NOT EXISTS `stock_price_history` (
  `price_index` int(11) NOT NULL DEFAULT 0 COMMENT '인덱스',
  `market` varchar(10) DEFAULT NULL COMMENT '시장코드',
  `stock_code` varchar(20) DEFAULT NULL COMMENT '종목코드',
  `open` varchar(12) DEFAULT NULL COMMENT '시가',
  `high` varchar(12) DEFAULT NULL COMMENT '고가',
  `low` varchar(12) DEFAULT NULL COMMENT '저가',
  `price` varchar(12) DEFAULT NULL COMMENT '현재가',
  `last_day_price` varchar(12) DEFAULT NULL COMMENT '전일종가',
  `tomv` varchar(16) DEFAULT NULL COMMENT '시가총액',
  `h52p` varchar(12) DEFAULT NULL COMMENT '52주최고가',
  `l52p` varchar(12) DEFAULT NULL COMMENT '52주최저가',
  `perx` varchar(10) DEFAULT NULL COMMENT 'PER',
  `pbrx` varchar(10) DEFAULT NULL COMMENT 'PBR',
  `epsx` varchar(10) DEFAULT NULL COMMENT 'EPS',
  `bpsx` varchar(10) DEFAULT NULL COMMENT 'BPS',
  `t_xprc` varchar(12) DEFAULT NULL COMMENT '원환산당일가격',
  `t_xdif` varchar(12) DEFAULT NULL COMMENT '원환산당일대비',
  `t_xrat` varchar(12) DEFAULT NULL COMMENT '원환산당일등락',
  `p_xprc` varchar(12) DEFAULT NULL COMMENT '원환산전일가격',
  `p_xdif` varchar(12) DEFAULT NULL COMMENT '원환산전일대비',
  `p_xrat` varchar(12) DEFAULT NULL COMMENT '원환산전일등락',
  `t_rate` varchar(12) DEFAULT NULL COMMENT '당일환율',
  `t_xsgn` varchar(1) DEFAULT NULL COMMENT '원환산당일기호',
  `p_xsng` varchar(1) DEFAULT NULL COMMENT '원환산전일기호',
  `e_icod` varchar(50) DEFAULT NULL COMMENT '업종(섹터)',
  `reg_date` int(11) DEFAULT NULL COMMENT '등록시간',
  PRIMARY KEY (`price_index`),
  KEY `market_stock_code` (`market`,`stock_code`),
  KEY `reg_date` (`reg_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
