// Constructor class
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// All prototypes(parameters) go in UI class
class UIadd {
  addBookToAddList(bookAdd) {
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

    addList.prepend(row);
  }

  showAlert(message, className) {
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
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

// Local Storage Class
class Store {
  static getBooks() {
    // fetch from LS
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static displayBooksAdd() {
    const books = Store.getBooks();
    books.forEach(function (book) {
      const ui = new UIadd(); // instantiated
      // Add book to UI
      ui.addBookToAddList(book);
    });
  }
  static displayBooksRead() {
    const books = Store.getBooks();
    books.forEach(function (book) {
      const ui = new UIread(); // instantiated
      // Add book to UI
      ui.addBookToAddList(book);
    });
  }
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

// DOM Load Event
document.addEventListener("DOMContentLoaded", Store.displayBooks);

// Event Listeners for add book
document.getElementById("addBook").addEventListener("click", function (e) {
  // Get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // Once submitted, instantiate Book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const uiAdd = new UIadd();

  // Test to show console __proto__
  // console.log(uiAdd);

  // Validate
  if (title === "" || author === "" || isbn === "") {
    uiAdd.showAlert("Please fill in all fields", "error");
  } else {
    //  Add book to Read list
    uiAdd.addBookToAddList(book);

    // Add to LS (not instantiated as is static)
    Store.addBook(book);

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

  // Test to show console __proto__
  // console.log(uiRead);

  // Validate
  if (title === "" || author === "") {
    uiRead.showAlert("Please fill in all fields", "error");
  } else {
    //  Add book to Read list
    uiRead.addBookToReadList(book);

    // Add to LS (not instantiated as is static)
    Store.addBook(book);

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

  // Remove from LS
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

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

    // Remove from LS
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Show alert
    uiRead.showAlert("Book Removed", "success");

    e.preventDefault;
  });

class UIread {
  addBookToReadList(bookRead) {
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
  }

  showAlert(message, className) {
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
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}
