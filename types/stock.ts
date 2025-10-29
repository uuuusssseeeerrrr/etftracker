import type { EtfList, StockList, StockPriceHistory, EtfStockList } from '@prisma/client';

interface etfStockCodeResponse {
  etfInfo: EtfList | null;
  stockInfo: any[] | null;
}

interface stockSlugResponse {
  stockInfo: StockList | null,
  stockPriceHistory: StockPriceHistory[] | null,
  weightInfo: EtfStockList[] | null
}

export type { etfStockCodeResponse, stockSlugResponse };