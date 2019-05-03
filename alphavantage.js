class Stock {
  constructor(symbol) {
    this.apiKey = "PY7CW15TFQ57M1B5";
    this.symbol = symbol;
  }

  //Fetch stock from API
  async getStock() {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${
        this.symbol
      }&interval=5min&apikey=${this.apiKey}`
    );

    const responseData = await response.json();

    return responseData;
  }

  changeSymbol(symbol) {
    this.symbol = symbol;
  }
}
