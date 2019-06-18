// Init stock data object
const stock = new Stock();
// Init UI
const ui = new UI();

// UI variables
const searchSymbol = document.getElementById("searchSymbol");
const intervalButtons = document.getElementById("intervalButtons");
const timeFrameButtons = document.getElementById("timeFrame");
// Events
intervalButtons.addEventListener("click", getInterval);
timeFrameButtons.addEventListener("click", getTimeFrame);
searchSymbol.addEventListener("submit", getSymbol);

const stockPrice = document.getElementById("stockPrice");
function getStock() {
  stock
    .getStock()
    .then(results => {
      ui.paint(results);
    })
    .catch(err => console.log(err));
}
getStock();

function getQuote() {
  stock
    .getQuote()
    .then(results => {
      ui.paint1(results);
    })
    .catch(err => console.log(err));
}
// getQuote();
function getSearchEndpoint() {
  stock
    .getSearchEndpoint()
    .then(results => {
      ui.paint2(results);
    })
    .catch(err => console.log(err));
}

function getSymbol(e) {
  const symbol = document.getElementById("symbolValue").value;
  stock.changeSymbol(symbol);
  ui.changeSymbol(symbol);
  // Get and display stock data

  getStock();
  getQuote();
  getSearchEndpoint();
  e.preventDefault();
}

function getInterval(e) {
  if (e.target.classList.contains("interval")) {
    interval = e.target.value;
    stock.changeTimeFrame("TIME_SERIES_INTRADAY");
    ui.changeUiTimeFrame("TIME_SERIES_INTRADAY");
    stock.changeInterval(interval);
    ui.changeUiInterval(interval);
  }
  getStock();
}

function getTimeFrame(e) {
  if (e.target.classList.contains("timeFrame")) {
    timeFrame = e.target.value;
    stock.changeTimeFrame(timeFrame);
    ui.changeUiTimeFrame(timeFrame);
  }
  getStock();
}
