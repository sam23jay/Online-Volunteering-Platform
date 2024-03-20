let isLoggedIn = false;

export function setLoggedIn(value) {
  isLoggedIn = value;
}

export function getLoggedIn() {
  return isLoggedIn;
}
