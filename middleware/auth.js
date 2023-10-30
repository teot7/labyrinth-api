const User = require("../models/user");
const bcrypt = require("bcrypt");

const authentication = async (req, res, next) => {
  const authLogin = process.env.USERNAME;
  const authPassword = process.env.PASSWORD;

  // parse login and password from headers
  const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
  const [login, password] = Buffer.from(b64auth, "base64")
    .toString()
    .split(":");

  const passwordIsValid = bcrypt.compare(password, authPassword);

  // verify login and password are set and correct
  if (login && password && login === authLogin && passwordIsValid) {
    if (req.session.isAuth === undefined) {
      try {
        const user = new User();
        await user.save();

        req.session.isAuth = true;
        req.session.userId = user.id;
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }

    return next();
  }

  // access denied
  res.set("WWW-Authenticate", 'Basic realm="401"');
  return res.status(401).send("Authentication required");
};

module.exports = authentication;
