class FavList {
  constructor() {}
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
    }
    arrow();
  }
  showAlert(message, className) {
    // Create div
    const div = document.createElement("div");
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector(".chartContainer");
    // Get form
    const form = document.querySelector(".table");
    // Insert alert
    container.insertBefore(div, form);
    // Smooth scroll
    const scrollTo = document.getElementById("chartHeader");
    const y = scrollTo.getBoundingClientRect().top + window.scrollY;
    window.scroll({
      top: y,
      behavior: "smooth"
    });
    // Timeout after 3 sec
    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 3000);
  }
  showAlert2(message, className) {
    // Create div
    const div = document.createElement("div");
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector(".card-body");
    // Get form
    const form = document.getElementById("searchSymbol");
    // Insert alert
    container.insertBefore(div, form);
    // Smooth scroll
    const y = container.getBoundingClientRect().top + window.scrollY;
    window.scroll({
      top: y,
      behavior: "smooth"
    });
    // Timeout after 3 sec
    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 3000);
  }
  showAlert3(message, className) {
    // Create div
    const div = document.createElement("div");
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector(".favList");
    // Insert alert
    container.insertBefore(div, container.childNodes[5]);
    // Smooth scroll
    const y = container.getBoundingClientRect().top + window.scrollY;
    window.scroll({
      top: y,
      behavior: "smooth"
    });
    // Timeout after 3 sec
    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 3000);
  }

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
