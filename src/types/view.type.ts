import { Controller } from "./contoller.type";
import { State } from "./model.type";

export type Component = (state: State, events: Controller) => HTMLElement;
