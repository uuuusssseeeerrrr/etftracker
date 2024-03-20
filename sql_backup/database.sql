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
  `etf_name` varchar(255) DEFAULT NULL COMMENT 'ETF명',
  `company_name` varchar(50) DEFAULT NULL COMMENT '회사명',
  `reg_date` datetime DEFAULT NULL COMMENT '생성일',
  `benchmark_index` varchar(50) DEFAULT NULL COMMENT '벤치마크인덱스명',
  `index_comment` text DEFAULT NULL COMMENT '인덱스 소개',
  `trading_lot` int(11) DEFAULT NULL COMMENT '거래주수',
  `trust_fee_rate` varchar(10) DEFAULT NULL COMMENT '수수료',
  PRIMARY KEY (`market`,`stock_code`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='etf목록';

-- 테이블 데이터 etf_tracker.etf_list:~0 rows (대략적) 내보내기
INSERT INTO `etf_list` (`market`, `stock_code`, `etf_name`, `company_name`, `reg_date`, `benchmark_index`, `index_comment`, `trading_lot`, `trust_fee_rate`) VALUES
	('TSE', '2529', 'NEXT FUNDS Nomura Shareholder Yield 70 Exchange Traded Fund', 'Nomura Asset Management Co., Ltd.', '2024-02-21 19:11:35', 'Nomura Shareholder Yield 70', 'Nomura Shareholder Yield 70은 금융주를 제외하고 일본 금융상품 거래소에 상장된 보통주 중 배당금과 자사주 매입으로 구성된 활성 주주수익률을 기준으로 선정되어 70개 구성주로 구성된 벤치마크 지수입니다. ', 1, '0.308%');

-- 테이블 etf_tracker.etf_price_history 구조 내보내기
CREATE TABLE IF NOT EXISTS `etf_price_history` (
  `price_idx` int(11) NOT NULL AUTO_INCREMENT COMMENT '인덱스',
  `market` varchar(10) NOT NULL COMMENT '시장코드',
  `stock_code` varchar(20) NOT NULL COMMENT '종목코드',
  `open` varchar(12) DEFAULT NULL COMMENT '시가',
  `high` varchar(12) DEFAULT NULL COMMENT '고가',
  `low` varchar(12) DEFAULT NULL COMMENT '저가',
  `price` varchar(12) DEFAULT NULL COMMENT '현재가',
  `last_day_price` varchar(12) DEFAULT NULL COMMENT '전일종가',
  `h52p` varchar(12) DEFAULT NULL COMMENT '52주최고가',
  `l52p` varchar(12) DEFAULT NULL COMMENT '52주최저가',
  `t_xprc` varchar(12) DEFAULT NULL COMMENT '원환산당일가격',
  `t_xdif` varchar(12) DEFAULT NULL COMMENT '원환산당일대비',
  `t_xrat` varchar(12) DEFAULT NULL COMMENT '원환산당일등락',
  `p_xprc` varchar(12) DEFAULT NULL COMMENT '원환산전일가격',
  `p_xdif` varchar(12) DEFAULT NULL COMMENT '원환산전일대비',
  `p_xrat` varchar(12) DEFAULT NULL COMMENT '원환산전일등락',
  `t_rate` varchar(12) DEFAULT NULL COMMENT '당일환율',
  `reg_unixtime` int(11) DEFAULT NULL COMMENT '등록시간',
  PRIMARY KEY (`price_idx`) USING BTREE,
  KEY `market_stock_code` (`market`,`stock_code`) USING BTREE,
  KEY `reg_date` (`reg_unixtime`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=285 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 etf_tracker.etf_price_history:~0 rows (대략적) 내보내기
INSERT INTO `etf_price_history` (`price_idx`, `market`, `stock_code`, `open`, `high`, `low`, `price`, `last_day_price`, `h52p`, `l52p`, `t_xprc`, `t_xdif`, `t_xrat`, `p_xprc`, `p_xdif`, `p_xrat`, `t_rate`, `reg_unixtime`) VALUES
	(283, 'TSE', '2529', '1661.0', '1663.0', '1651.0', '1658.0', '1654.0', '1673.0', '1128.8', '14702', '35', '+0.24', '14666', '53', '-0.36', '8.8671', 1709095544),
	(284, 'TSE', '2529', '1655.0', '1673.0', '1655.0', '1673.0', '1661.0', '1674.0', '1128.8', '14914', '107', '+0.72', '14807', '27', '+0.18', '8.9144', 1709689756);

-- 뷰 etf_tracker.etf_price_info 구조 내보내기
-- VIEW 종속성 오류를 극복하기 위해 임시 테이블을 생성합니다.
CREATE TABLE `etf_price_info` (
	`marketCode` VARCHAR(10) NOT NULL COMMENT '시장코드' COLLATE 'utf8mb4_general_ci',
	`etfStockCode` VARCHAR(20) NOT NULL COMMENT '종목코드' COLLATE 'utf8mb4_general_ci',
	`etfName` VARCHAR(255) NULL COMMENT 'ETF명' COLLATE 'utf8mb4_general_ci',
	`companyName` VARCHAR(50) NULL COMMENT '회사명' COLLATE 'utf8mb4_general_ci',
	`open` VARCHAR(414) NULL COLLATE 'utf8mb4_general_ci',
	`high` VARCHAR(414) NULL COLLATE 'utf8mb4_general_ci',
	`low` VARCHAR(414) NULL COLLATE 'utf8mb4_general_ci',
	`price` VARCHAR(414) NULL COLLATE 'utf8mb4_general_ci',
	`lastDayPrice` VARCHAR(414) NULL COLLATE 'utf8mb4_general_ci',
	`h52p` VARCHAR(414) NULL COLLATE 'utf8mb4_general_ci',
	`l52p` VARCHAR(414) NULL COLLATE 'utf8mb4_general_ci',
	`tXprc` VARCHAR(414) NULL COLLATE 'utf8mb4_general_ci',
	`tXdif` VARCHAR(12) NULL COMMENT '원환산당일대비' COLLATE 'utf8mb4_general_ci',
	`tXrat` VARCHAR(13) NULL COLLATE 'utf8mb4_general_ci',
	`pXprc` VARCHAR(414) NULL COLLATE 'utf8mb4_general_ci',
	`pXdif` VARCHAR(12) NULL COMMENT '원환산전일대비' COLLATE 'utf8mb4_general_ci',
	`pXrat` VARCHAR(13) NULL COLLATE 'utf8mb4_general_ci',
	`tRate` VARCHAR(12) NULL COMMENT '당일환율' COLLATE 'utf8mb4_general_ci',
	`regDate` VARCHAR(24) NULL COLLATE 'utf8mb4_general_ci'
) ENGINE=MyISAM;

-- 테이블 etf_tracker.etf_stock_list 구조 내보내기
CREATE TABLE IF NOT EXISTS `etf_stock_list` (
  `market` varchar(10) NOT NULL DEFAULT '' COMMENT '시장코드',
  `etf_stock_code` varchar(20) NOT NULL DEFAULT '' COMMENT 'ETF종목코드',
  `stock_code` varchar(20) NOT NULL COMMENT '일반종목코드',
  `reg_date` datetime DEFAULT NULL COMMENT '생성일',
  `etf_percent` float DEFAULT NULL COMMENT 'ETF 비율',
  PRIMARY KEY (`market`,`etf_stock_code`,`stock_code`) USING BTREE,
  KEY `idx_stockCode` (`stock_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='ETF 주식 목록';

-- 테이블 데이터 etf_tracker.etf_stock_list:~70 rows (대략적) 내보내기
INSERT INTO `etf_stock_list` (`market`, `etf_stock_code`, `stock_code`, `reg_date`, `etf_percent`) VALUES
	('TSE', '2529', '1605', '2024-02-21 22:09:21', 0.0196613),
	('TSE', '2529', '1801', '2024-02-21 22:09:21', 0.0147299),
	('TSE', '2529', '1803', '2024-02-21 22:09:21', 0.00880934),
	('TSE', '2529', '1808', '2024-02-21 22:09:21', 0.00623005),
	('TSE', '2529', '1812', '2024-02-21 22:09:21', 0.0182172),
	('TSE', '2529', '1878', '2024-02-21 22:09:21', 0.0178011),
	('TSE', '2529', '1928', '2024-02-21 22:09:21', 0.019569),
	('TSE', '2529', '2269', '2024-02-21 22:09:21', 0.0139279),
	('TSE', '2529', '2503', '2024-02-21 22:09:21', 0.0188146),
	('TSE', '2529', '2768', '2024-02-21 22:09:21', 0.00882258),
	('TSE', '2529', '2784', '2024-02-21 22:09:21', 0.0071547),
	('TSE', '2529', '2914', '2024-02-21 22:09:21', 0.019571),
	('TSE', '2529', '3231', '2024-02-21 22:09:21', 0.00771184),
	('TSE', '2529', '3405', '2024-02-21 22:09:21', 0.0075923),
	('TSE', '2529', '4005', '2024-02-21 22:09:21', 0.00825641),
	('TSE', '2529', '4021', '2024-02-21 22:09:21', 0.0113086),
	('TSE', '2529', '4042', '2024-02-21 22:09:21', 0.00783386),
	('TSE', '2529', '4182', '2024-02-21 22:09:21', 0.00650004),
	('TSE', '2529', '4183', '2024-02-21 22:09:21', 0.0121902),
	('TSE', '2529', '4204', '2024-02-21 22:09:21', 0.0126819),
	('TSE', '2529', '4324', '2024-02-21 22:09:21', 0.0130892),
	('TSE', '2529', '4452', '2024-02-21 22:09:21', 0.0185014),
	('TSE', '2529', '4502', '2024-02-21 22:09:21', 0.0196985),
	('TSE', '2529', '4503', '2024-02-21 22:09:21', 0.0187341),
	('TSE', '2529', '4507', '2024-02-21 22:09:21', 0.0191601),
	('TSE', '2529', '4528', '2024-02-21 22:09:21', 0.0165681),
	('TSE', '2529', '4536', '2024-02-21 22:09:21', 0.00862514),
	('TSE', '2529', '4613', '2024-02-21 22:09:21', 0.0070411),
	('TSE', '2529', '4716', '2024-02-21 22:09:21', 0.00641014),
	('TSE', '2529', '4732', '2024-02-21 22:09:21', 0.00962193),
	('TSE', '2529', '5019', '2024-02-21 22:09:21', 0.0138466),
	('TSE', '2529', '5020', '2024-02-21 22:09:21', 0.0195582),
	('TSE', '2529', '5021', '2024-02-21 22:09:21', 0.00654646),
	('TSE', '2529', '5108', '2024-02-21 22:09:21', 0.020216),
	('TSE', '2529', '5201', '2024-02-21 22:09:21', 0.0171128),
	('TSE', '2529', '5233', '2024-02-21 22:09:21', 0.00593669),
	('TSE', '2529', '5333', '2024-02-21 22:09:21', 0.00737353),
	('TSE', '2529', '5334', '2024-02-21 22:09:21', 0.0102484),
	('TSE', '2529', '5401', '2024-02-21 22:09:21', 0.0202411),
	('TSE', '2529', '5713', '2024-02-21 22:09:21', 0.0159648),
	('TSE', '2529', '5938', '2024-02-21 22:09:21', 0.0096082),
	('TSE', '2529', '5947', '2024-02-21 22:09:21', 0.00599151),
	('TSE', '2529', '6113', '2024-02-21 22:09:21', 0.00886926),
	('TSE', '2529', '6178', '2024-02-21 22:09:21', 0.0205878),
	('TSE', '2529', '6448', '2024-02-21 22:09:21', 0.00974325),
	('TSE', '2529', '6724', '2024-02-21 22:09:21', 0.0101671),
	('TSE', '2529', '6806', '2024-02-21 22:09:21', 0.00776267),
	('TSE', '2529', '7267', '2024-02-21 22:09:21', 0.0209266),
	('TSE', '2529', '7272', '2024-02-21 22:09:21', 0.0192796),
	('TSE', '2529', '7731', '2024-02-21 22:09:21', 0.00713822),
	('TSE', '2529', '7751', '2024-02-21 22:09:21', 0.020636),
	('TSE', '2529', '7752', '2024-02-21 22:09:21', 0.0104717),
	('TSE', '2529', '7912', '2024-02-21 22:09:21', 0.0153951),
	('TSE', '2529', '7951', '2024-02-21 22:09:21', 0.00760928),
	('TSE', '2529', '8002', '2024-02-21 22:09:21', 0.0208839),
	('TSE', '2529', '8031', '2024-02-21 22:09:21', 0.0208546),
	('TSE', '2529', '8053', '2024-02-21 22:09:21', 0.0203317),
	('TSE', '2529', '8058', '2024-02-21 22:09:21', 0.0208406),
	('TSE', '2529', '8252', '2024-02-21 22:09:21', 0.0060756),
	('TSE', '2529', '8802', '2024-02-21 22:09:21', 0.0194341),
	('TSE', '2529', '9064', '2024-02-21 22:09:21', 0.0110737),
	('TSE', '2529', '9101', '2024-02-21 22:09:21', 0.0213496),
	('TSE', '2529', '9104', '2024-02-21 22:09:21', 0.0215327),
	('TSE', '2529', '9107', '2024-02-21 22:09:21', 0.0217945),
	('TSE', '2529', '9147', '2024-02-21 22:09:21', 0.0105769),
	('TSE', '2529', '9432', '2024-02-21 22:09:21', 0.0197988),
	('TSE', '2529', '9433', '2024-02-21 22:09:21', 0.0199843),
	('TSE', '2529', '9434', '2024-02-21 22:09:21', 0.020434),
	('TSE', '2529', '9531', '2024-02-21 22:09:21', 0.0192328),
	('TSE', '2529', '9984', '2024-02-21 22:09:21', 0.0187897);

-- 뷰 etf_tracker.price_info 구조 내보내기
-- VIEW 종속성 오류를 극복하기 위해 임시 테이블을 생성합니다.
CREATE TABLE `price_info` (
	`marketCode` VARCHAR(10) NOT NULL COMMENT '시장코드' COLLATE 'utf8mb4_general_ci',
	`etfStockCode` VARCHAR(20) NOT NULL COMMENT '종목코드' COLLATE 'utf8mb4_general_ci',
	`etfName` VARCHAR(255) NULL COMMENT 'ETF명' COLLATE 'utf8mb4_general_ci',
	`stockCode` VARCHAR(20) NOT NULL COMMENT '주식종목코드' COLLATE 'utf8mb4_general_ci',
	`stockNm` VARCHAR(255) NULL COMMENT '주식명' COLLATE 'utf8mb4_general_ci',
	`open` VARCHAR(414) NULL COLLATE 'utf8mb4_general_ci',
	`high` VARCHAR(414) NULL COLLATE 'utf8mb4_general_ci',
	`low` VARCHAR(414) NULL COLLATE 'utf8mb4_general_ci',
	`price` VARCHAR(414) NULL COLLATE 'utf8mb4_general_ci',
	`lastDayPrice` VARCHAR(414) NULL COLLATE 'utf8mb4_general_ci',
	`tomv` VARCHAR(414) NULL COLLATE 'utf8mb4_general_ci',
	`h52p` VARCHAR(414) NULL COLLATE 'utf8mb4_general_ci',
	`l52p` VARCHAR(414) NULL COLLATE 'utf8mb4_general_ci',
	`perx` VARCHAR(10) NULL COMMENT 'PER' COLLATE 'utf8mb4_general_ci',
	`pbrx` VARCHAR(10) NULL COMMENT 'PBR' COLLATE 'utf8mb4_general_ci',
	`epsx` VARCHAR(414) NULL COLLATE 'utf8mb4_general_ci',
	`bpsx` VARCHAR(414) NULL COLLATE 'utf8mb4_general_ci',
	`tXprc` VARCHAR(414) NULL COLLATE 'utf8mb4_general_ci',
	`tXdif` VARCHAR(12) NULL COMMENT '원환산당일대비' COLLATE 'utf8mb4_general_ci',
	`tXrat` VARCHAR(13) NULL COLLATE 'utf8mb4_general_ci',
	`pXprc` VARCHAR(414) NULL COLLATE 'utf8mb4_general_ci',
	`pXdif` VARCHAR(12) NULL COMMENT '원환산전일대비' COLLATE 'utf8mb4_general_ci',
	`pXrat` VARCHAR(13) NULL COLLATE 'utf8mb4_general_ci',
	`tRate` VARCHAR(12) NULL COMMENT '당일환율' COLLATE 'utf8mb4_general_ci',
	`eIcod` VARCHAR(50) NULL COMMENT '업종(섹터)' COLLATE 'utf8mb4_general_ci',
	`buyUnitQty` VARCHAR(10) NULL COMMENT '매수단위수량' COLLATE 'utf8mb4_general_ci',
	`trCrcyCd` VARCHAR(3) NULL COMMENT '거래통화코드' COLLATE 'utf8mb4_general_ci',
	`prdtName` VARCHAR(60) NULL COMMENT '주식명(한글)' COLLATE 'utf8mb4_general_ci',
	`etfPercent` VARCHAR(418) NULL COLLATE 'utf8mb4_general_ci',
	`regDate` VARCHAR(24) NULL COLLATE 'utf8mb4_general_ci'
) ENGINE=MyISAM;

-- 테이블 etf_tracker.stock_list 구조 내보내기
CREATE TABLE IF NOT EXISTS `stock_list` (
  `market` varchar(10) NOT NULL DEFAULT '' COMMENT '마켓코드',
  `stock_code` varchar(20) NOT NULL DEFAULT '' COMMENT '주식종목코드',
  `stock_name` varchar(255) DEFAULT NULL COMMENT '주식명',
  `tr_crcy_cd` varchar(3) DEFAULT NULL COMMENT '거래통화코드',
  `buy_unit_qty` varchar(10) DEFAULT NULL COMMENT '매수단위수량',
  `prdt_name` varchar(60) DEFAULT NULL COMMENT '주식명(한글)',
  `reg_date` datetime DEFAULT NULL COMMENT '등록시간',
  `mod_date` datetime DEFAULT NULL COMMENT '수정시간',
  `stock_comment` text DEFAULT NULL COMMENT '종목소개',
  PRIMARY KEY (`market`,`stock_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='주식목록';

-- 테이블 데이터 etf_tracker.stock_list:~70 rows (대략적) 내보내기
INSERT INTO `stock_list` (`market`, `stock_code`, `stock_name`, `tr_crcy_cd`, `buy_unit_qty`, `prdt_name`, `reg_date`, `mod_date`, `stock_comment`) VALUES
	('TSE', '1605', 'INPEX CORPORATION', 'JPY', '100', '인펙스', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '1801', 'TAISEI CORPORATION', 'JPY', '100', '다이세이', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '1803', 'SHIMIZU CORPORATION', 'JPY', '100', '시미즈건설', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '1808', 'HASEKO CORPORATION', 'JPY', '100', '하세코', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '1812', 'KAJIMA CORPORATION', 'JPY', '100', '가지마건설', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '1878', 'DAITO TRUST CONSTRUCTION CO.', 'JPY', '100', '다이토건설신탁', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '1928', 'SEKISUI HOUSE', 'JPY', '100', '세키수이 하우스', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '2269', 'MEIJI HOLDINGS CO.', 'JPY', '100', '메이지홀딩스', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '2503', 'KIRIN HOLDINGS COMPANY', 'JPY', '100', '기린 양조', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '2768', 'SOJITZ CORPORATION', 'JPY', '100', '소지쓰', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '2784', 'ALFRESA HOLDINGS CORPORATION', 'JPY', '100', '알프레사홀딩스', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '2914', 'JAPAN TOBACCO INC.', 'JPY', '100', 'JT', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '3231', 'NOMURA REAL ESTATE HOLDINGS', 'JPY', '100', '노무라부동산홀딩스', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '3405', 'KURARAY CO.', 'JPY', '100', '구라레', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '4005', 'SUMITOMO CHEMICAL COMPANY', 'JPY', '100', '스미토모 화학', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '4021', 'NISSAN CHEMICAL CORPORATION', 'JPY', '100', '닛산화학', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '4042', 'TOSOH CORPORATION', 'JPY', '100', '도소', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '4182', 'MITSUBISHI GAS CHEMICAL COMPANY', 'JPY', '100', '미쓰비시가스화학', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '4183', 'MITSUI CHEMICALS', 'JPY', '100', '미쓰이화학', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '4204', 'SEKISUI CHEMICAL CO.', 'JPY', '100', '세키스이화학', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '4324', 'DENTSU GROUP INC.', 'JPY', '100', '덴쓰그룹', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '4452', 'KAO CORPORATION', 'JPY', '100', '카오', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '4502', 'TAKEDA PHARMACEUTICAL COMPANY LIMITED', 'JPY', '100', '타케다 제약', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '4503', 'ASTELLAS PHARMA INC.', 'JPY', '100', '아스텔라스제약', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '4507', 'SHIONOGI & CO.', 'JPY', '100', '시오노기', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '4528', 'ONO PHARMACEUTICAL CO.', 'JPY', '100', '오노약품', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '4536', 'SANTEN PHARMACEUTICAL CO.', 'JPY', '100', '산텐 제약', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '4613', 'KANSAI PAINT CO.', 'JPY', '100', '간사이페인트', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '4716', 'ORACLE CORPORATION JAPAN', 'JPY', '100', '일본오라클', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '4732', 'USS CO.', 'JPY', '100', '유에스에스', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '5019', 'IDEMITSU KOSAN CO.', 'JPY', '100', '이데미쓰코산', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '5020', 'ENEOS HOLDINGS', 'JPY', '100', 'ENEOS홀딩스', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '5021', 'COSMO ENERGY HOLDINGS COMPANY', 'JPY', '100', '코스모에너지홀딩스', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '5108', 'BRIDGESTONE CORPORATION', 'JPY', '100', '브릿지스톤', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '5201', 'AGC INC.', 'JPY', '100', 'AGC', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '5233', 'TAIHEIYO CEMENT CORPORATION', 'JPY', '100', '다이헤이요시멘트', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '5333', 'NGK INSULATORS', 'JPY', '100', '니혼가이시', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '5334', 'NITERRA CO.', 'JPY', '100', '니혼특수도업', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '5401', 'NIPPON STEEL CORPORATION', 'JPY', '100', '신일본제철', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '5713', 'SUMITOMO METAL MINING CO.', 'JPY', '100', '스미토모 금속', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '5938', 'LIXIL CORPORATION', 'JPY', '100', '릭실', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '5947', 'RINNAI CORPORATION', 'JPY', '100', '린나이', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '6113', 'AMADA CO.', 'JPY', '100', '아마다', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '6178', 'JAPAN POST HOLDINGS CO.', 'JPY', '100', '일본우정홀딩스', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '6448', 'BROTHER INDUSTRIES', 'JPY', '100', '브라더공업', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '6724', 'SEIKO EPSON CORPORATION', 'JPY', '100', '세이코엡손', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '6806', 'HIROSE ELECTRIC CO.', 'JPY', '100', '히로세전기', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '7267', 'HONDA MOTOR CO.', 'JPY', '100', '혼다자동차', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '7272', 'YAMAHA MOTOR CO.', 'JPY', '100', '야마하모터', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '7731', 'NIKON CORPORATION', 'JPY', '100', '니콘', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '7751', 'CANON INC.', 'JPY', '100', '캐논', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '7752', 'RICOH COMPANY', 'JPY', '100', '리코', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '7912', 'DAI NIPPON PRINTING CO.', 'JPY', '100', '다이닛폰인쇄', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '7951', 'YAMAHA CORPORATION', 'JPY', '100', '야마하', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '8002', 'MARUBENI CORPORATION', 'JPY', '100', '마루베니', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '8031', 'MITSUI & CO.', 'JPY', '100', '미쯔이', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '8053', 'SUMITOMO CORPORATION', 'JPY', '100', '스미토모', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '8058', 'MITSUBISHI CORPORATION', 'JPY', '100', '미쓰비시', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '8252', 'MARUI GROUP CO.', 'JPY', '100', '마루이그룹', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '8802', 'MITSUBISHI ESTATE COMPANY', 'JPY', '100', '미쯔비시 부동산', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '9064', 'YAMATO HOLDINGS CO.', 'JPY', '100', '야마토홀딩스', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '9101', 'NIPPON YUSEN KABUSHIKI KAISHA', 'JPY', '100', '니폰 우체선', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '9104', 'MITSUI O.S.K.LINES', 'JPY', '100', '미쯔이O.S.K.상선', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '9107', 'KAWASAKI KISEN KAISHA', 'JPY', '100', '카와사키 기선', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '9147', 'NIPPON EXPRESS HOLDINGS', 'JPY', '100', '닛폰익스프레스홀딩스', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '9432', 'NIPPON TELEGRAPH AND TELEPHONE CORP.', 'JPY', '100', 'NTT', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '9433', 'KDDI CORPORATION', 'JPY', '100', 'KDDI', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '9434', 'SOFTBANK CORP.', 'JPY', '100', '소프트뱅크', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '9531', 'TOKYO GAS CO.', 'JPY', '100', '도쿄가스', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL),
	('TSE', '9984', 'SOFTBANK GROUP CORP.', 'JPY', '100', '소프트뱅크그룹', '2024-02-21 19:53:33', '2024-03-06 03:44:59', NULL);

-- 테이블 etf_tracker.stock_price_history 구조 내보내기
CREATE TABLE IF NOT EXISTS `stock_price_history` (
  `price_idx` int(11) NOT NULL AUTO_INCREMENT COMMENT '인덱스',
  `market` varchar(10) NOT NULL COMMENT '시장코드',
  `stock_code` varchar(20) NOT NULL COMMENT '종목코드',
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
  `e_icod` varchar(50) DEFAULT NULL COMMENT '업종(섹터)',
  `reg_unixtime` int(11) DEFAULT NULL COMMENT '등록시간',
  PRIMARY KEY (`price_idx`) USING BTREE,
  KEY `market_stock_code` (`market`,`stock_code`),
  KEY `reg_date` (`reg_unixtime`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=493 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 etf_tracker.token 구조 내보내기
CREATE TABLE IF NOT EXISTS `token` (
  `token_idx` int(11) NOT NULL AUTO_INCREMENT,
  `reg_date` char(8) NOT NULL DEFAULT '',
  `token` text NOT NULL,
  PRIMARY KEY (`token_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='토큰저장소';

-- 테이블 데이터 etf_tracker.token:~0 rows (대략적) 내보내기
INSERT INTO `token` (`token_idx`, `reg_date`, `token`) VALUES
	(1, '20240221', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6IjI3YTEzMDVjLWNjYzItNGI0ZC1hYzhlLTA0OGYwOWE0YWY3MyIsImlzcyI6InVub2d3IiwiZXhwIjoxNzA4NTg2MzY4LCJpYXQiOjE3MDg0OTk5NjgsImp0aSI6IlBTZ24yU1pRTmJyZ2JZQ1E3Uk1hUjFySWNnaXkxMFZ4MFgyaCJ9.ONjtn2u5Ymggk65JLbX1HlcyBtbpegkFG85IuVu3vDpRO1R9AdMvevaCRrNmoXB_OvsC2fBehiPNY_PGWLOzVQ'),
	(2, '20240222', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6IjU3ZWZkOTdhLTE2MDgtNDEzOS1hOTVhLWE2OWVjYWNkNjFmMiIsImlzcyI6InVub2d3IiwiZXhwIjoxNzA4NjYyNzUxLCJpYXQiOjE3MDg1NzYzNTEsImp0aSI6IlBTZ24yU1pRTmJyZ2JZQ1E3Uk1hUjFySWNnaXkxMFZ4MFgyaCJ9.ZHSGfxWU9DVKChHmSzuAXCADZScu6Xw0ORlNbNQ3Mw_NueB2z8bTcx81iSBw0cjQFQfiGXuTuLxS5AlWxT5aDQ'),
	(3, '20240223', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6ImY1ZGNlZjdhLWE0MjgtNDQ2Yy04MTgxLTJlMzNmNzJmYWY1MiIsImlzcyI6InVub2d3IiwiZXhwIjoxNzA4NzQxNjU1LCJpYXQiOjE3MDg2NTUyNTUsImp0aSI6IlBTZ24yU1pRTmJyZ2JZQ1E3Uk1hUjFySWNnaXkxMFZ4MFgyaCJ9.C4-9pfhKu19fwUZjUvfDES_U6n_NDiL91xqc94BqTqWq1QoqOnWLAhA0QhHiUGLVbtax3Hp0khRGMm4Go4UzyA'),
	(4, '20240228', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6IjlhNDEwZTVjLWY4OWItNDFlNC04MWMwLWZjODA3Y2U0NWZiZSIsImlzcyI6InVub2d3IiwiZXhwIjoxNzA5MTgxNzU5LCJpYXQiOjE3MDkwOTUzNTksImp0aSI6IlBTZ24yU1pRTmJyZ2JZQ1E3Uk1hUjFySWNnaXkxMFZ4MFgyaCJ9.a9TxSnoGsmEgpseA8ElljfRU7PsKcmx_gi-yI3AOjzbMib7S4F4_5EeZ2HN-1ursAlIKGFPU89gsptvlLeekDQ'),
	(5, '20240306', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6ImE0MTdjNDVlLTkzYWQtNGQxNi04ZWRkLWNiZTNmNjA5MmUxMyIsImlzcyI6InVub2d3IiwiZXhwIjoxNzA5Nzc1NzgyLCJpYXQiOjE3MDk2ODkzODIsImp0aSI6IlBTZ24yU1pRTmJyZ2JZQ1E3Uk1hUjFySWNnaXkxMFZ4MFgyaCJ9.Rlw5ozXXlIj_cbTLUnsq-1lEYhaz0N9szzkd_4FRjp3w36iEemRbVj6dbr4ozG8ky3p2MNSykKhsYazA1NmPrg');

-- 임시 테이블을 제거하고 최종 VIEW 구조를 생성
DROP TABLE IF EXISTS `etf_price_info`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `etf_price_info` AS (
select etf_list.market       as marketCode,
       etf_list.stock_code   as etfStockCode,
       etf_list.etf_name     as etfName,
       etf_list.company_name     AS companyName,
       FORMAT(H2.open, 0) AS open,
       FORMAT(H2.high, 0) AS high,
       FORMAT(H2.low, 0) AS low,
       FORMAT(H2.price, 0) AS price,
       FORMAT(H2.last_day_price, 0) AS lastDayPrice,
       FORMAT(H2.h52p, 0) AS h52p,
       FORMAT(H2.l52p, 0) AS l52p,
       FORMAT(H2.t_xprc, 0) AS tXprc,
       H2.t_xdif AS tXdif,
       concat(H2.t_xrat, '%') tXrat,
       FORMAT(H2.p_xprc, 0) AS pXprc,
       H2.p_xdif AS pXdif,
       concat(H2.p_xrat, '%') pXrat,
       H2.t_rate AS tRate,
       from_unixTime(H1.reg_unixtime, '%Y/%m/%d %H:%i:%S') regDate
from etf_list
         left JOIN (select market, stock_code, max(reg_unixtime) reg_unixtime
                    from etf_price_history
                    where reg_unixtime BETWEEN UNIX_TIMESTAMP(DATE_ADD(CURDATE(), INTERVAL -1 DAY)) AND UNIX_TIMESTAMP(DATE_ADD(CURDATE(), INTERVAL 1 DAY))
                    group by market, stock_code) H1
                   ON etf_list.market = H1.market AND etf_list.stock_code = H1.stock_code
         left JOIN etf_price_history H2 ON etf_list.market = H2.market AND etf_list.stock_code = H2.stock_code AND
                                             H1.reg_unixtime = H2.reg_unixtime 
                                             ) ;

-- 임시 테이블을 제거하고 최종 VIEW 구조를 생성
DROP TABLE IF EXISTS `price_info`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `price_info` AS select etf_list.market       as marketCode,
       etf_list.stock_code   as etfStockCode,
       etf_list.etf_name     as etfName,
       stock_list.stock_code as stockCode,
       stock_list.stock_name as stockNm,
       FORMAT(H2.open, 0) AS open,
       FORMAT(H2.high, 0) AS high,
       FORMAT(H2.low, 0) AS low,
       FORMAT(H2.price, 0) AS price,
       FORMAT(H2.last_day_price, 0) AS lastDayPrice,
       FORMAT(H2.tomv, 0) AS tomv,
       FORMAT(H2.h52p, 0) AS h52p,
       FORMAT(H2.l52p, 0) AS l52p,
       H2.perx,
       H2.pbrx,
       FORMAT(H2.epsx, 0) AS epsx,
       FORMAT(H2.bpsx, 0) AS bpsx,
       FORMAT(H2.t_xprc, 0) AS tXprc,
       H2.t_xdif AS  tXdif,
       concat(H2.t_xrat, '%') tXrat,
       FORMAT(H2.p_xprc, 0) AS pXprc,
       H2.p_xdif AS  pXdif,
       concat(H2.p_xrat, '%') pXrat,
       H2.t_rate AS  tRate,
       H2.e_icod AS  eIcod,
       stock_list.buy_unit_qty AS  buyUnitQty,
       stock_list.tr_crcy_cd AS  trCrcyCd,
       stock_list.prdt_name AS  prdtName,
       CONCAT(FORMAT(etf_stock_list.etf_percent * 100, 2), '%') AS  etfPercent,
       from_unixTime(H2.reg_unixtime, '%Y/%m/%d %H:%i:%S') regDate
from etf_list
         join etf_stock_list
              on etf_list.market = etf_stock_list.market and etf_list.stock_code = etf_stock_list.etf_stock_code
         join stock_list
              on etf_stock_list.market = stock_list.market and etf_stock_list.stock_code = stock_list.stock_code
         left JOIN (select market, stock_code, max(reg_unixtime) reg_unixtime
                    from stock_price_history
                    where reg_unixtime BETWEEN UNIX_TIMESTAMP(DATE_ADD(CURDATE(), INTERVAL -1 DAY)) AND UNIX_TIMESTAMP(DATE_ADD(CURDATE(), INTERVAL 1 DAY))
                    group by market, stock_code) H1
                   ON stock_list.market = H1.market AND stock_list.stock_code = H1.stock_code
         left JOIN stock_price_history H2 ON stock_list.market = H2.market AND stock_list.stock_code = H2.stock_code AND
                                             H1.reg_unixtime = H2.reg_unixtime 
ORDER BY etf_stock_list.etf_percent desc ;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
