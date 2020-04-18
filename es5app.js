// Using constructors and prototype methods
// Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor, just an empty function
function UIadd() {}
function UIread() {}

// Add book to Add or Read list
const bookListAdd = function (bookAdd) {
  const addList = document.getElementById("addBook-list");
  // Create tr element
  const row = document.createElement("tr");
  // Insert cols
  row.innerHTML = `
  <td>${bookAdd.title}</td>
  <td>${bookAdd.author}</td>
  <td>${bookAdd.isbn}</td>
  <td><a href="#" class="delete">X<a></td>
  `;

  addList.appendChild(row);
};
UIadd.prototype.addBookToAddList = bookListAdd;

const bookListRead = function (bookRead) {
  const addList = document.getElementById("readBook-list");
  // Create tr element
  const row = document.createElement("tr");
  // Insert cols
  row.innerHTML = `
  <td>${bookRead.title}</td>
  <td>${bookRead.author}</td>
  <td>${bookRead.isbn}</td>
  <td><a href="#" class="delete">X<a></td>
  `;

  addList.appendChild(row);
};
UIread.prototype.addBookToReadList = bookListRead;

// Display Alert
const alert = function (message, className) {
  // Create div
  const div = document.createElement("div");
  // Add classes
  div.className = `alert ${className}`;
  // Add textnode and text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const container = document.querySelector(".card");
  // Get form
  const form = document.querySelector("#book-form");
  // Insert alert
  container.insertBefore(div, form);

  // Timeout
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};

UIadd.prototype.showAlert = alert;
UIread.prototype.showAlert = alert;

// Delete book
UIadd.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

UIread.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

// Clear fields
let clear = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

UIadd.prototype.clearFields = clear;
UIread.prototype.clearFields = clear;

// everything else goes in the prototype
// Event Listeners for book
document.getElementById("addBook").addEventListener("click", function (e) {
  // Get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // Once submitted, instantiate Book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const uiAdd = new UIadd();

  // Test to show prototypes
  // console.log(uiAdd);

  // Validate
  if (title === "" || author === "" || isbn === "") {
    uiAdd.showAlert("Please fill in all fields", "error");
  } else {
    //  Add book to Read list
    uiAdd.addBookToAddList(book);

    // Alert success
    uiAdd.showAlert("Book Added", "success");

    // CLear fields
    uiAdd.clearFields();
  }

  e.preventDefault();
});

document.getElementById("readBook").addEventListener("click", function (e) {
  // Get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // Once submitted, instantiate Book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const uiRead = new UIread();

  // Test to show prototypes
  // console.log(uiRead);

  // Validate
  if (title === "" || author === "") {
    uiRead.showAlert("Please fill in all fields", "error");
  } else {
    //  Add book to Read list
    uiRead.addBookToReadList(book);

    // Alert success
    uiRead.showAlert("Book Added", "success");

    // CLear fields
    uiRead.clearFields();
  }

  e.preventDefault();
});
// event listeners for delete X
document.getElementById("addBook-list").addEventListener("click", function (e) {
  // Instantiate UI
  const uiAdd = new UIadd();

  // Delete book
  uiAdd.deleteBook(e.target);

  // Show alert
  uiAdd.showAlert("Book Removed", "success");

  e.preventDefault;
});

document
  .getElementById("readBook-list")
  .addEventListener("click", function (e) {
    // Instantiate UI
    const uiRead = new UIread();

    // Delete book
    uiRead.deleteBook(e.target);

    // Show alert
    uiRead.showAlert("Book Removed", "success");

    e.preventDefault;
  });
