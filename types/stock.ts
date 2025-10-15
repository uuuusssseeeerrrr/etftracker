import type { EtfList, StockList, StockPriceHistory } from '@prisma/client';

interface etfStockCodeResponse {
  etfInfo: EtfList | null;
  stockInfo: any[] | null;
}

interface stockSlugResponse {
  stockInfo: StockList | null,
  stockPriceHistory: StockPriceHistory[] | null,
  weightInfo: any[] | null
}

export type { etfStockCodeResponse, stockSlugResponse };