import { Controller } from "./contoller.type";
import { State } from "./model.type";

export type Component = (
  targetElement: HTMLElement,
  state: State,
  events: Controller
) => HTMLElement;
