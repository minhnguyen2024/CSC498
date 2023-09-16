import { imageURLs } from "./data";

export function getRandomInteger(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomImageURL(){
    const index = getRandomInteger(0, imageURLs.length - 1)
    return imageURLs[index]
}