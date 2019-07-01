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
  // display highchart data in the html
  paint(stock) {
    const myObj = stock["Meta Data"];
    // variable for alert handling
    const referenceIndex = document.getElementById("referenceIndex");
    // init alert messages
    const alertMessages = new AlertMessages();
    // check if object is empty
    function isEmpty(obj) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) return false;
      }
      return true;
    }
    // check for errors
    if (isEmpty(myObj)) {
      referenceIndex.value == 1;
    } else if (stock["Error Message"]) {
      alertMessages.showAlert2("stock is not found", "alert-danger");
    } else if (stock["Note"]) {
      alertMessages.showAlert2(`${stock["Note"]}`, "alert-danger");
      // if reference index = 1, dont allow other apis to fetch
      referenceIndex.value = 1;
    } else {
      referenceIndex.value = 0;
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
  // display stock data in the html
  paint1(stock1) {
    // variable for alert handling
    const referenceIndex = document.getElementById("referenceIndex");
    // init alert messages
    const alertMessages = new AlertMessages();
    // check if all data is fetched
    if (referenceIndex.value == 1) {
    } else if (stock1["Note"]) {
      alertMessages.showAlert2(`${stock1["Note"]}`, "alert-danger");
      referenceIndex.value == 1;
    } else {
      // check if object is empty
      function isEmpty(obj) {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) return false;
        }
        return true;
      }
      // change UI based on given data
      const myObj = stock1["Global Quote"];
      if (isEmpty(myObj)) {
        referenceIndex.value == 1;
      } else {
        referenceIndex.value == 0;
        this.uiSymbol.innerHTML = stock1["Global Quote"]["01. symbol"];
        this.name.innerHTML = chartHeader.innerHTML;
        this.stockPrice.innerHTML = stock1["Global Quote"]["05. price"];
        this.changePercent.innerHTML =
          stock1["Global Quote"]["10. change percent"];
        // pass values to another function
        objectValues(
          this.uiSymbol.innerHTML,
          this.name.innerHTML,
          this.stockPrice.innerHTML,
          this.changePercent.innerHTML
        );
        // change arrow color and type
        const arrow = document.getElementById("arrow");
        const withoutPercent = Number(this.changePercent.innerText.slice(0, 4));
        if (withoutPercent < 0) {
          arrow.classList.remove("fa-arrow-up");
          arrow.classList.add("fa-arrow-down");
          arrow.style.color = "red";
          this.changePercent.style.color = "red";
        } else {
          arrow.classList.remove("fa-arrow-down");
          this.changePercent.style.color = "green";
          arrow.style.color = "green";
          arrow.classList.add("fa-arrow-up");
        }
        // dont show arrow on mobile size screen
        function myFunction(x) {
          if (x.matches) {
            // If media query matches
            arrow.style.display = "none";
          }
        }
        let x = window.matchMedia("(max-width: 600px)");
        myFunction(x); // Call listener function at run time
        x.addListener(myFunction); // Attach listener function on state changes
      }
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
// add and delete from the favourite list

// init alert messages
const alertMessages = new AlertMessages();
// init favlist
const favList = new FavList();
// UI vars
const listItems = document.getElementById("listItems");
const favButton = document.getElementById("favButton");
const chartHeader = document.getElementById("chartHeader");
const listItemsNodes = listItems.childNodes;
// Globally scoped object
const MyApp = {};
// Globally scoped array
const listItemsArray = [];
// Get Values from ui.paint1
function objectValues(symbol, name, price, changePercent) {
  MyApp.symbol = symbol;
  MyApp.name = name;
  MyApp.price = price;
  MyApp.changePercent = changePercent;
}
objectValues();
//Validate for adding to favourite list
favButton.addEventListener("click", function(e) {
  const indexArray = listItemsArray.indexOf(`${MyApp.symbol}`);
  MyApp.name = chartHeader.innerHTML;
  if (MyApp.symbol === undefined) {
    alertMessages.showAlert("Stock is undefined", "alert-danger");
  } else if (listItemsArray.length == 5) {
    // show alert if favourite list exceeds the limit
    alertMessages.showAlert("Cannot add more than 5 stocks", "alert-danger");
  } else if ((indexArray == -1) & (listItems.hasChildNodes() == false)) {
    // check if there is no matching symbol in the favourite list, and no other objects in the list
    favList.addToList(
      MyApp.symbol,
      MyApp.name,
      MyApp.price,
      MyApp.changePercent
    );
    // push value to array
    listItemsArray.push(`${MyApp.symbol}`);
    // show alert
    alertMessages.showAlert("Stock has been added", "alert-success");
  } else if (listItems.hasChildNodes() & (indexArray == -1)) {
    // check if there is no matching symbol in the favourite list, but has other objects
    favList.addToList(
      MyApp.symbol,
      MyApp.name,
      MyApp.price,
      MyApp.changePercent
    );
    // push value to array
    listItemsArray.push(`${MyApp.symbol}`);
    // show alert
    alertMessages.showAlert("Stock has been added", "alert-success");
  } else {
    // show alert if there is a match
    alertMessages.showAlert("Stock has already been added", "alert-danger");
  }
});
// Delete stock from favourite list
listItems.addEventListener("click", function(e) {
  const targetValue = e.target;
  favList.deleteStock(listItemsArray, targetValue);
  alertMessages.showAlert3("Stock has been deleted", "alert-danger");
  e.preventDefault();
});
