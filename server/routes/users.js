const router = require('express').Router();
const crypto = require("crypto");
const User = require('../models/users');
const { hashPassword, checkIfEmpty, verifyHash, signJwt } = require('../config/functions');

router.post('/signup', async (req, res) => {
    const body = req.body;
    //verifying if request body data is valid
    const { isValid } = checkIfEmpty(
        body.firstName,
        body.password,
        body.email,
    );
    //if request body data is valid
    try {
        if (isValid) {
            const userExists = await User.findOne({
                email: body.email,
            });
            if (!userExists) {
                const hashedPassword = await hashPassword(body.password);
                if (hashedPassword) {
                    req.body.password = hashedPassword;
                    //generating email verification hex
                    const email = req.body.email;
                    const hash = crypto
                        .createHmac("sha256", "verificationHash")
                        .update(email)
                        .digest("hex");

                    req.body.verificationhex = hash;
                    const userData = new User(req.body);
                    const savedUser = await userData.save();
                    savedUser["password"] = undefined;
                    res.send({
                        savedUser,
                        code: 200,
                        msg: "User registered successfully.",
                    });
                } else {
                    res.send({
                        code: 400,
                        msg: "Error hashing password",
                    });
                }
            } else {
                res.send({
                    code: 400,
                    msg: "Email already Exists",
                });
            }
        } else {
            res.send({
                code: 400,
                msg: "Form data not valid",
            });
        }
    } catch (err) {
        console.log(err);
        res.send({
            code: 500,
            msg: "Internal Server Error",
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { isValid } = checkIfEmpty(req.body);
        if (isValid) {
            const { email, password } = req.body;
            //finding user with email
            const isUserExists = await User.findOne({
                email,
            });
            if (isUserExists) {
                const isPasswordValid = await verifyHash(
                    password,
                    isUserExists.password
                );
                if (isPasswordValid) {
                    //valid password
                    let name = `${isUserExists.name}`;
                    const token = signJwt(isUserExists._id, name);
                    res.send({
                        code: 200,
                        token,
                    });
                } else {
                    res.send({
                        code: 404,
                        msg: "Login Credential invalid",
                    });
                }
            } else {
                res.send({
                    code: 404,
                    msg: "User doesn't Exits",
                });
            }
        } else {
            res.send({
                code: 400,
                msg: "Invalid request body",
            });
        }
    } catch (e) {
        console.log('error:', e.message);
        res.send({
            code: 500,
            msg: "Internal Server Error",
        });
    }
});

router.get("/me", (req, res) => {
    const { id: _id } = userInfo; //useinfo is global variable;contains the current user info
    modalAdmin
      .fetch({ _id })
      .then((userList) => {
        console.log("sd", _id, userList);
        return res.json({ body: userList.result });
      })
      .catch((error) => {
        return res.status(403).json({ body: error || "Something went wrong" });
      });
  });
  
  router.patch("/updateMe", (req, res) => {
    try {
      upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          return res.status(500).send(err);
        } else if (err) {
          return res.status(500).send(err);
        }
        const { id: _id } = userInfo; //useinfo is global variable;contains the current user info
        const { body, file } = req;
        if (file) {
          const { destination, filename } = file;
          var profileImagePath = `http://localhost:8080/${destination}/${filename}`;
        }
        const { fname, lname, email } = body;
        modalAdmin
          .fetch({ email })
          .then(({ result }) => {
            if (result) console.log("result", result, email);
  
            modalAdmin
              .update({ _id }, { fname, lname, email, profileImagePath })
              .then(({ status, message }) => {
                return res.json({ message, status: "success" });
              })
              .catch(({ status, message, body }) => {
                return res.json({
                  status: "error",
                  message: `${message}, ${body}`,
                });
              });
          })
          .catch((e) => {
            console.log("catc", e);
          });
      });
    } catch (error) {
      console.log(error);
      return res.json({
        status: "error",
        message: error || "Something went wrong",
      });
    }
  });
module.exports = router;