-- oracle
create table TOKEN
(
    TOKEN_IDX NUMBER  not null
        constraint TOKEN_PK
            primary key,
    REG_DATE  CHAR(8) not null,
    TOKEN     VARCHAR2(500)
)
/

comment on table TOKEN is '토큰저장소'
/

create table ETF_LIST
(
    MARKET             VARCHAR2(10) not null,
    STOCK_CODE         VARCHAR2(20) not null,
    ETF_NAME           VARCHAR2(255),
    COMPANY_NAME       VARCHAR2(50),
    BENCHMARK_INDEX    VARCHAR2(100),
    INDEX_COMMENT      VARCHAR2(2000),
    TRADING_LOT        VARCHAR2(10),
    TRUST_FEE_RATE     VARCHAR2(10),
    STD_PDNO           VARCHAR2(12),
    DISTRIBUTION_YIELD VARCHAR2(10),
    REG_DATE           DATE,
    MOD_DATE           DATE,
    constraint ETF_LIST_PK
        primary key (MARKET, STOCK_CODE)
)
/

comment on table ETF_LIST is 'etf목록'
/

comment on column ETF_LIST.MARKET is '시장코드'
/

comment on column ETF_LIST.STOCK_CODE is '종목코드'
/

comment on column ETF_LIST.ETF_NAME is 'ETF명'
/

comment on column ETF_LIST.COMPANY_NAME is '회사명'
/

comment on column ETF_LIST.BENCHMARK_INDEX is '벤치마크인덱스명'
/

comment on column ETF_LIST.INDEX_COMMENT is '인덱스 소개'
/

comment on column ETF_LIST.TRADING_LOT is '거래단위 주수'
/

comment on column ETF_LIST.TRUST_FEE_RATE is '수수료'
/

comment on column ETF_LIST.STD_PDNO is '표준상품번호'
/

comment on column ETF_LIST.DISTRIBUTION_YIELD is '배당수익률'
/

comment on column ETF_LIST.REG_DATE is '생성시간'
/

comment on column ETF_LIST.MOD_DATE is '수정시간'
/

create table ETF_PRICE_HISTORY
(
    PRICE_IDX      NUMBER not null
        constraint ETF_PRICE_HISTORY_PK
            primary key,
    MARKET         VARCHAR2(10),
    STOCK_CODE     VARCHAR2(20),
    OPEN           VARCHAR2(12),
    HIGH           VARCHAR2(12),
    LOW            VARCHAR2(12),
    PRICE          VARCHAR2(12),
    LAST_DAY_PRICE VARCHAR2(12),
    H52P           VARCHAR2(100),
    L52P           VARCHAR2(12),
    T_XPRC         VARCHAR2(12),
    T_XDIF         VARCHAR2(12),
    T_XRAT         VARCHAR2(12),
    T_RATE         VARCHAR2(12),
    REG_DATE       DATE,
    constraint ETF_PRICE_HISTORY_ETF_LIST_FK
        foreign key (MARKET, STOCK_CODE) references ETF_LIST
)
/

comment on table ETF_PRICE_HISTORY is '주가 가격 히스토리'
/

comment on column ETF_PRICE_HISTORY.PRICE_IDX is '인덱스'
/

comment on column ETF_PRICE_HISTORY.MARKET is '시장코드'
/

comment on column ETF_PRICE_HISTORY.STOCK_CODE is '종목코드'
/

comment on column ETF_PRICE_HISTORY.OPEN is '시가'
/

comment on column ETF_PRICE_HISTORY.HIGH is '고가'
/

comment on column ETF_PRICE_HISTORY.LOW is '저가'
/

comment on column ETF_PRICE_HISTORY.PRICE is '현재가'
/

comment on column ETF_PRICE_HISTORY.LAST_DAY_PRICE is '전일종가'
/

comment on column ETF_PRICE_HISTORY.H52P is '52주최고가'
/

comment on column ETF_PRICE_HISTORY.L52P is '52주최저가'
/

comment on column ETF_PRICE_HISTORY.T_XPRC is '원환산당일가격'
/

comment on column ETF_PRICE_HISTORY.T_XDIF is '원환산당일대비'
/

comment on column ETF_PRICE_HISTORY.T_XRAT is '원환산당일등락'
/

comment on column ETF_PRICE_HISTORY.T_RATE is '당일환율'
/

comment on column ETF_PRICE_HISTORY.REG_DATE is '등록시간'
/

create table STOCK_LIST
(
    MARKET        VARCHAR2(10) not null,
    STOCK_CODE    VARCHAR2(20) not null,
    STOCK_NAME    VARCHAR2(255),
    TR_CRCY_CD    VARCHAR2(3),
    BUY_UNIT_QTY  VARCHAR2(10),
    PRDT_NAME     VARCHAR2(60),
    STOCK_COMMENT VARCHAR2(2000),
    STD_PDNO      VARCHAR2(12),
    REG_DATE      DATE,
    MOD_DATE      DATE,
    constraint STOCK_LIST_PK
        primary key (MARKET, STOCK_CODE)
)
/

comment on table STOCK_LIST is '주식목록'
/

comment on column STOCK_LIST.MARKET is '마켓코드'
/

comment on column STOCK_LIST.STOCK_CODE is '주식종목코드'
/

comment on column STOCK_LIST.STOCK_NAME is '주식명'
/

comment on column STOCK_LIST.TR_CRCY_CD is '거래통화코드'
/

comment on column STOCK_LIST.BUY_UNIT_QTY is '매수단위수량'
/

comment on column STOCK_LIST.PRDT_NAME is '주식명(한글)'
/

comment on column STOCK_LIST.STOCK_COMMENT is '종목소개'
/

comment on column STOCK_LIST.STD_PDNO is '표준상품번호'
/

comment on column STOCK_LIST.REG_DATE is '등록시간'
/

comment on column STOCK_LIST.MOD_DATE is '수정시간'
/

create table ETF_STOCK_LIST
(
    MARKET         VARCHAR2(10),
    ETF_STOCK_CODE VARCHAR2(20),
    STOCK_CODE     VARCHAR2(20),
    REG_DATE       DATE,
    ETF_PERCENT    NUMBER(11, 8),
    constraint ETF_STOCK_LIST_ETF_LIST_FK
        foreign key (MARKET, ETF_STOCK_CODE) references ETF_LIST,
    constraint ETF_STOCK_LIST_STOCK_LIST_FK
        foreign key (MARKET, STOCK_CODE) references STOCK_LIST
)
/

comment on table ETF_STOCK_LIST is 'ETF 주식 목록'
/

comment on column ETF_STOCK_LIST.MARKET is '시장코드'
/

comment on column ETF_STOCK_LIST.ETF_STOCK_CODE is 'ETF종목코드'
/

comment on column ETF_STOCK_LIST.STOCK_CODE is '주식종목코드'
/

comment on column ETF_STOCK_LIST.REG_DATE is '생성일'
/

comment on column ETF_STOCK_LIST.ETF_PERCENT is 'ETF 비율'
/

create table STOCK_PRICE_HISTORY
(
    PRICE_IDX      NUMBER not null
        constraint STOCK_PRICE_HISTORY_PK
            primary key,
    MARKET         VARCHAR2(10),
    STOCK_CODE     VARCHAR2(20),
    OPEN           VARCHAR2(12),
    HIGH           VARCHAR2(12),
    LOW            VARCHAR2(12),
    PRICE          VARCHAR2(12),
    LAST_DAY_PRICE VARCHAR2(12),
    TOMV           VARCHAR2(16),
    H52P           VARCHAR2(12),
    L52P           VARCHAR2(12),
    PERX           VARCHAR2(10),
    PBRX           VARCHAR2(10),
    EPSX           VARCHAR2(10),
    BPSX           VARCHAR2(10),
    T_XPRC         VARCHAR2(12),
    T_XDIF         VARCHAR2(12),
    T_XRAT         VARCHAR2(12),
    T_RATE         VARCHAR2(12),
    E_ICOD         VARCHAR2(50),
    REG_DATE       DATE
)
/

comment on table STOCK_PRICE_HISTORY is '주식 가격 히스토리'
/

comment on column STOCK_PRICE_HISTORY.PRICE_IDX is '인덱스'
/

comment on column STOCK_PRICE_HISTORY.MARKET is '시장코드'
/

comment on column STOCK_PRICE_HISTORY.STOCK_CODE is '종목코드'
/

comment on column STOCK_PRICE_HISTORY.OPEN is '시가'
/

comment on column STOCK_PRICE_HISTORY.HIGH is '고가'
/

comment on column STOCK_PRICE_HISTORY.LOW is '저가'
/

comment on column STOCK_PRICE_HISTORY.PRICE is '현재가'
/

comment on column STOCK_PRICE_HISTORY.LAST_DAY_PRICE is '전일종가'
/

comment on column STOCK_PRICE_HISTORY.TOMV is '시가총액'
/

comment on column STOCK_PRICE_HISTORY.H52P is '52주최고가'
/

comment on column STOCK_PRICE_HISTORY.L52P is '52주최저가'
/

comment on column STOCK_PRICE_HISTORY.PERX is 'PER'
/

comment on column STOCK_PRICE_HISTORY.PBRX is 'PBR'
/

comment on column STOCK_PRICE_HISTORY.EPSX is 'EPS'
/

comment on column STOCK_PRICE_HISTORY.BPSX is 'BPS'
/

comment on column STOCK_PRICE_HISTORY.T_XPRC is '원환산당일가격'
/

comment on column STOCK_PRICE_HISTORY.T_XDIF is '원환산당일대비'
/

comment on column STOCK_PRICE_HISTORY.T_XRAT is '원환산당일등락'
/

comment on column STOCK_PRICE_HISTORY.T_RATE is '당일환율'
/

comment on column STOCK_PRICE_HISTORY.E_ICOD is '업종(섹터)'
/

comment on column STOCK_PRICE_HISTORY.REG_DATE is '등록시간'
/

create view ETF_PRICE_INFO as
(
    select ETF_LIST.market       as marketCode,
           ETF_LIST.stock_code   as etfStockCode,
           ETF_LIST.etf_name     as etfName,
           ETF_LIST.company_name     AS companyName,
           REGEXP_REPLACE(REVERSE(REGEXP_REPLACE(REVERSE(TO_CHAR(H2.open)), '(\d{3})','\1,')), '^,','') AS open,
           REGEXP_REPLACE(REVERSE(REGEXP_REPLACE(REVERSE(TO_CHAR(H2.high)), '(\d{3})','\1,')), '^,','') AS high,
           REGEXP_REPLACE(REVERSE(REGEXP_REPLACE(REVERSE(TO_CHAR(H2.low)), '(\d{3})','\1,')), '^,','') AS low,
           REGEXP_REPLACE(REVERSE(REGEXP_REPLACE(REVERSE(TO_CHAR(H2.price)), '(\d{3})','\1,')), '^,','') AS price,
           REGEXP_REPLACE(REVERSE(REGEXP_REPLACE(REVERSE(TO_CHAR(H2.last_day_price)), '(\d{3})','\1,')), '^,','') AS lastDayPrice,
           REGEXP_REPLACE(REVERSE(REGEXP_REPLACE(REVERSE(TO_CHAR(H2.h52p)), '(\d{3})','\1,')), '^,','') AS h52p,
           REGEXP_REPLACE(REVERSE(REGEXP_REPLACE(REVERSE(TO_CHAR(H2.l52p)), '(\d{3})','\1,')), '^,','') AS l52p,
           REGEXP_REPLACE(REVERSE(REGEXP_REPLACE(REVERSE(TO_CHAR(H2.t_xprc)), '(\d{3})','\1,')), '^,','') AS tXprc,
           H2.t_xdif AS tXdif,
           concat(H2.t_xrat, '%') tXrat,
           H2.t_rate AS tRate,
           to_char(H1.reg_date,'YYYY-MM-DD HH24:MI:SS') regDate
    from ETF.ETF_LIST
             left JOIN (select market, stock_code, max(reg_date) reg_date
                        from ETF.ETF_PRICE_HISTORY
                        where reg_date BETWEEN SYSDATE AND SYSDATE+1
                        group by market, stock_code) H1
                       ON ETF_LIST.market = H1.market AND ETF_LIST.stock_code = H1.stock_code
             left JOIN ETF.ETF_PRICE_HISTORY H2 ON ETF_LIST.market = H2.market AND ETF_LIST.stock_code = H2.stock_code AND
                                                   H1.reg_date = H2.reg_date
)
/

create view STOCK_PRICE_INFO as
select etf_list.market       as marketCode,
       etf_list.stock_code   as etfStockCode,
       etf_list.etf_name     as etfName,
       stock_list.stock_code as stockCode,
       stock_list.stock_name as stockNm,
       H2.perx,
       H2.pbrx,
       REGEXP_REPLACE(REVERSE(REGEXP_REPLACE(REVERSE(TO_CHAR(H2.open)), '(\d{3})','\1,')), '^,','') AS open,
       REGEXP_REPLACE(REVERSE(REGEXP_REPLACE(REVERSE(TO_CHAR(H2.high)), '(\d{3})','\1,')), '^,','') AS high,
       REGEXP_REPLACE(REVERSE(REGEXP_REPLACE(REVERSE(TO_CHAR(H2.low)), '(\d{3})','\1,')), '^,','') AS low,
       REGEXP_REPLACE(REVERSE(REGEXP_REPLACE(REVERSE(TO_CHAR(H2.price)), '(\d{3})','\1,')), '^,','') AS price,
       REGEXP_REPLACE(REVERSE(REGEXP_REPLACE(REVERSE(TO_CHAR(H2.last_day_price)), '(\d{3})','\1,')), '^,','') AS lastDayPrice,
       REGEXP_REPLACE(REVERSE(REGEXP_REPLACE(REVERSE(TO_CHAR(H2.h52p)), '(\d{3})','\1,')), '^,','') AS h52p,
       REGEXP_REPLACE(REVERSE(REGEXP_REPLACE(REVERSE(TO_CHAR(H2.l52p)), '(\d{3})','\1,')), '^,','') AS l52p,
       REGEXP_REPLACE(REVERSE(REGEXP_REPLACE(REVERSE(TO_CHAR(H2.t_xprc)), '(\d{3})','\1,')), '^,','') AS tXprc,
       REGEXP_REPLACE(REVERSE(REGEXP_REPLACE(REVERSE(TO_CHAR(H2.tomv)), '(\d{3})','\1,')), '^,','') AS tomv,
       REGEXP_REPLACE(REVERSE(REGEXP_REPLACE(REVERSE(TO_CHAR(H2.epsx)), '(\d{3})','\1,')), '^,','') AS epsx,
       REGEXP_REPLACE(REVERSE(REGEXP_REPLACE(REVERSE(TO_CHAR(H2.bpsx)), '(\d{3})','\1,')), '^,','') AS bpsx,
       H2.t_xdif AS  tXdif,
       concat(H2.t_xrat, '%') tXrat,
       H2.t_rate AS  tRate,
       H2.e_icod AS  eIcod,
       stock_list.buy_unit_qty AS  buyUnitQty,
       stock_list.tr_crcy_cd AS  trCrcyCd,
       stock_list.prdt_name AS  prdtName,
       CONCAT(ROUND(etf_stock_list.etf_percent * 100, 2), '%') AS  etfPercent,
       to_char(H1.reg_date,'YYYY-MM-DD HH24:MI:SS') regDate
from ETF.etf_list
         join ETF.etf_stock_list
              on etf_list.market = etf_stock_list.market and etf_list.stock_code = etf_stock_list.etf_stock_code
         join ETF.stock_list
              on etf_stock_list.market = stock_list.market and etf_stock_list.stock_code = stock_list.stock_code
         left JOIN (select market, stock_code, max(reg_date) reg_date
                    from ETF.stock_price_history
                    where reg_date BETWEEN SYSDATE AND SYSDATE+1
                    group by market, stock_code) H1
                   ON stock_list.market = H1.market AND stock_list.stock_code = H1.stock_code
         left JOIN ETF.stock_price_history H2 ON stock_list.market = H2.market AND stock_list.stock_code = H2.stock_code AND
                                                 H1.reg_date = H2.reg_date
ORDER BY etf_stock_list.etf_percent desc
/

