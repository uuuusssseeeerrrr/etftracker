CREATE VIEW price_info as
select etf_list.market                                                       as market_code,
       etf_list.stock_code                                                    as etfStockCode,
       etf_list.stock_name                                                      as etfStockNm,
       stock_list.stock_code                                              as stockCode,
       stock_list.stock_name                                                as stockNm,
       history.*
from etf_list
join etf_stock_list on etf_list.market = etf_stock_list.market and etf_list.stock_code = etf_stock_list.etf_stock_code
join stock_list on etf_stock_list.market = stock_list.market and etf_stock_list.stock_code = stock_list.stock_code
left JOIN (
	select market, stock_code, max(reg_unixtime) reg_unixtime
   from stock_price_history
   where reg_unixtime BETWEEN UNIX_TIMESTAMP(DATE_ADD(CURDATE(), INTERVAL -1 DAY)) AND UNIX_TIMESTAMP(DATE_ADD(CURDATE(), INTERVAL 1 DAY))
   group by market, stock_code
) history
on stock_list.market = history.market and stock_list.stock_code = history.stock_code
;