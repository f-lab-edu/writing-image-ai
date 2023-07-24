import { createIamgeByKarlo } from "../services/karlo.api";
import { Controller } from "../types/contoller.type";
import { State } from "../types/model.type";

export default (
  targetElement: HTMLElement,
  state: State,
  events: Controller
) => {
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
      `;
      const aHome = document.createElement("a");
      aHome.href = "/";
      aHome.innerText = "Plase Go Home";
      section.appendChild(aHome);
    } else {
      let div = document.createElement("div");

      state.images.forEach((image) => {
        let img = document.createElement("img");
        img.src = image.image;
        img.alt = image.id;
        img.id = image.id;
        div.appendChild(img);
      });

      const h3 = document.createElement("h3");
      h3.innerText = "Select Other Job";

      div.appendChild(h3);
      section.appendChild(div);
    }

    targetElement.appendChild(section);
  }

  return targetElement;
};
