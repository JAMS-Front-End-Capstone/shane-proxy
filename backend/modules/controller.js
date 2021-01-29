const path = require('path');
const models = require(path.join(__dirname, 'models.js'));
const views = require(path.join(__dirname, 'views.js'));
const responseLoggingEnabled = process.env.ENABLE_RESPONSE_LOG || false;

const API_ENDPOINT_MAP = {
  'attract': 'http://localhost:3002',
  'ratings': 'http://localhost:3003',
  'reviews': 'http://localhost:3003',
  'q-and-a': 'http://localhost:3004',
  'related': 'http://localhost:3005'
};

const handleError = (req, res, next, error) => {
  views.returnErrorToRequestor(req, res, next, error)
    .then((response) => {
      if (responseLoggingEnabled) {
        console.log(response);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports.handleApiGetRequest = (req, res, next) => {
  let targetAPI = API_ENDPOINT_MAP[req.path.slice(5, 12)];

  if (targetAPI) {
    let axiosOptions = {
      method: 'get',
      url: targetAPI + req.path,
      data: req.body
    };
    models.getDataFromBackend(axiosOptions)
      .then((response) => {
        views.returnApiResponseToRequestor(req, res, next, response)
          .then((response) => {
            if (responseLoggingEnabled) {
              console.log(response);
            }
          });
      })
      .catch((error) => {
        handleError(req, res, next, error);
      });
  } else {
    let error = 'Error: endpoint not found in lookup table';
    handleError(req, res, next, error);
  }
};

module.exports.handleRedirection = (req, res, next) => {

};
