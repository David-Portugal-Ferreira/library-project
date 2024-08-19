const myLibrary = [];

function Book(title, author, volume, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.volume = volume;
    this.pages = pages;
    this.readStatus = readStatus;
}
Book.prototype.changeReadStatus = function () {
    this.readStatus = !this.readStatus;
}

if (myLibrary.length === 0) {
    const book = new Book('Test', 'test', 1, 300, false);
    addBookToLibrary(book);
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

const btnAddBook = document.querySelector('.btn-add-book');
const libraryBooks = document.querySelector('.library-books');
const submitForm = document.querySelector('input[type=submit]');
const dialog = document.querySelector('dialog');
const closeButton = document.querySelector('dialog button');

btnAddBook.addEventListener('click', () => { dialog.showModal() });
closeButton.addEventListener('click', () => dialog.close());

submitForm.addEventListener('click', (e) => {
    e.preventDefault();
    let inputTitle = document.querySelector('#title').value;
    let inputAuthor = document.querySelector('#author').value;
    let inputVolume = document.querySelector('#volume').value;
    let inputPages = document.querySelector('#pages').value;
    let inputReadStatus = document.querySelector('#readStatus').checked;

    const book = new Book(inputTitle, inputAuthor, inputVolume, inputPages, inputReadStatus);
    addBookToLibrary(book);
    loadBooks();

    const form = document.querySelector('form');
    form.reset();
    dialog.close();
})

function loadBooks() {
    reloadLibraryBooks();
    myLibrary.map(book => constructCard(book));
}
loadBooks();

function constructCard(book) {
    const card = document.createElement('div');
    card.classList = 'card';
    let title = document.createElement('h2');
    title.innerText = `Title: ${book.title}`;
    card.appendChild(title);
    let author = document.createElement('h3');
    author.innerText = `Author: ${book.author}`;
    card.appendChild(author);
    let volumePhara = document.createElement('p');
    volumePhara.innerText = `Volume: ${book.volume}`;
    card.appendChild(volumePhara);
    let pagesPhara = document.createElement('p');
    pagesPhara.innerText = `Nº Pages ${book.pages}`;
    card.appendChild(pagesPhara);

    let readStatusPhara = document.createElement('p');
    readStatusPhara.innerText = book.readStatus ? 'Status: Completed' : 'Status: To Read';
    card.appendChild(readStatusPhara);
    const changerReadStatus = document.createElement('input');
    if(book.readStatus) changerReadStatus.checked = true
    changerReadStatus.setAttribute("type", "checkbox")
    changerReadStatus.addEventListener('click', () => {
        book.changeReadStatus();
        readStatusPhara.innerText = book.readStatus ? 'Status: Completed' : 'Status: To Read';
    })
    card.appendChild(changerReadStatus);

    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remove Book';
    removeButton.addEventListener('click', () => {
        let bookIndex = myLibrary.indexOf(book);
        myLibrary.splice(bookIndex, 1);
        loadBooks();
    })
    card.appendChild(removeButton)

    libraryBooks.appendChild(card);
}

function reloadLibraryBooks() {
    if (libraryBooks.hasChildNodes()) {
        libraryBooks.replaceChildren();
    }
}