const axios = require('axios');

module.exports.getDataFromBackend = (options) => {
  return new Promise((resolve, reject) => {
    axios(options)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.message);
      });
  });
};
