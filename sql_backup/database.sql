CREATE DATABASE `etf` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */

create table etf_list
(
    market          varchar(10) default '' not null comment '시장코드',
    stock_code      varchar(20) default '' not null comment '종목코드',
    etf_name        varchar(255)           null comment 'ETF명',
    company_name    varchar(50)            null comment '회사명',
    benchmark_index varchar(255)           null comment '벤치마크인덱스명',
    index_comment   text                   null comment '인덱스 소개',
    trading_lot     varchar(10)            null comment '거래주수',
    trust_fee_rate  varchar(10)            null comment '수수료',
    std_pdno        varchar(12)            null comment '표준상품번호',
    reg_date        datetime               null comment '생성시간',
    mod_date        datetime               null comment '수정시간',
    primary key (market, stock_code)
)
    comment 'etf목록';

create table etf_price_history
(
    price_idx      int auto_increment comment '인덱스'
        primary key,
    market         varchar(10) not null comment '시장코드',
    stock_code     varchar(20) not null comment '종목코드',
    open           varchar(12) null comment '시가',
    high           varchar(12) null comment '고가',
    low            varchar(12) null comment '저가',
    price          varchar(12) null comment '현재가',
    last_day_price varchar(12) null comment '전일종가',
    h52p           varchar(12) null comment '52주최고가',
    l52p           varchar(12) null comment '52주최저가',
    t_xprc         varchar(12) null comment '원환산당일가격',
    t_xdif         varchar(12) null comment '원환산당일대비',
    t_xrat         varchar(12) null comment '원환산당일등락',
    t_rate         varchar(12) null comment '당일환율',
    reg_date       datetime    null comment '등록시간'
);

create index market_stock_code
    on etf_price_history (market, stock_code);

create index reg_date
    on etf_price_history (reg_date);

create table stock_list
(
    market        varchar(10) default '' not null comment '마켓코드',
    stock_code    varchar(20) default '' not null comment '주식종목코드',
    stock_name    varchar(255)           null comment '주식명',
    tr_crcy_cd    varchar(3)             null comment '거래통화코드',
    buy_unit_qty  varchar(10)            null comment '매수단위수량',
    prdt_name     varchar(60)            null comment '주식명(한글)',
    stock_comment text                   null comment '종목소개',
    std_pdno      varchar(12)            null comment '표준상품번호',
    reg_date      datetime               null comment '등록시간',
    mod_date      datetime               null comment '수정시간',
    primary key (market, stock_code)
)
    comment '주식목록';

create table etf_stock_list
(
    market         varchar(10) default '' not null comment '시장코드',
    etf_stock_code varchar(20) default '' not null comment 'ETF종목코드',
    stock_code     varchar(20) default '' not null comment '주식종목코드',
    reg_date       datetime               null comment '생성일',
    etf_percent    float                  null comment 'ETF 비율',
    primary key (market, etf_stock_code, stock_code),
    constraint FK_etf_stock_list_etf_list
        foreign key (market, etf_stock_code) references etf_list (market, stock_code),
    constraint etf_stock_list_stock_list_market_stock_code_fk
        foreign key (market, stock_code) references stock_list (market, stock_code)
)
    comment 'ETF 주식 목록';

create table stock_price_history
(
    price_idx      int auto_increment comment '인덱스'
        primary key,
    market         varchar(10) not null comment '시장코드',
    stock_code     varchar(20) not null comment '종목코드',
    open           varchar(12) null comment '시가',
    high           varchar(12) null comment '고가',
    low            varchar(12) null comment '저가',
    price          varchar(12) null comment '현재가',
    last_day_price varchar(12) null comment '전일종가',
    tomv           varchar(16) null comment '시가총액',
    h52p           varchar(12) null comment '52주최고가',
    l52p           varchar(12) null comment '52주최저가',
    perx           varchar(10) null comment 'PER',
    pbrx           varchar(10) null comment 'PBR',
    epsx           varchar(10) null comment 'EPS',
    bpsx           varchar(10) null comment 'BPS',
    t_xprc         varchar(12) null comment '원환산당일가격',
    t_xdif         varchar(12) null comment '원환산당일대비',
    t_xrat         varchar(12) null comment '원환산당일등락',
    t_rate         varchar(12) null comment '당일환율',
    e_icod         varchar(50) null comment '업종(섹터)',
    reg_date       datetime    null comment '등록시간'
);

create index market_stock_code
    on stock_price_history (market, stock_code);

create index reg_date
    on stock_price_history (reg_date);

create table token
(
    token_idx int auto_increment
        primary key,
    reg_date  char(8) default '' not null,
    token     text               not null
)
    comment '토큰저장소';

create definer = etf@`%` view etf_price_info as
(
select `etf`.`etf_list`.`market`                         AS `marketCode`,
       `etf`.`etf_list`.`stock_code`                     AS `etfStockCode`,
       `etf`.`etf_list`.`etf_name`                       AS `etfName`,
       `etf`.`etf_list`.`company_name`                   AS `companyName`,
       format(`h2`.`open`, 0)                            AS `open`,
       format(`h2`.`high`, 0)                            AS `high`,
       format(`h2`.`low`, 0)                             AS `low`,
       format(`h2`.`price`, 0)                           AS `price`,
       format(`h2`.`last_day_price`, 0)                  AS `lastDayPrice`,
       format(`h2`.`h52p`, 0)                            AS `h52p`,
       format(`h2`.`l52p`, 0)                            AS `l52p`,
       format(`h2`.`t_xprc`, 0)                          AS `tXprc`,
       `h2`.`t_xdif`                                     AS `tXdif`,
       concat(`h2`.`t_xrat`, '%')                        AS `tXrat`,
       `h2`.`t_rate`                                     AS `tRate`,
       date_format(`h1`.`reg_date`, '%Y/%m/%d %H:%i:%S') AS `regDate`
from ((`etf`.`etf_list` left join (select `etf`.`etf_price_history`.`market`        AS `market`,
                                          `etf`.`etf_price_history`.`stock_code`    AS `stock_code`,
                                          max(`etf`.`etf_price_history`.`reg_date`) AS `reg_date`
                                   from `etf`.`etf_price_history`
                                   where `etf`.`etf_price_history`.`reg_date` between curdate() and curdate() + 1
                                   group by `etf`.`etf_price_history`.`market`,
                                            `etf`.`etf_price_history`.`stock_code`) `h1`
       on (`etf`.`etf_list`.`market` = `h1`.`market` and
           `etf`.`etf_list`.`stock_code` = `h1`.`stock_code`)) left join `etf`.`etf_price_history` `h2`
      on (`etf`.`etf_list`.`market` = `h2`.`market` and `etf`.`etf_list`.`stock_code` = `h2`.`stock_code` and
          `h1`.`reg_date` = `h2`.`reg_date`)));

-- comment on column etf_price_info.marketCode not supported: 시장코드

-- comment on column etf_price_info.etfStockCode not supported: 종목코드

-- comment on column etf_price_info.etfName not supported: ETF명

-- comment on column etf_price_info.companyName not supported: 회사명

-- comment on column etf_price_info.tXdif not supported: 원환산당일대비

-- comment on column etf_price_info.tRate not supported: 당일환율

create definer = etf@`%` view stock_price_info as
select `etf`.`etf_list`.`market`                                          AS `marketCode`,
       `etf`.`etf_list`.`stock_code`                                      AS `etfStockCode`,
       `etf`.`etf_list`.`etf_name`                                        AS `etfName`,
       `etf`.`stock_list`.`stock_code`                                    AS `stockCode`,
       `etf`.`stock_list`.`stock_name`                                    AS `stockNm`,
       format(`h2`.`open`, 0)                                             AS `open`,
       format(`h2`.`high`, 0)                                             AS `high`,
       format(`h2`.`low`, 0)                                              AS `low`,
       format(`h2`.`price`, 0)                                            AS `price`,
       format(`h2`.`last_day_price`, 0)                                   AS `lastDayPrice`,
       format(`h2`.`tomv`, 0)                                             AS `tomv`,
       format(`h2`.`h52p`, 0)                                             AS `h52p`,
       format(`h2`.`l52p`, 0)                                             AS `l52p`,
       `h2`.`perx`                                                        AS `perx`,
       `h2`.`pbrx`                                                        AS `pbrx`,
       format(`h2`.`epsx`, 0)                                             AS `epsx`,
       format(`h2`.`bpsx`, 0)                                             AS `bpsx`,
       format(`h2`.`t_xprc`, 0)                                           AS `tXprc`,
       `h2`.`t_xdif`                                                      AS `tXdif`,
       concat(`h2`.`t_xrat`, '%')                                         AS `tXrat`,
       `h2`.`t_rate`                                                      AS `tRate`,
       `h2`.`e_icod`                                                      AS `eIcod`,
       `etf`.`stock_list`.`buy_unit_qty`                                  AS `buyUnitQty`,
       `etf`.`stock_list`.`tr_crcy_cd`                                    AS `trCrcyCd`,
       `etf`.`stock_list`.`prdt_name`                                     AS `prdtName`,
       concat(format(`etf`.`etf_stock_list`.`etf_percent` * 100, 2), '%') AS `etfPercent`,
       date_format(`h2`.`reg_date`, '%Y/%m/%d %H:%i:%S')                  AS `regDate`
from ((((`etf`.`etf_list` join `etf`.`etf_stock_list`
         on (`etf`.`etf_list`.`market` = `etf`.`etf_stock_list`.`market` and
             `etf`.`etf_list`.`stock_code` = `etf`.`etf_stock_list`.`etf_stock_code`)) join `etf`.`stock_list`
        on (`etf`.`etf_stock_list`.`market` = `etf`.`stock_list`.`market` and `etf`.`etf_stock_list`.`stock_code` =
                                                                              `etf`.`stock_list`.`stock_code`)) left join (select `etf`.`stock_price_history`.`market`        AS `market`,
                                                                                                                                  `etf`.`stock_price_history`.`stock_code`    AS `stock_code`,
                                                                                                                                  max(`etf`.`stock_price_history`.`reg_date`) AS `reg_date`
                                                                                                                           from `etf`.`stock_price_history`
                                                                                                                           where `etf`.`stock_price_history`.`reg_date` between curdate() and curdate() + 1
                                                                                                                           group by `etf`.`stock_price_history`.`market`,
                                                                                                                                    `etf`.`stock_price_history`.`stock_code`) `h1`
       on (`etf`.`stock_list`.`market` = `h1`.`market` and
           `etf`.`stock_list`.`stock_code` = `h1`.`stock_code`)) left join `etf`.`stock_price_history` `h2`
      on (`etf`.`stock_list`.`market` = `h2`.`market` and `etf`.`stock_list`.`stock_code` = `h2`.`stock_code` and
          `h1`.`reg_date` = `h2`.`reg_date`))
order by `etf`.`etf_stock_list`.`etf_percent` desc;

-- comment on column stock_price_info.marketCode not supported: 시장코드

-- comment on column stock_price_info.etfStockCode not supported: 종목코드

-- comment on column stock_price_info.etfName not supported: ETF명

-- comment on column stock_price_info.stockCode not supported: 주식종목코드

-- comment on column stock_price_info.stockNm not supported: 주식명

-- comment on column stock_price_info.perx not supported: PER

-- comment on column stock_price_info.pbrx not supported: PBR

-- comment on column stock_price_info.tXdif not supported: 원환산당일대비

-- comment on column stock_price_info.tRate not supported: 당일환율

-- comment on column stock_price_info.eIcod not supported: 업종(섹터)

-- comment on column stock_price_info.buyUnitQty not supported: 매수단위수량

-- comment on column stock_price_info.trCrcyCd not supported: 거래통화코드

-- comment on column stock_price_info.prdtName not supported: 주식명(한글)

