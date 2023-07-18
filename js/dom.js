export let moviesList = null;
export let inputSearch = null;
export let triggerMode = false;

const createElement = ({
  type,
  attrs = {},
  container = null,
  event = null,
  handler = null,
  position = "append",
}) => {
  const el = document.createElement(type);
  Object.keys(attrs).forEach((key) => {
    if (key === "innerHTML") el.innerHTML = attrs[key];
    else el.setAttribute(key, attrs[key]);
  });

  if (container && position === "append") container.append(el);
  if (container && position === "prepend") container.prepend(el);
  if (event && handler && typeof handler === "function")
    el.addEventListener(event, handler);
  return el;
};
//createStyle
export const createStyle = () => {
  createElement({
    type: "style",
    attrs: {
      innerHTML: `
      * {
      box-sizing: border-box;
    }
    
    body {
      margin: 0;
      font-family: Arial, Helvetica, sans-serif;
    }
    
    body::before {
      content: "";
      min-height: 100vh;
      width: 100%;
      background-color: #00295f;
      background-image: url(../img/backgroung.png);
      background-repeat: no-repeat;
      background-size: cover;
      position: fixed;
      z-index: -1;
    }
    
    h1 {
      text-align: center;
      font-size: 3em;
    }
    
    .container {
      width: min(100% - 40px, 1280px);
      margin-inline: auto;
      padding: 50px 50px;
      background-color: #000000bb;
      color: #ffffff;
      min-height: 100vh;
    }
    
    .movies {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
    }
    
    .movie {
    display: flex;
    align-items: center;
    justify-content: center;
    }
    
    .movie__image {
      width: 100%;
      object-fit: cover;
    }
    
    .search {
      margin-bottom: 30px;
    }
    
    .search__label-input {
      display: block;
      margin-bottom: 10px;
    }
    
    .search__input {
      display: block;
      max-width: 400px;
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 5px;
      border: 1px solid #808080;
      background-color: #333333;
    }
    
    .search__label-checkbox {
      font-size: 0.8rem;
    }
    
    .search__group--checkbox {
      display: flex;
      gap: 5px;
      align-items: center;
    } `,
    },
    container: document.head,
  });
};
//createMarkup
export const createMarkup = () => {
  //container
  const container = createElement({
    type: "div",
    attrs: { class: "container" },
    container: document.body,
    position: "prepend",
  });
  //.h1
  createElement({
    type: "h1",
    attrs: { innerHTML: "MOVIE SEARCH" },
    container,
  });
  //searchBox
  const searchBox = createElement({
    type: "div",
    attrs: { class: "search" },
    container,
  });
  //inputBox
  const inputBox = createElement({
    type: "div",
    attrs: { class: "search__group serch__group--input" },
    container: searchBox,
  });
  //checkBox
  const checkBox = createElement({
    type: "div",
    attrs: { class: "search__group serch__group--checkbox" },
    container: searchBox,
  });
  //search__label-input
  createElement({
    type: "label",
    attrs: {
      for: "search",
      class: "search__label-input",
      innerHTML: "Пошук фільмів",
    },
    container: inputBox,
  });
  //search__checkbox
  createElement({
    type: "input",
    attrs: {
      id: "checkbox",
      class: "search__checkbox",
      type: "checkbox",
      placeholder: "Почніть вводити текст...",
    },
    container: checkBox,
    event: "click",
    handler: () => (triggerMode = !triggerMode),
  });
  //inputSearch
  inputSearch = createElement({
    type: "input",
    attrs: {
      id: "search",
      class: "search__input",
      type: "search",
      placeholder: "Почніть вводити текст...",
    },
    container: inputBox,
  });
  //search__label-checkbox
  createElement({
    type: "label",
    attrs: {
      for: "checkbox",
      class: "search__label-checkbox",
      innerHTML: "Додавати фільми до вже існуючого переліку",
    },
    container: checkBox,
  });
  //moviesList
  moviesList = createElement({
    type: "div",
    attrs: { class: "movies" },
    container,
  });
};
//addMovieToList
export const addMovieToList = (movie) => {
  //movie
  const item = createElement({
    type: "div",
    attrs: { class: "movie" },
    container: moviesList,
    position: "prepend",
  });
  //movie__image
  createElement({
    type: "img",
    attrs: {
      class: "movie__image",
      src: /^(http|https):\/\//i.test(movie.Poster)
        ? movie.Poster
        : "img/no-image-available.png",
      alt: `${movie.Title} ${movie.Year}`,
      title: `${movie.Title} ${movie.Year}`,
    },
    container: item,
  });
};

export const clearMovieMarkup = (el) => el && (el.innerHTML = "");
