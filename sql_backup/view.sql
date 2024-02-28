-- ETF 가격데이터 가져오는 뷰
CREATE OR REPLACE VIEW etf_price_info AS (
select etf_list.market       as marketCode,
       etf_list.stock_code   as etfStockCode,
       etf_list.etf_name     as etfName,
       etf_list.company_name     AS companyName,
       H2.open,
       H2.high,
       H2.low,
       H2.price,
       H2.last_day_price AS lastDayPrice,
       H2.h52p,
       H2.l52p,
       H2.t_xprc AS  tXprc,
       H2.t_xdif AS  tXdif,
       concat(H2.t_xrat, '%') tXrat,
       H2.p_xprc AS  pXprc,
       H2.p_xdif AS  pXdif,
       concat(H2.p_xrat, '%') pXrat,
       H2.t_rate AS  tRate,
       from_unixTime(H1.reg_unixtime, '%Y/%m/%d %H:%i:%S') regDate
from etf_list
         left JOIN (select market, stock_code, max(reg_unixtime) reg_unixtime
                    from etf_price_history
                    where reg_unixtime BETWEEN UNIX_TIMESTAMP(DATE_ADD(CURDATE(), INTERVAL -1 DAY)) AND UNIX_TIMESTAMP(DATE_ADD(CURDATE(), INTERVAL 1 DAY))
                    group by market, stock_code) H1
                   ON etf_list.market = H1.market AND etf_list.stock_code = H1.stock_code
         left JOIN etf_price_history H2 ON etf_list.market = H2.market AND etf_list.stock_code = H2.stock_code AND
                                             H1.reg_unixtime = H2.reg_unixtime 
                                             )
                                             ;

-- ETF 내 주식가격데이터 가져오는 뷰
CREATE OR REPLACE VIEW price_info as
select etf_list.market       as market_code,
       etf_list.stock_code   as etfStockCode,
       etf_list.etf_name     as etfNm,
       stock_list.stock_code as stockCode,
       stock_list.stock_name as stockNm,
       H2.open,
       H2.high,
       H2.low,
       H2.price,
       H2.last_day_price,
       H2.tomv,
       H2.h52p,
       H2.l52p,
       H2.perx,
       H2.pbrx,
       H2.epsx,
       H2.bpsx,
       H2.t_xprc AS  tXprc,
       H2.t_xdif AS  tXdif,
       concat(H2.t_xrat, '%') tXrat,
       H2.p_xprc AS  pXprc,
       H2.p_xdif AS  pXdif,
       concat(H2.p_xrat, '%') pXrat,
       H2.t_rate AS  tRate,
       H2.e_icod AS  eIcod
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
;

