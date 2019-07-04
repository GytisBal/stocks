// Init stock data object
const stock = new Stock();
// Init UI
const ui = new UI();
// Init Autocomplete
const autocomplete = new Autocomplete();
// UI variables
const searchSymbol = document.getElementById("searchSymbol");
const intervalButtons = document.getElementById("intervalButtons");
const timeFrameButtons = document.getElementById("timeFrame");
const search = document.getElementById("symbolValue");
const matchList = document.getElementById("match-list");
const stockPrice = document.getElementById("stockPrice");
// define a variable that is used for arrow buttons in autocomplete function
let currentFocus = -1;
// DOM Events
// event for selecting minute interval
intervalButtons.addEventListener("click", getInterval);
// event for selecting daily, weekly or monthly
timeFrameButtons.addEventListener("click", getTimeFrame);
// event then press enter or click on search button
searchSymbol.addEventListener("submit", getSymbol);
// call autocomplete function then typing
search.addEventListener("input", matching);
// Close matchlist then item is selected
matchList.addEventListener("click", e => {
  autocomplete.closeList(e);
});
// Use arrow keys to navigate the list
search.addEventListener("keydown", (e, currentFocus) => {
  autocomplete.keyMovement(e, currentFocus);
});
// Click anywhere on window to close list
document.addEventListener("click", () => {
  matchList.innerHTML = "";
});

// fetch data results from alphavantage.js starts here

// get data from getstock api
function getStock() {
  stock
    .getStock()
    .then(results => {
      //Display data
      ui.paint(results);
    })
    .catch(err => console.log(err));
}
// get data from getquote api
function getQuote() {
  stock
    .getQuote()
    .then(results => {
      //Display data
      ui.paint1(results);
    })
    .catch(err => console.log(err));
}
// get data from autocomplete api
function getSearchEndpoint() {
  stock
    .getSearchEndpoint()
    .then(results => {
      //Display data
      autocomplete.searchMatches(results);
    })
    .catch(err => console.log(err));
}
// get data from autocomplete api for changing header
function changeHeader() {
  stock.getSearchEndpoint();
  stock
    .getSearchEndpoint()
    .then(results => {
      autocomplete.changeHeader(results);
    })
    .catch(err => console.log(err));
}
// fetch data results from alphavantage.js ends here

// change data based of input value, on submit
function getSymbol(e) {
  const alertMessages = new AlertMessages();
  // declare input value
  const symbol = document.getElementById("symbolValue").value;
  //change value for fetching data
  stock.changeSymbol(symbol);
  ui.changeSymbol(symbol);
  stock.changeSymbolSearch(symbol);
  // define error Index for validating API call
  let errorIndex;
  // Get and display stock data in sequence
  stock.getStock().then(results => {
    return new Promise((resolve, reject) => {
      if (results["Error Message"]) {
        alertMessages.showAlert2("stock is not found", "alert-danger");
      } else if (results["Note"]) {
        alertMessages.showAlert2(`${results["Note"]}`, "alert-danger");
        reject(`Rejected getStock`);
      } else {
        ui.paint(results);
        resolve();
      }
    })
      .then(() => {
        stock.getQuote().then(results => {
          return new Promise((resolve, reject) => {
            if (results["Note"]) {
              alertMessages.showAlert2(`${results["Note"]}`, "alert-danger");
              errorIndex = 1;
              reject(`Rejected getQuote`);
            } else {
              errorIndex = 0;
              ui.paint1(results);
              resolve();
            }
          });
        });
      })
      .then(() => {
        stock.getSearchEndpoint().then(results => {
          return new Promise((resolve, reject) => {
            if (errorIndex == 1) {
              reject(`Rejected getSearchEndpoint`);
            } else {
              autocomplete.changeHeader(results);
              resolve();
            }
          });
        });
      });
  });
  //close a list
  matchList.innerHTML = "";
  // // prevent from default submitting
  e.preventDefault();
}
// change data then selecting minute graph intervals
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
// change data then selecting daily, weekly or monthly graph intervals
function getTimeFrame(e) {
  if (e.target.classList.contains("timeFrame")) {
    timeFrame = e.target.value;
    stock.changeTimeFrame(timeFrame);
    ui.changeUiTimeFrame(timeFrame);
  }
  getStock();
}
// change data when typing
function matching(e) {
  const symbol = document.getElementById("symbolValue").value;
  stock.changeSymbolSearch(symbol);
  autocomplete.changeSearchText(symbol);
  // define a variable that is used for arrow buttons in autocomplete function
  autocomplete.changeCurrentFocus(-1);
  getSearchEndpoint();
  e.preventDefault();
}
