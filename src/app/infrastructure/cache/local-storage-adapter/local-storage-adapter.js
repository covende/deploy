import JWT from 'expo-jwt';

const jwt_key = process.env.COVENDE_KEY;
// console.log('jwt_key', jwt_key);

// const jwtEncode = (value) => JWT.encode(JSON.stringify(value), jwt_key);
// const jwtDecode = (value) => JWT.decode(value, jwt_key);

export const LocalStorageAdapter = {
  // set: (key, value) => {
  //   if (value) {
  //     localStorage.setItem(jwtEncode(key), jwtEncode(value));
  //   } else {
  //     localStorage.removeItem(key);
  //   }
  // },
  // get: (key) => {
  //   let objValue = localStorage.getItem(jwtEncode(key));
  //   objValue = objValue && jwtDecode(objValue);
  //   return JSON.parse(objValue);
  // },

  set(key, value) {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  },
  get(key) {
    return JSON.parse(localStorage.getItem(key));
  }
};
