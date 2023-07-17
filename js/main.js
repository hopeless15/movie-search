let moviesList = null;

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
  return el;
};

const getData = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => data.Search);

const createStyle = () => {
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

.container {
  width: min(100% - 40px, 1280px);
  margin-inline: auto;
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
  border: 1px solid gray;
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

const createMarkup = () => {
  const container = createElement({
    type: "div",
    attrs: { class: "container" },
    container: document.body,
    position: "prepend",
  });

  createElement({
    type: "h1",
    attrs: { innerHTML: "Застосунок для пошуку фільмів" },
    container,
  });

  const searchBox = createElement({
    type: "div",
    attrs: { class: "search" },
    container,
  });

  const inputBox = createElement({
    type: "div",
    attrs: { class: "search__group serch__group--input" },
    container: searchBox,
  });

  const checkBox = createElement({
    type: "div",
    attrs: { class: "search__group serch__group--checkbox" },
    container: searchBox,
  });

  createElement({
    type: "label",
    attrs: {
      for: "search",
      class: "search__label-input",
      innerHTML: "Пошук фільмів",
    },
    container: inputBox,
  });

  createElement({
    type: "input",
    attrs: {
      id: "checkbox",
      class: "search__checkbox",
      type: "checkbox",
      placeholder: "Почніть вводити текст...",
    },
    container: checkBox,
  });

  createElement({
    type: "input",
    attrs: {
      id: "search",
      class: "search__input",
      type: "search",
      placeholder: "Почніть вводити текст...",
    },
    container: inputBox,
  });

  createElement({
    type: "label",
    attrs: {
      for: "checkbox",
      class: "search__label-checkbox",
      innerHTML: "Додавати фільми до вже існуючого переліку",
    },
    container: checkBox,
  });

  moviesList = createElement({
    type: "div",
    attrs: { class: "movies" },
    container,
  });
};

const addMovieToList = (movie) => {
  const item = createElement({
    type: "div",
    attrs: { class: "movie" },
    container: moviesList,
  });
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

const search = "Iron";

getData(`http://www.omdbapi.com/?apikey=b27714dd&s=${search}`)
  .then((movies) => movies.forEach((movie) => addMovieToList(movie)))
  .catch((err) => console.log(err));

createStyle();
createMarkup();
