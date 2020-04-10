import { writable } from "svelte/store";
import { media } from "./watchMedia.js";

const dark = () => {
  const { subscribe, set, update } = writable(false);

  const html = document.documentElement.classList;

  const turnOff = () => {
    set(false);
    html.remove("mode-dark");
  };

  const turnOn = () => {
    set(true);
    html.add("mode-dark");
  };

  return {
    subscribe,
    set,
    update,
    turnOff: turnOff,
    turnOn: turnOn,
  };
};

export const darkMode = dark();
