const myLibrary = [];

class Book {
  constructor(title, author, volume, pages, readStatus) {
    (this.title = title),
      (this.author = author),
      (this.volume = volume),
      (this.pages = pages),
      (this.readStatus = readStatus);
  }

  changeReadStatus() {
    this.readStatus = !this.readStatus;
  }
}

if (myLibrary.length === 0) {
  const book = new Book("The Hobbit", "J. R. R. Tolkien", 1, 320, false);
  addBookToLibrary(book);
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const btnAddBook = document.querySelector(".btn-add-book");
const libraryBooks = document.querySelector(".library-books");
const submitForm = document.querySelector("input[type=submit]");
const dialog = document.querySelector("dialog");
const closeButton = document.querySelector("dialog button");
const dialogReadStatus = document.querySelector(
  "dialog form input[type=checkbox]"
);
let dialogReadStatusPhara = document.querySelector(".dialog-readstatus-div p");

dialogReadStatus.addEventListener("click", () => {
  if (dialogReadStatus.checked) {
    dialogReadStatusPhara.innerText = "Completed";
  } else {
    dialogReadStatusPhara.innerText = "To Read";
  }
  console.log(dialogReadStatusPhara, dialogReadStatus.checked);
});
btnAddBook.addEventListener("click", () => {
  dialog.showModal();
});
closeButton.addEventListener("click", () => {
  const form = document.querySelector("form");
  form.reset();
  dialogReadStatusPhara.innerText = "To Read";
  dialog.close();
});

function loadBooks() {
  reloadLibraryBooks();
  myLibrary.map((book) => constructCard(book));
}
loadBooks();

function constructCard(book) {
  const card = document.createElement("div");
  card.classList = "card";
  let title = document.createElement("h2");
  title.classList = "card-title";
  title.innerText = `Title: ${book.title}`;
  card.appendChild(title);
  let author = document.createElement("h3");
  author.classList = "card-author";
  author.innerText = `Author: ${book.author}`;
  card.appendChild(author);
  let volumePhara = document.createElement("p");
  volumePhara.classList = "card-volume";
  volumePhara.innerText = `Volume: ${book.volume}`;
  card.appendChild(volumePhara);
  let pagesPhara = document.createElement("p");
  pagesPhara.classList = "card-pages";
  pagesPhara.innerText = `Nº Pages ${book.pages}`;
  card.appendChild(pagesPhara);

  let statusDiv = document.createElement("div");
  statusDiv.classList = "card-status-div";
  let readStatusPhara = document.createElement("p");
  readStatusPhara.classList = "status-text";
  readStatusPhara.innerText = book.readStatus
    ? "Status: Completed"
    : "Status: To Read";
  statusDiv.appendChild(readStatusPhara);
  const changerReadStatus = document.createElement("input");
  changerReadStatus.classList = "status-change";
  if (book.readStatus) changerReadStatus.checked = true;
  changerReadStatus.setAttribute("type", "checkbox");
  changerReadStatus.addEventListener("click", () => {
    book.changeReadStatus();
    readStatusPhara.innerText = book.readStatus
      ? "Status: Completed"
      : "Status: To Read";
  });
  statusDiv.appendChild(changerReadStatus);
  card.appendChild(statusDiv);

  const removeButton = document.createElement("button");
  removeButton.classList = "card-remove-button";
  removeButton.innerText = "Remove Book";
  removeButton.addEventListener("click", () => {
    let bookIndex = myLibrary.indexOf(book);
    myLibrary.splice(bookIndex, 1);
    loadBooks();
  });
  card.appendChild(removeButton);

  libraryBooks.appendChild(card);
}

function reloadLibraryBooks() {
  if (libraryBooks.hasChildNodes()) {
    libraryBooks.replaceChildren();
  }
}

const form = document.querySelector("form");

const inputTitle = document.querySelector("#title");
const inputAuthor = document.querySelector("#author");
const inputVolume = document.querySelector("#volume");
const inputPages = document.querySelector("#pages");
const inputReadStatus = document.querySelector("#readStatus").checked;

form.addEventListener("submit", (e) => {
  console.log("Merda");
  e.preventDefault();
  showError();

  if (form.checkValidity()) {
    const book = new Book(
      inputTitle.value,
      inputAuthor.value,
      inputVolume.value,
      inputPages.value,
      inputReadStatus.checked
    );
    addBookToLibrary(book);
    loadBooks();

    const form = document.querySelector("form");
    form.reset();
    dialogReadStatusPhara.innerText = "To Read";
    dialog.close();
  }
});

function showError() {
  const titleError = document.querySelector(".titleError");
  const authorError = document.querySelector(".authorError");
  const volumeError = document.querySelector(".volumeError");
  const pageError = document.querySelector(".pageError");

  let formValid = true;

  if (inputTitle.validity.valueMissing) {
    titleError.textContent = "No Title Provided";
    formValid = false;
  } else {
    titleError.textContent = "";
  }
  if (inputAuthor.validity.valueMissing) {
    authorError.textContent = "No Author Provided";
    formValid = false;
  } else {
    authorError.textContent = "";
  }
  if (
    inputVolume.validity.rangeUnderflow ||
    inputVolume.validity.valueMissing
  ) {
    volumeError.textContent = "No Volume Provided or Value Invalid";
    formValid = false;
  } else {
    volumeError.textContent = "";
  }
  if (inputPages.validity.rangeUnderflow || inputPages.validity.valueMissing) {
    pageError.textContent = "No Pages Provided or Value Invalid";
    formValid = false;
  } else {
    pageError.textContent = "";
  }
}
