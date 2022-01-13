const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split("")[1];

    let decodedData;

    if (token) {
      decodedData = jwt.verify(token, "dusunuyorumohaldevarim");

      req.userId = decodedData?.id;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
