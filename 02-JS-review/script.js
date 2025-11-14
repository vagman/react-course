/* eslint-disable */
const data = [
  {
    id: 1,
    title: "The Lord of the Rings",
    publicationDate: "1954-07-29",
    author: "J. R. R. Tolkien",
    genres: [
      "fantasy",
      "high-fantasy",
      "adventure",
      "fiction",
      "novels",
      "literature",
    ],
    hasMovieAdaptation: true,
    pages: 1216,
    translations: {
      spanish: "El señor de los anillos",
      chinese: "魔戒",
      french: "Le Seigneur des anneaux",
    },
    reviews: {
      goodreads: {
        rating: 4.52,
        ratingsCount: 630994,
        reviewsCount: 13417,
      },
      librarything: {
        rating: 4.53,
        ratingsCount: 47166,
        reviewsCount: 452,
      },
    },
  },
  {
    id: 2,
    title: "The Cyberiad",
    publicationDate: "1965-01-01",
    author: "Stanislaw Lem",
    genres: [
      "science fiction",
      "humor",
      "speculative fiction",
      "short stories",
      "fantasy",
    ],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
      goodreads: {
        rating: 4.16,
        ratingsCount: 11663,
        reviewsCount: 812,
      },
      librarything: {
        rating: 4.13,
        ratingsCount: 2434,
        reviewsCount: 0,
      },
    },
  },
  {
    id: 3,
    title: "Dune",
    publicationDate: "1965-01-01",
    author: "Frank Herbert",
    genres: ["science fiction", "novel", "adventure"],
    hasMovieAdaptation: true,
    pages: 658,
    translations: {
      spanish: "",
    },
    reviews: {
      goodreads: {
        rating: 4.25,
        ratingsCount: 1142893,
        reviewsCount: 49701,
      },
    },
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: "1997-06-26",
    author: "J. K. Rowling",
    genres: ["fantasy", "adventure"],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
      spanish: "Harry Potter y la piedra filosofal",
      korean: "해리 포터와 마법사의 돌",
      bengali: "হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন",
      portuguese: "Harry Potter e a Pedra Filosofal",
    },
    reviews: {
      goodreads: {
        rating: 4.47,
        ratingsCount: 8910059,
        reviewsCount: 140625,
      },
      librarything: {
        rating: 4.29,
        ratingsCount: 120941,
        reviewsCount: 1960,
      },
    },
  },
  {
    id: 5,
    title: "A Game of Thrones",
    publicationDate: "1996-08-01",
    author: "George R. R. Martin",
    genres: ["fantasy", "high-fantasy", "novel", "fantasy fiction"],
    hasMovieAdaptation: true,
    pages: 835,
    translations: {
      korean: "왕좌의 게임",
      polish: "Gra o tron",
      portuguese: "A Guerra dos Tronos",
      spanish: "Juego de tronos",
    },
    reviews: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 2295233,
        reviewsCount: 59058,
      },
      librarything: {
        rating: 4.36,
        ratingsCount: 38358,
        reviewsCount: 1095,
      },
    },
  },
];

function getBooks() {
  return data;
}

function getBook(id) {
  return data.find((d) => d.id === id);
}

/*


// Destructuring example
const book = getBook(3);
book;

const {title, author, pages, publicationDate, genres, hasMovieAdaptation} = book;

console.log(title, author, genres);

const [primaryGenre, secondaryGenre, ...otherGenres] = genres;
console.log(primaryGenre, secondaryGenre, otherGenres);

// Spread operator example
const newGenres = [...genres, "epic fantasy"]; // Or ["epic fantasy", ...genres]
newGenres;

const updatedBook = { 
  ...book, 
  // Adding a new property
  moviePublicationDate: '2001-12-19', 

  // Updating an existing property
  pages: 1210 
};
updatedBook;

// Arrow Functions
// Write a function that takes the whole date property of a book and only returns the year that the book was released.
// Date format: '1965-01-01'
// function getPubYear(pubDate) {
//   return pubDate.split("-")[0];
// }

const getPubYear = (pubDate) => pubDate.split("-")[0];
console.log(getPubYear(publicationDate));

// Template literals example
const summary = `${title}, is a ${pages}-page long book, was written by ${author} and published in ${getPubYear(publicationDate)}. The book has ${book.hasMovieAdaptation ? '' : 'not'} been adapted as a movie.`;
summary;

// Ternaries instead of if/else statements
const pagesRange = pages > 1000 ? 'over a thousand pages' : 'less that 1000 pages';
pagesRange;
console.log(`The book has ${pagesRange}.`);

// Short-circuiting with && and ||
console.log(true && "Some String");
console.log(false && "Some String");

console.log(hasMovieAdaptation || "This book has a movie.");

// Falsy values: 0, '', null, undefined
console.log('jonas' && "Some string");
console.log(0 && 'Some string');

console.log(true || 'Some string');
console.log(false || 'Some string');

console.log(book.translations.spanish);

const spanishTranslation = book.translations.spanish || 'NOT TRANSLATED';
console.log(spanishTranslation);

// console.log(book.reviews.librarything.reviewsCount);
// const countWrong = book.reviews.librarything.reviewsCount || "NO DATA";
// console.log(countWrong); // 'NO DATA' instead of 0 which is data!

// Nullish coalescing operator (ES2020)
// const count = book.reviews.librarything.reviewsCount ?? "NO DATA";
// console.log(count); // 0

console.log(getTotalReviewCount(book));
*/


/* 
// Optional chaining (ES2020)
function getTotalReviewCount(book) {
  const goodRead = book.reviews?.goodreads?.reviewsCount;
  const libraryThing = book.reviews.librarything?.reviewsCount ?? 0;

  return goodRead + libraryThing;
}

// Map Methods: map(), filter(), reduce()
const arr = [ 1, 2, 3, 4, 5 ].map((element) => element * 2);
console.log(arr);

// Array of strings (titles only)
const books = getBooks();
const bookTitles = books.map((book) => book.title)
console.log(bookTitles);

// Array of objects (title + author) - Data "cleaning"
const essentialBookData = books.map((book) => ({
  title: book.title,
  author: book.author,
  reviewsCount: getTotalReviewCount(book),
}));

console.log(typeof(essentialBookData));
console.log(Array.isArray(essentialBookData)); // Arrays are objects!
console.log(essentialBookData);

// Array.filter() method
const longBooksWithMovie = books
  .filter((book) => book.pages > 500)
  .filter((book) => book.hasMovieAdaptation);

console.log(longBooksWithMovie);

const adventureBooks = books
  .filter((book) => book.genres.includes('adventure'))
  .map((book) =>  book.title);

console.log(adventureBooks);

// Array.reduce() method
const pagesOfAllBook = books.reduce((sum, book) => sum + book.pages, 0);
console.log(pagesOfAllBook);

// Array.sort() method
const arr1 = [3, 7, 1, 9, 6];

// a -b: ascending order
// b - a: descending order
const sorted = arr1.sort((a, b) => a - b);
console.log('Sorted array: ', sorted);
console.log('Original array: ', arr1);

// BE CAREFUL: Array.sort() mutates the original array!
// We can avoid this by creating a copy of the original array first
const sorted2 = arr1.slice().sort((a, b) => a - b);
console.log('Sorted array: ', sorted2);
console.log('Original array: ', arr1);

const sortByPages = books.slice().sort((book, book1) => book1.pages - book.pages);
console.log(sortByPages);

// Working with Immutable Arrays
// 1) Add a book object to Array
const newBook = {
  id: 6,
  title: "Harry Potter and the Chamber of Secrets",
  author: "J. K. Rowling",
};

const booksAfterAdd = [...books, newBook];
console.log(booksAfterAdd);

// 2) Remove a book object from Array
const booksAfterDelete = books.filter(book => book.id !== 3);
console.log(booksAfterDelete);

// 3) Update a book object in Array
const booksAfterUpdate = books.map((book) => book.id === 1 ? {...book, pages: 1210} : book);
console.log(booksAfterUpdate);
*/


// Asynchronous JavaScript Promises
fetch('https://jsonplaceholder.typicode.com/todos/')
  .then(response => response.json())
  .then(data => console.log(data));

console.log('vagman');

// Asynchronous JavaScript Async/Await
async function getTodos() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/');
  const data = await response.json();
  console.log(data);
  
  return data;
};

const todos = getTodos();
console.log(todos); 

