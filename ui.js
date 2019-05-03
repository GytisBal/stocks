class UI {
  constructor() {
    this.open = document.getElementById("open");
    this.high = document.getElementById("high");
    this.low = document.getElementById("low");
    this.close = document.getElementById("close");
    this.volume = document.getElementById("volume");
  }

  paint(stock) {
    const lastRefreshed = stock["Meta Data"]["3. Last Refreshed"];
    const latestData = stock["Time Series (5min)"][`${lastRefreshed}`];

    this.open.value = parseFloat(latestData["1. open"]).toFixed(2);
    this.high.value = parseFloat(latestData["2. high"]).toFixed(2);
    this.low.value = parseFloat(latestData["3. low"]).toFixed(2);
    this.close.value = parseFloat(latestData["4. close"]).toFixed(2);
    this.volume.value = parseFloat(latestData["5. volume"]).toFixed(0);

    console.log(stock);
  }
}
