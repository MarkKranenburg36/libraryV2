const bookCollection = [];

function Book(title, author, numOfPages, isFinished, id) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.isFinished = isFinished;
    this.id = id;

    this.toggleBookFinished = function (event) {
        bookToToggleId = event.target.closest('[data-identity]').dataset.identity;
        console.log(bookToToggleId)

        for (const book of bookCollection) {
            if (book.id == bookToToggleId) {
                book.isFinished = !book.isFinished;
            }
        }
        displayBooks();
    }

    this.removeSelf = function (event) {
        const bookIdToRemoveId = event.target.parentElement.parentElement.dataset.identity;
        const bookIdToRemoveIndex = bookCollection.findIndex(book => book.id === bookIdToRemoveId);
        bookCollection.splice(bookIdToRemoveIndex, 1);
        displayBooks();
    }
}

function addBookToLibrary(title, author, numOfPages, isFinished) {
    const id = crypto.randomUUID();
    const book = new Book(title, author, numOfPages, isFinished, id);
    bookCollection.push(book);
}

function displayBooks() {
    const main = document.getElementById('main');
    main.innerHTML = '';

    for (const book of bookCollection) {
        const bookCard = document.createElement('div');
        bookCard.id = 'bookCard';
        bookCard.className = 'bookCard';
        bookCard.dataset.identity = book.id;

        const cardHeader = document.createElement('div');
        cardHeader.className = 'cardHeader';
        bookCard.appendChild(cardHeader);

        const cardTitle = document.createElement('h1');
        cardTitle.innerText = book.title;
        cardHeader.appendChild(cardTitle);

        const removeBtn = document.createElement('button');
        removeBtn.innerText = 'X';
        removeBtn.classList.add('cardRemoveBtn');
        cardHeader.appendChild(removeBtn);

        const cardSubTitle = document.createElement('h2');
        cardSubTitle.innerText = book.author;
        bookCard.appendChild(cardSubTitle);

        const pagesDisplay = document.createElement('p');
        pagesDisplay.innerText = 'Total pages: ' + book.numOfPages;
        bookCard.appendChild(pagesDisplay);

        const isFinishedDisplay = document.createElement('p');
        isFinishedDisplay.innerText = book.isFinished ? 'Finished' : 'Not Finished';
        bookCard.appendChild(isFinishedDisplay);

        bookCard.addEventListener('dblclick', book.toggleBookFinished);
        removeBtn.addEventListener('click', book.removeSelf);

        if (book.isFinished) {
            bookCard.classList.add('bookCard-Finished');
        } else {
            bookCard.classList.add('bookCard-NotFinished');
        }

        main.appendChild(bookCard);
    }
}

const addBookDialog = document.getElementById('addBookDialog');
const dialogInputBoxTitle = document.getElementById('dialogInputBoxTitle');
const dialogInputBoxAuthor = document.getElementById('dialogInputBoxAuthor');
const dialogInputBoxPages = document.getElementById('dialogInputBoxPages');
const dialogForm = document.getElementById('dialogForm');

function openDialog() {
    addBookDialog.showModal();
}

function closeDialog() {
    dialogForm.reset();
    addBookDialog.close();
}

function submitDialog(event) {
    event.preventDefault();
    addBookToLibrary(
        dialogInputBoxTitle.value,
        dialogInputBoxAuthor.value,
        dialogInputBoxPages.value,
        getFinishedStatus(),
    );
    closeDialog();
    displayBooks();
}

function getFinishedStatus() {
    const dialogInputRadioIsFinished = document.querySelector('input[name="yesOrNo"]:checked');
    if (dialogInputRadioIsFinished.value == 'yes') {
        return true
    } else {
        return false
    }
}

document.getElementById('addBookBtn').addEventListener('click', openDialog);
document.getElementById('closeDialog').addEventListener('click', closeDialog);
document.getElementById('submitDialogBtn').addEventListener('click', submitDialog);

addBookToLibrary('God dobbelt niet op de beurs', 'Jan Longeval', 223, true);
addBookToLibrary('The Power of Habit', 'Charles Duhigg', 443, false);

displayBooks();
