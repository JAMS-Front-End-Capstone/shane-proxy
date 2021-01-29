module.exports.returnApiResponseToRequestor = (req, res, next, response) => {
  return new Promise((resolve, reject) => {
    let message = 'Response for ' + req.path + ' successfully sent!';
    res
      .status(200)
      .send(response);
    resolve(message);
  });
};

module.exports.returnErrorToRequestor = (req, res, next, error) => {
  return new Promise((resolve, reject) => {
    let message = `Error processing request: ${error}`;
    res
      .status(500)
      .send(message);
    resolve(message);
  });
};
