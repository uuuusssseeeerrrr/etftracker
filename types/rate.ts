interface rateChartSQLResult {
  DAY: String | null,
  MAX_RATE: String | null,
  MIN_RATE: String | null,
  OPEN_RATE: String | null,
  CLOSE_RATE: String | null,
}

interface rateChartResponse {
  x : String,
  y : [String, String, String, String]
}

export type { rateChartSQLResult, rateChartResponse };