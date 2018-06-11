import HomeIcon from "@material-ui/icons/Home";
import React from "react";
import react from "../static/images/react.png";
import redux from "../static/images/redux.png";
import udacity from "../static/images/udacity.png";

export function capitalize (string) {
  return string[0].toUpperCase() + string.slice(1);
}

export function getDate (timestamp) {
  return new Date(timestamp * 1000).toDateString().slice(0, 10).replace(/-/g, "");
}

export function getTime (timestamp) {
  return new Date(timestamp * 1000).toLocaleTimeString();
}

export function randomPostMessages (number) {

  switch (number) {

    case 1:
      return "Give it a shot! Let's see what's on your mind!";

    case 2:
      return "How about a new post?";

    case 3:
      return "Don't be shy, we wanna hear you out! Just post it!";

    case 4:
      return "How about you post your favorite topic?";

    case 5:
      return "What do you want to talk about? Post about that!";

    default:
      return "Go ahead and post something!";
  }
}

export function randomCommentsMessages (number) {

  switch (number) {

    case 1:
      return "What do you think about that?";

    case 2:
      return "A comment would do just fine!";

    case 3:
      return "I think you should just comment about it";

    case 4:
      return "People wanna hear your voice!";

    case 5:
      return "Come on! Everyone's on the internet has something to say";

    default:
      return "Why don't you give your input?";
  }
}

export function uuid () {
  let uuid = "", i, random;
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;

    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += "-";
    }
    uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
  }
  return uuid;
}

export const categoryLogo = (category, height, logoStyle) => {
  const pixelHeight = `${height}px`;
  switch (category) {
    case "react":
      return <img src={react} height={pixelHeight} alt='Still React logo' style={logoStyle} />;

    case "redux":
      return <img src={redux} height={pixelHeight} alt='Still React logo' style={logoStyle} />;

    case "udacity":
      return <img src={udacity} height={pixelHeight} alt='Still Udacity logo' style={logoStyle} />;

    case "all":
    default:
      return <HomeIcon style={{ ...logoStyle, fontSize: height }} />;
  }
};