const stock = new Stock();

const ui = new UI();

const searchSymbol = document.getElementById("searchSymbol");

searchSymbol.addEventListener("submit", e => {
  const symbol = document.getElementById("symbolValue").value;
  stock.changeSymbol(symbol);

  stock
    .getStock()
    .then(results => {
      ui.paint(results);
    })
    .catch(err => console.log(err));

  e.preventDefault();
});
