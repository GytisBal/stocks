class AlertMessages {
  constructor() {}
  // show alert between chart header and table
  showAlert(message, className) {
    // check if the alert messages is already in the DOM
    if (document.querySelector(".alert") != null) {
      // remove alert message
      document.querySelector(".alert").remove();
    }
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
      if (document.querySelector(".alert") != null) {
        document.querySelector(".alert").remove();
      }
    }, 3000);
  }
  // show alert above search input
  showAlert2(message, className) {
    // check if the alert messages is already in the DOM
    if (document.querySelector(".alert") != null) {
      // remove alert message
      document.querySelector(".alert").remove();
    }
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
      if (document.querySelector(".alert") != null) {
        document.querySelector(".alert").remove();
      }
    }, 5000);
  }
  // show alert beside favorite list
  showAlert3(message, className) {
    // check if the alert messages is already in the DOM
    if (document.querySelector(".alert") != null) {
      // remove alert message
      document.querySelector(".alert").remove();
    }
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
      if (document.querySelector(".alert") != null) {
        document.querySelector(".alert").remove();
      }
    }, 3000);
  }
}
