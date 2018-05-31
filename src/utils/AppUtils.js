
export function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

export function stringifyDate(timestamp) {
  return new Date(timestamp * 1000).toDateString().slice(0, 10).replace(/-/g, '')
}

export function firstLetter(string) {
  return string[0].toUpperCase()
}

export function uuid() {
  let uuid = "", i, random;
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;

    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += "-"
    }
    uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
  }
  return uuid;
}