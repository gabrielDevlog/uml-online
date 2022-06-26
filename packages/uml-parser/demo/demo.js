import { parse } from "../src";

const input = document.getElementById("input");
const result = document.getElementById("result");
const error = document.getElementById("error");

function parseInput(str) {
  return parse(str);
}

function onInputChange(event) {
  try {
    const parsed = parseInput(event.target.value);
    result.innerHTML = JSON.stringify(parsed, null, 2);
    error.innerHTML = "";
  } catch (e) {
    result.innerHTML = "";
    error.innerHTML = e.message;
  }
}

input.addEventListener("input", onInputChange);
