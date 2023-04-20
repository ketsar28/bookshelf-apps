const modal = document.querySelector("#modal");
const addButton = document.getElementById("add-book");
const closeModal = document.getElementById("close");
const UNCOMPLETED_BOOK_ID = "unread";
const COMPLETED_BOOK_ID = "read";
const BOOK_ITEMID = "itemId";

const addBook = () => {
  const uncompletedBook = document.getElementById(UNCOMPLETED_BOOK_ID);
  const inputTitle = document.getElementById("title").value;
  const inputAuthor = document.getElementById("author").value;
  const inputYear = document.getElementById("year").value;

  const book = makeBook(inputTitle, inputAuthor, inputYear, false);
  const bookObject = composeBookObject(inputTitle, inputAuthor, inputYear, false);

  book[BOOK_ITEMID] = bookObject.id;
  books.push(bookObject);

  uncompletedBook.append(book);
  updateDataToStorage();
};

const makeBook = (title, author, year, isCompleted) => {
  const image = document.createElement("img");
  if (isCompleted) {
    image.setAttribute("src", "assets/img/read1.jpg");
  } else {
    image.setAttribute("src", "assets/img/unread.jpg");
  }

  const imageBook = document.createElement("div");
  imageBook.classList.add("image-book");
  imageBook.append(image);

  const bookTitle = document.createElement("h3");
  bookTitle.innerText = title;
  bookTitle.style.color = "#eaeaea";

  const authorName = document.createElement("p");
  authorName.innerText = author;
  authorName.style.fontStyle = "italic";

  const bookYear = document.createElement("small");
  bookYear.innerText = `${year}`;
  bookYear.style.color = "#eaeaea";

  const detail = document.createElement("div");
  detail.classList.add("detail-book");
  detail.append(bookTitle, authorName, bookYear);

  const container = document.createElement("div");
  container.classList.add("my-container");
  container.append(imageBook, detail);

  if (isCompleted) {
    container.append(createUnreadButton(), createTrashButton());
  } else {
    container.append(createReadButton(), createTrashButton());
  }
  return container;
};
const createButton = (buttonTypeClass, eventListener) => {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);

  button.addEventListener("click", function (event) {
    eventListener(event);
  });
  return button;
};
const createReadButton = () => {
  return createButton("read-button", function (event) {
    addBookToCompleted(event.target.parentElement);
  });
};
const addBookToCompleted = (bookElement) => {
  const bookCompleted = document.getElementById(COMPLETED_BOOK_ID);

  const bookTitle = bookElement.querySelector(".detail-book > h3").innerText;
  const bookAuthor = bookElement.querySelector(".detail-book > p").innerText;
  const bookYear = bookElement.querySelector(".detail-book > small").innerText;

  const newBook = makeBook(bookTitle, bookAuthor, bookYear, true);
  const book = findBook(bookElement[BOOK_ITEMID]);
  book.isCompleted = true;
  newBook[BOOK_ITEMID] = book.id;

  bookCompleted.append(newBook);
  bookElement.remove();

  updateDataToStorage();
};

const removeBookFromCompleted = (bookElement) => {
  const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
  books.splice(bookPosition, 1);
  bookElement.remove();
  updateDataToStorage();
};

const createTrashButton = () => {
  return createButton("trash-book", function (event) {
    removeBookFromCompleted(event.target.parentElement);
  });
};

const undoBookFromCompleted = (bookElement) => {
  const listUncompleted = document.getElementById(UNCOMPLETED_BOOK_ID);

  const bookTitle = bookElement.querySelector(".detail-book > h3").innerText;
  const bookAuthor = bookElement.querySelector(".detail-book > p").innerText;
  const bookYear = bookElement.querySelector(".detail-book > small").innerText;

  const newBook = makeBook(bookTitle, bookAuthor, bookYear, false);
  const book = findBook(bookElement[BOOK_ITEMID]);
  book.isCompleted = false;
  newBook[BOOK_ITEMID] = book.id;

  listUncompleted.append(newBook);
  bookElement.remove();
  updateDataToStorage();
};

const createUnreadButton = () => {
  return createButton("unread-button", function (event) {
    undoBookFromCompleted(event.target.parentElement);
  });
};

const booksLength = () => {
  const jumlahBuku = document.getElementById("jumlahBuku");
  jumlahBuku.innerText = books.length;
};

addButton.addEventListener("click", () => {
  modal.classList.toggle("modal-open");
});
closeModal.addEventListener("click", () => {
  modal.style.transition = "1s";
  modal.classList.toggle("modal-open");
});

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("form");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    modal.classList.remove("modal-open");
    addBook();
  });

  if (checkStorage()) {
    loadDatafromStorage();
  }
});

document.addEventListener("ondatasaved", () => {
  console.log("Data berhasil disimpan.");
  booksLength();
});

document.addEventListener("ondataloaded", () => {
  refreshDataFromBooks();
  booksLength();
});

// === dark mode ===
const label = document.querySelector("#toggle");
const ball = document.querySelector(".ball");

if (localStorage.getItem("value") == null) {
  localStorage.setItem("value", "dark");
}

ball.addEventListener("click", () => {
  // buatkan classlist toggle pada body
  document.body.classList.toggle("light");
  ball.classList.toggle("active");
  if (document.body.classList.contains("light")) {
    // buat pengkondisian untuk icon dan local storage & ubah data pada local storage jika kondisi tertentu
    localStorage.setItem("value", "light");
  } else {
    localStorage.setItem("value", "dark");
  }
});

let WStr = localStorage.getItem("value");

if (WStr == "light") {
  // buat pengkondisian untuk icon dan body supaya sinkron dengan data pada local storage
  document.body.classList.remove("dark");
} else if (WStr == "dark") {
  document.body.classList.add("dark");
}

// === akhir dark mode ===

// === typing text ===
let typing = new Typed("#asyncExec", {
  strings: ["Selamat Datang di <span>Bookself Apps</span>"],
  loop: false,
  typeSpeed: 100,
  showCursor: true,
  // cursorChar: "|",

  smartBackspace: true, // Default value
});
let typing2 = new Typed("p#copyright", {
  strings: ["&copy;All Rights Reserved | Muhammad Ketsar A.A.W"],
  loop: false,
  typeSpeed: 100,
  showCursor: false,
});

// === swiper ===

var swiper = new Swiper(".mySwiper", {
  direction: "vertical",
  slidesPerView: 1,
  grabCursor: true,
  observer: true,
  observeParents: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  keyboard: {
    enabled: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// gsap
gsap.registerPlugin(TextPlugin);
gsap.from(".col-1 .user-information .user-img", { duration: 2.5, y: -300, opacity: 0, scale: 0.5 });

gsap.fromTo(".layers #asyncExec", { duration: 0, opacity: 0, scale: 0 }, { duration: 2, scale: 1, opacity: 1 });

gsap.fromTo(".col-1 .user-information .user-name", { duration: 0, opacity: 0 }, { duration: 8, opacity: 1 });

gsap.fromTo(".daftarSkill .skill:nth-child(1)", { duration: 0, opacity: 0, x: -50 }, { duration: 3, x: 0, opacity: 1 });
gsap.fromTo(".daftarSkill .skill:nth-child(2)", { duration: 0, opacity: 0, y: -50 }, { duration: 3.5, y: 0, opacity: 1 });
gsap.fromTo(".daftarSkill .skill:nth-child(3)", { duration: 0, opacity: 0, x: 50 }, { duration: 3, x: 0, opacity: 1 });

// scroll
ScrollReveal({
  delay: 0,
  distance: "60px",
  duration: 2000,
  easing: "cubic-bezier(0.5, 0, 0, 1)",
  origin: "bottom",
  reset: true,
});
ScrollReveal().reveal(".listJumlahBuku li p", { origin: "left", duration: 2500 });
ScrollReveal().reveal(".listJumlahBuku li h4", { origin: "right", duration: 2500 });
ScrollReveal().reveal(".my-icon");
ScrollReveal().reveal(".content-book .unread", { origin: "left" });
ScrollReveal().reveal(".content-book .read", { origin: "right" });
ScrollReveal().reveal(".icons li:nth-child(1)", { origin: "left", duration: 3000 });
ScrollReveal().reveal(".icons li:nth-child(2)", { origin: "top", duration: 3000 });
ScrollReveal().reveal(".icons li:nth-child(3)", { duration: 3000 });
ScrollReveal().reveal(".icons li:nth-child(4)", { origin: "right", duration: 3000 });
