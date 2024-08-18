const myLibrary = [
    {
        title: 'Test',
        author: 'test',
        volume: 1,
        pages: 300,
        readStatus: false,
    },
    {
        title: 'Test_2',
        author: 'test_2',
        volume: 1,
        pages: 200,
        readStatus: true,
    },
];

function Book(title, author, volume, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.volume = volume;
    this.pages = pages;
    this.readStatus = readStatus;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

const btnAddBook = document.querySelector('.btn-add-book');
const libraryBooks = document.querySelector('.library-books');

btnAddBook.addEventListener('click', () => {

})

function loadBooks() {
    myLibrary.map((book) => {
        const card = document.createElement('div');
        card.classList = 'card';
        let title = document.createElement('h2');
        title.innerText = book.title;
        card.appendChild(title);
        let author = document.createElement('h3');
        author.innerText = book.author;
        card.appendChild(author);
        let volumePhara = document.createElement('p');
        volumePhara.innerText = book.volume;
        card.appendChild(volumePhara);
        let pagesPhara = document.createElement('p');
        pagesPhara.innerText = book.pages;
        card.appendChild(pagesPhara);
        let readStatusPhara = document.createElement('p');
        readStatusPhara.innerText = book.readStatus;
        card.appendChild(readStatusPhara);

        libraryBooks.appendChild(card);
    })
}


loadBooks();