class UI {
  constructor(uiInterval) {
    this.uiInterval = uiInterval;
    this.uiTimeFrame = "TIME_SERIES_DAILY";
    this.symbol = "ba";
    this.uiSymbol = document.getElementById("uiSymbol");
    this.name = document.getElementById("name");
    this.stockPrice = document.getElementById("stockPrice");
    this.changePercent = document.getElementById("changePercent");
    this.chartHeader = document.getElementById("chartHeader");
  }

  paint(stock) {
    console.log(stock);

    const favList3 = new FavList();

    if (stock["Error Message"]) {
      favList3.showAlert2("stock is not found", "alert-danger");
    } else if (stock["Note"]) {
      favList3.showAlert2(`${stock["Note"]}`, "alert-danger");
    } else {
      //Change data based on selected time series
      let timeSeries;
      if (this.uiTimeFrame === "TIME_SERIES_INTRADAY") {
        timeSeries = "Time Series" + " " + `(${this.uiInterval})`;
      } else if (this.uiTimeFrame === "TIME_SERIES_DAILY") {
        timeSeries = "Time Series (Daily)";
      } else if (this.uiTimeFrame === "TIME_SERIES_WEEKLY") {
        timeSeries = "Weekly Time Series";
      } else if (this.uiTimeFrame === "TIME_SERIES_MONTHLY") {
        timeSeries = "Monthly Time Series";
      }
      // Get latest date
      // const lastRefreshed = stock["Meta Data"]["3. Last Refreshed"];
      //Get date without time
      // const dateObj = new Date(lastRefreshed);
      // const month = dateObj.getMonth() + 1; //months from 1-12
      // const day = dateObj.getDate();
      // const year = dateObj.getFullYear();
      // const newdate =
      //   year + "-" + ("0" + month).slice(-2) + "-" + ("0" + day).slice(-2);

      // HighChart UI starts HERE
      const tSeries = stock[`${timeSeries}`];
      let ohlc = [],
        volume = [];
      for (let tempData in tSeries) {
        const changeDate = new Date(tempData);
        const timeStamp = changeDate.getTime();
        ohlc.push([
          parseFloat(timeStamp), // the date
          parseFloat(tSeries[tempData]["1. open"]), // open
          parseFloat(tSeries[tempData]["2. high"]), // high
          parseFloat(tSeries[tempData]["3. low"]), // low
          parseFloat(tSeries[tempData]["4. close"]) // close
        ]);

        volume.push([
          parseFloat(timeStamp), // the date
          parseFloat(tSeries[tempData]["5. volume"]) // the volume
        ]);
      }
      ohlc = ohlc.reverse();
      volume = volume.reverse();

      Highcharts.stockChart("chartContainer", {
        yAxis: [
          {
            labels: {
              align: "left"
            },
            height: "80%",
            resize: {
              enabled: true
            }
          },
          {
            labels: {
              align: "left"
            },
            top: "80%",
            height: "20%",
            offset: 0
          }
        ],
        tooltip: {
          shape: "square",
          headerShape: "callout",
          borderWidth: 0,
          shadow: false,
          positioner: function(width, height, point) {
            var chart = this.chart,
              position;

            if (point.isHeader) {
              position = {
                x: Math.max(
                  // Left side limit
                  chart.plotLeft,
                  Math.min(
                    point.plotX + chart.plotLeft - width / 2,
                    // Right side limit
                    chart.chartWidth - width - chart.marginRight
                  )
                ),
                y: point.plotY
              };
            } else {
              position = {
                x: point.series.chart.plotLeft,
                y: point.series.yAxis.top - chart.plotTop
              };
            }

            return position;
          }
        },
        series: [
          {
            type: "ohlc",
            id: `${this.symbol}-ohlc`,
            name: `${this.symbol.toUpperCase()} Stock Price`,
            data: ohlc
          },
          {
            type: "column",
            id: `${this.symbol}-volume`,
            name: `${this.symbol.toUpperCase()} Volume`,
            data: volume,
            yAxis: 1
          }
        ],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 800
              },
              chartOptions: {
                rangeSelector: {
                  inputEnabled: false
                }
              }
            }
          ]
        }
      });
    }
  }
  paint1(stock1) {
    console.log(stock1);
    function isEmpty(obj) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) return false;
      }
      return true;
    }
    const myObj = stock1["Global Quote"];
    if (isEmpty(myObj)) {
    } else {
      this.uiSymbol.innerHTML = stock1["Global Quote"]["01. symbol"];
      this.name.innerHTML = chartHeader.innerHTML;
      this.stockPrice.innerHTML = stock1["Global Quote"]["05. price"];
      this.changePercent.innerHTML =
        stock1["Global Quote"]["10. change percent"];

      objectValues(
        this.uiSymbol.innerHTML,
        this.name.innerHTML,
        this.stockPrice.innerHTML,
        this.changePercent.innerHTML
      );

      const arrow = document.getElementById("arrow");
      const withoutPercent = Number(this.changePercent.innerText.slice(0, 4));
      if (withoutPercent < 0) {
        arrow.classList.add("fa-arrow-down");
        arrow.style.color = "red";
        this.changePercent.style.color = "red";
      } else {
        this.changePercent.style.color = "green";
        arrow.style.color = "green";
        arrow.classList.add("fa-arrow-up");
      }
    }
  }
  paint2(stock2) {
    if (stock2["Error Message"]) {
    } else if (stock2["bestMatches"].length == 0) {
    } else if (
      stock2["bestMatches"]["0"]["1. symbol"] !== this.uiSymbol.innerHTML
    ) {
    } else if (
      stock2["bestMatches"]["0"]["1. symbol"] == this.symbol.toUpperCase()
    ) {
      this.chartHeader.innerHTML = stock2["bestMatches"]["0"]["2. name"];
      this.name.innerHTML = stock2["bestMatches"]["0"]["2. name"];
    }
  }

  changeSymbol(symbol) {
    this.symbol = symbol;
  }

  changeUiInterval(uiInterval) {
    this.uiInterval = uiInterval;
  }
  changeUiTimeFrame(uiTimeFrame) {
    this.uiTimeFrame = uiTimeFrame;
  }
}
const favList = new FavList();

const listItems = document.getElementById("listItems");
const favButton = document.getElementById("favButton");
const listItemsNodes = listItems.childNodes;

const MyApp = {}; // Globally scoped object
// Get Values from ui.paint1
function objectValues(symbol, name, price, changePercent) {
  MyApp.symbol = symbol;
  MyApp.name = name;
  MyApp.price = price;
  MyApp.changePercent = changePercent;
}
objectValues();

const listItemsArray = [];
//Validate
favButton.addEventListener("click", function(e) {
  const indexArray = listItemsArray.indexOf(`${MyApp.symbol}`);

  if (MyApp.symbol === undefined) {
    favList.showAlert("Stock is undefined", "alert-danger");
  } else if (listItemsArray.length == 5) {
    favList.showAlert("Cannot add more than 5 stocks", "alert-danger");
  } else if ((listItems.hasChildNodes() == false) & (indexArray == -1)) {
    favList.addToList(
      MyApp.symbol,
      MyApp.name,
      MyApp.price,
      MyApp.changePercent
    );
    listItemsArray.push(`${MyApp.symbol}`);
    favList.showAlert("Stock has been added", "alert-success");
  } else if (listItems.hasChildNodes() & (indexArray == -1)) {
    favList.addToList(
      MyApp.symbol,
      MyApp.name,
      MyApp.price,
      MyApp.changePercent
    );
    listItemsArray.push(`${MyApp.symbol}`);
    favList.showAlert("Stock has been added", "alert-success");
  } else {
    favList.showAlert("Stock has already been added", "alert-danger");
  }
});
// Delete stock
listItems.addEventListener("click", function(e) {
  const targetValue = e.target;
  favList.deleteStock(listItemsArray, targetValue);
  favList.showAlert3("Stock has been deleted", "alert-danger");
  e.preventDefault();
});
