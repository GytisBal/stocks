class Autocomplete {
  constructor(searchText) {
    this.searchText = searchText;
    this.currentFocus = -1;
    this.matchList = document.getElementById("match-list");
    this.search = document.getElementById("symbolValue");
    this.chartHeader = document.getElementById("chartHeader");
    this.symbol = document.getElementById("uiSymbol");
    this.name = document.getElementById("name");
  }
  // Main atocomplete function
  searchMatches(stocks) {
    // Init alertMessages for the alert message
    const alertMessages = new AlertMessages();
    // set variable for passed data
    let array = stocks["bestMatches"];
    // validate
    if (stocks["Note"]) {
      // show error message
      alertMessages.showAlert2(`${stocks["Note"]}`, "alert-danger");
      // Close list and empty matches
      array = [];
      matchList.innerHTML = "";
    } else if (this.searchText.length === 0 || array.length === 0) {
      // Close list and empty matches
      array = [];
      matchList.innerHTML = "";
    } else {
      outputHtml(array, this.matchList);
    }
    // output HTML UI

    function outputHtml(array, matchList) {
      if (array.length > 0) {
        // Create list items for each match
        const html = array
          .map(
            match => `
            <div >
            <h6 class = "listItem" ><span class = "child"> ${
              match["1. symbol"]
            }</span> (${match["2. name"]})</h6>
            </div>
            `
          )
          .join("");
        // change UI
        matchList.innerHTML = html;
      }
    }
  }
  // Close autocomplete list and input selected value then stock is selected
  closeList(e) {
    if (e.target.classList.contains("listItem")) {
      let children = e.target.childNodes[0];
      /*insert the value for the autocomplete text field:*/
      this.search.value = children.innerText;
      /*close the list of autocompleted values,
        (or any other open lists of autocompleted values:*/
      this.matchList.innerHTML = "";
    }
  }
  // Autocomplete list functionality with arrow keys and Enter button
  keyMovement(e) {
    let x = document.getElementById("match-list");
    if (x) {
      x = x.getElementsByTagName("div");
    }
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
      this.currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x, this.currentFocus);
    } else if (e.keyCode == 38) {
      //up
      /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
      this.currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x, this.currentFocus);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, Close autocomplete list and input selected value, prevent the form from being submitted,*/
      if (this.search.value == 0) {
      } else {
        if (x.length == 0) {
          // close the list
          matchList.innerHTML = "";
        } else {
          // input selected value
          this.search.value =
            x[this.currentFocus].childNodes[1].childNodes[0].innerText;
          // close the list
          matchList.innerHTML = "";
          // prevent the form from being submitted
          e.preventDefault();
        }
      }
    }
    // Mark selected item with color
    function addActive(x, currentFocus) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = x.length - 1;
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    // Remove selecter item color
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
  }
  // Change main Header, symbol and company name from the table
  changeHeader(matches) {
    if (matches["Error Message"]) {
    } else if (matches["bestMatches"] == undefined) {
    } else {
      this.name.innerHTML = matches["bestMatches"]["0"]["2. name"];
      this.symbol.innerHTML = matches["bestMatches"]["0"]["1. symbol"];
      this.chartHeader.innerHTML = this.name.innerHTML;
    }
  }
  // change search input value
  changeSearchText(searchText) {
    this.searchText = searchText;
  }
  // Set variable for adding and removing css class on autocomplete list
  changeCurrentFocus(currentFocus) {
    this.currentFocus = currentFocus;
  }
}
