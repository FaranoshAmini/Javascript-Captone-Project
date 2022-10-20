import "../styles/style.css";
import * as model from "./model.js";
import view from "./view.js";
import likes from "./likes.js";
import search from "./search.js";
import popup from "./popupView.js";
import comment from "./comments.js";
import { COMMENT_API_URL } from "./config";

const controlRecipes = async () => {
  try {
    view.renderSpinner();

    await model.loadResult("pizza");

    view.render(model.state.search.results);
    popup.renderPopup(model.state.search.results);
  } catch (err) {
    view.renderError();
  }
};

const controlSearch = async function () {
  try {
    view.renderSpinner();

    const query = search.getQuery();

    if (!query) return;

    await model.loadResult(query);

    view.render(model.state.search.results);
    popup.renderPopup(model.state.search.results);
  } catch (error) {
    search.renderError();
  }
};

const init = () => {
  view.addHandlerRender(controlRecipes);
  search.addHandler(controlSearch);
};
init();
likes.renderLikes();
popup.renderCloseBtn();
popup.renderComment();

// const form = document.querySelector("body").closest(".comment_form");
// console.log(form);

// form.addEventListener("submit", (e) => {
//   comment.addComment(e);
//   form.reset();
// });

window.addEventListener("load", comment.refreshComment(COMMENT_API_URL));
