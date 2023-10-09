import { imageURLs } from "./data";

export function getRandomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomImageURL() {
  const index = getRandomInteger(0, imageURLs.length - 1);
  return imageURLs[index];
}

export function partitionArrayByChunk(arr: any[], chunk: number) {
  const result = [];
  for (let i = 0; i < arr.length; i += chunk) {
    result.push(arr.slice(i, i + chunk));
  }
  return result;
}

export function sum(a: number, b: number) {
  return a + b;
}
