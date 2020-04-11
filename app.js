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

// Add book to Add list
UIadd.prototype.addBookToAddList = function (bookAdd) {
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

// Add book to Read list
UIread.prototype.addBookToReadList = function (bookRead) {
  const readList = document.getElementById("readBook-list");
  // Create tr element
  const row = document.createElement("tr");
  // Insert cols
  row.innerHTML = `
  <td>${bookRead.title}</td>
  <td>${bookRead.author}</td>
  <td>${bookRead.isbn}</td>
  <td><a href="#" class="delete">X<a></td>
  `;

  readList.appendChild(row);
};

// everything else goes in the prototype
// Event Listeners
document.getElementById("book-form").addEventListener("submit", function (e) {
  // Get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // Once submitted, instantiate Book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const uiAdd = new UIadd();

  //  Add book to Add list
  uiAdd.addBookToAddList(book);

  e.preventDefault();
});

document.getElementById("book-form").addEventListener("submit", function (e) {
  // Get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // Once submitted, instantiate Book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const uiRead = new UIread();

  //  Add book to Read list
  uiRead.addBookToReadList(book);

  e.preventDefault();
});
