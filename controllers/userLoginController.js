const jsonwebtoken = require("jsonwebtoken");
const { compareSync } = require("bcrypt");
const loginService = require("../services/userloginService");
const logger = require("../config/loggerApi.js");

const createUser = async (req, res) => {
  try {
    const orgUser = await loginService.createUser(req.body);
    res.status(200).send(orgUser);
  } catch (error) {
    console.log("Error in userLoginController - createUser:", error);
    logger.error("Error in userLoginController - createUser:", error);
  }
};

const login = async (req, res) => {
  try {
    let username = req.body.username;
    let password = req.body.password;

    console.log("username and pass..", `${username}....${password}`);
    console.log("username and pass..", username);
    console.log("username and pass..", password);
    let user = await loginService.verifyUser(username);

    console.log("user,......->", user);
    console.log("suer.password......->", user.password);
    //  const salt = genSaltSync(10);
    //let hashpassword = hashSync(password, salt);
    //console.log(hashpassword+" "+password+" "+JSON.stringify(user));
    if (!user) {
      return res.json({
        message: "Invalid username or password",
      });
    }

    const isValidPassword = compareSync(password, user.password);
    if (isValidPassword) {
      user.password = undefined;
      const jsontoken = jsonwebtoken.sign(
        { user: user },
        process.env.SECRET_KEY,
        { expiresIn: "60m" }
      );
      res.cookie("token", jsontoken, {
        httpOnly: true,
        secure: true,
        SameSite: "strict",
        expires: new Date(Number(new Date()) + 60 * 60 * 1000),
      }); //we add secure: true, when using https.

      res.json({ token: jsontoken, userDetail: user });
      //    return res.redirect('/mainpage') ;
    } else {
      return res.json({
        message: "Invalid username or password",
      });
    }
  } catch (e) {
    console.log("Error in userLoginController - login:", e);
    logger.error("Error in userLoginController - login:", e);
    // next(e);
    return res.status(500).json({ error: "hi, there was an error" });
  }
};


// const forgotPassword = async (req, res) => {
//   try {
//     const { username } = req.body;

//     let user = await loginService.forgotPassword(username);
//     if (user) {
//       return res.json(user);
//     } else {
//       return res.json({
//         message: "Invalid Username",
//       });
//     }
//   } catch (error) {
//     console.log("Error in userLoginController - forgotPassword:", error);
//     logger.error("Error in userLoginController - forgotPassword:", error);
//   }
// };

// const updatePassword = async (req, res) => {
//   try {
//     const { username, otp } = req.body;

//     let user = await loginService.updatePassword(username,otp);
//     if (user) {
//       return res.json(user);
//     } else {
//       return res.json({
//         message: "Invalid",
//       });
//     }
//   } catch (error) {
//     console.log("Error in userLoginController - updatePassword:", error);
//     logger.error("Error in userLoginController - updatePassword:", error);
//   }
// };

module.exports = {
  createUser,
  login,
  // refreshToken,
  // forgotPassword,
  // updatePassword
};
