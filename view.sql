-- 종목상세 뷰 테이블
CREATE VIEW priceInfo as
select etf.market                                                       as market,
       etf.stockCode                                                    as etfStockCode,
       etf.stockNm                                                      as etfStockNm,
       stocklist.stockCode                                              as stockCode,
       stocklist.stockNm                                                as stockNm,
       concat(stockpricehistory.priceDate, stockpricehistory.priceTime) as priceDateTime,
       stockpricehistory.lowPrice                                       as lowPrice,
       stockpricehistory.highPrice                                      as highPrice,
       stockpricehistory.price                                          as price,
       stockpricehistory.priceChangeAmt                                 as priceChangeAmt,
       concat(stockpricehistory.priceChangeRate, '%')                   as priceChangeRate
from etf
         join etfstocklist on etf.market = etfstocklist.market and etf.stockCode = etfstocklist.etfStockCode
         join stocklist on etfstocklist.market = stocklist.market and etfstocklist.stockCode = stocklist.stockCode
         left join stockpricehistory
                   on stocklist.market = stockpricehistory.market and stocklist.stockCode = stockpricehistory.stockCode
where stockpricehistory.priceDate = to_char(now(), 'YYYYMMDD')
  and (stockpricehistory.stockCode, stockpricehistory.priceTime) in (select stockCode, max(priceTime)
                                                                     from stockpricehistory
                                                                     where priceDate = to_char(now(), 'YYYYMMDD')
                                                                     group by stockCode)
