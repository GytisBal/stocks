class FavList {
  constructor() {}
  //create row to favourite list
  addToList(symbol, name, price, changePercent) {
    // Create tr element
    const row = document.createElement("tr");
    row.setAttribute("id", `${symbol}`);
    // Insert cols
    row.innerHTML = `
        <th scope="row">${symbol}</th>
        <td>${name}</td>
        <td>${price}</td>
        <td id="changePercent${symbol}" style="display:inline-block;">${changePercent}</td>
        <td style="display:inline-block;padding-left:0">
        <i id="arrow${symbol}" class="fa"></i></td>
        <td><a href="#" class="delete">X<a></td>
      `;
    listItems.appendChild(row);
    // stock arrow functionality
    function arrow() {
      const arrow = document.getElementById(`arrow${symbol}`);
      const changePercent = document.getElementById(`changePercent${symbol}`);

      const withoutPercent = Number(changePercent.innerText.slice(0, 4));
      if (withoutPercent < 0) {
        arrow.classList.add("fa-arrow-down");
        arrow.style.color = "red";
        changePercent.style.color = "red";
      } else {
        changePercent.style.color = "green";
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
    arrow();
  }
  // delete stock from favourite list
  deleteStock(listItemsArray, targetValue) {
    function validate() {
      if (targetValue.className === "delete") {
        const index = listItemsArray.indexOf(
          `${targetValue.parentElement.parentElement.id}`
        );
        if (index > -1) {
          listItemsArray.splice(index, 1);
        }
        targetValue.parentElement.parentElement.remove();
      }
    }
    validate();
  }
}
