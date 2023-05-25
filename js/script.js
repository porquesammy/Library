"use strict";

const closeModalIcon = document.querySelector(".material-symbols-outlined");
const modal = document.querySelector(".modal");
const addBookBtn = document.querySelector(".addBtn");
const bookTitleInput = document.querySelector('.modal input[name="title"]');
const authorInput = document.querySelector('.modal input[name="author"]');
const pagesInput = document.querySelector('.modal input[name="pages"]');
const readCheckbox = document.querySelector('.modal input[name="read"]');
const submitBtn = document.querySelector(".btn");
const main = document.querySelector("main");

modal.style.display = "none";

document.querySelector('.card .remove span').addEventListener('click', ()=>{
    main.innerHTML = '';  
  })

addBookBtn.addEventListener(
  "click",
  () => {
    modal.style.display = "";
  },
  false
);

closeModalIcon.addEventListener(
  "click",
  () => {
    modal.style.display = "none";
  },
  false
);

let myLibrary = [];

function Book(title, author, pages, read) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.read = read);
}

function addBookToLibrary(title, author, pages, read, arrIndex) {
  let figure = document.createElement("figure");
  figure.className = "card";

  figure.innerHTML = `
      <div class="remove book${arrIndex}"><span>Remove</span></div>
      <figcaption>
        <h3>${title}</h3>
        <p>Author: ${author}</p>
        <div class="pages">
          <p>Pages: ${pages}</p>
        </div>
        <div class="read">
          Read: ${read}
        </div>
      </figcaption>
    `;

  main.appendChild(figure);
  let card = document.querySelector(`.card .book${arrIndex} span`);
  card.addEventListener("click", () => {
    myLibrary.splice(arrIndex, 1);
    makeCard();
  });
}

function makeCard() {
  main.innerHTML = "";
  for (let index = 0; index < myLibrary.length; index++) {
    let title = myLibrary[index].title;
    let author = myLibrary[index].author;
    let pages = myLibrary[index].pages;
    let read = myLibrary[index].read;
    let arrIndex = index;
    addBookToLibrary(title, author, pages, read, arrIndex);
  }
}

submitBtn.addEventListener("click", function (event) {
  if (
    bookTitleInput.value !== "" &&
    authorInput.value !== "" &&
    pagesInput.value !== ""
  ) {
    event.preventDefault();

    let book = new Book(
      bookTitleInput.value,
      authorInput.value,
      pagesInput.value,
      readCheckbox.checked
    );

    myLibrary.push(book);

    main.innerHTML = "";
    makeCard();

    bookTitleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readCheckbox.checked = false;

    modal.style.display = "none";
  }
});
