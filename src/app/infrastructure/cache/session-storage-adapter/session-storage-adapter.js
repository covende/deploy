export const SessionStorageAdapter = {
  set: (key, value) => {
    if (value) {
      sessionStorage.setItem(key, JSON.stringify(value));
    } else {
      sessionStorage.removeItem(key);
    }
  },
  get: (key) => JSON.parse(sessionStorage.getItem(key))
};
