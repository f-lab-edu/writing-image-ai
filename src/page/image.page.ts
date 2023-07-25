import { $app } from "../constants/element";
import { createIamgeByKarlo } from "../services/karlo.api";
import { Controller } from "../types/contoller.type";
import { State } from "../types/model.type";

export default (state: State, events: Controller) => {
  if (state.images) {
    let section = document.createElement("section");
    section.style.display = "flex";
    section.style.flexDirection = "column";
    section.style.alignItems = "center";
    section.style.paddingTop = "8px";

    if (state.images.length === 0) {
      section.innerHTML += `
        <div>
          <h2> Not Image </h2>
        </div>
        <a href="/"> Plase Go Home </a>
      `;
    } else {
      let div = document.createElement("div");
      state.images.forEach((image) => {
        div.innerHTML += `
          <img src="${image.image}" alt="${image.id}" id="${image.id}" />
        `;
      });

      div.innerHTML += `
        <h3>Select Other Job</h3>
      `;
      section.appendChild(div);
    }
    $app.appendChild(section);
  }

  return $app;
};
