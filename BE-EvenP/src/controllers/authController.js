const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const AsyncHandle = require("express-async-handler");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL_SMPT,
    pass: process.env.PASSWORD_EMAIL,
  },
});

const handleSendMail = async (code, email) => {
  try {
    const info = await transporter.sendMail({
      from: `Admin Phuc Nguyen👻" <${process.env.EMAIL_SMPT}>`, // sender address
      to: email, // list of receivers
      subject: "Verification email code", // Subject line
      text: "Your code to verification email", // plain text body
      html: `<h3>Your Code : ${code}</h3>`, // html body
    });
    return { email: info.messageId, code };
  } catch (error) {
    console.log(error, "cannot send email");
  }
};

const getJsonWebToken = async (email, id) => {
  const payload = { email, id };
  const token = jwt.sign(payload, process.env.SECREC_KEY_JWT, {
    expiresIn: "7d",
  });

  return token;
};
const register = AsyncHandle(async (req, res) => {
  const { username, email, password } = req.body;
  const existUser = await UserModel.findOne({ email });

  if (existUser) {
    return res.status(401).send({ mess: "User has Already exist !!" });
  }
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  try {
    const newUser = new UserModel({
      email,
      username,
      password: hashPassword,
    });

    await newUser.save();
    res.status(201).json({
      mess: "user register successfully",
      newUser: {
        email: newUser.email,
        id: newUser.id,
        accessToken: await getJsonWebToken(email, newUser.id),
      },
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).send(error);
  }
});
const login = async (req, res) => {
  const { email, password } = req.body;
  const checkUser = await UserModel.findOne({ email });
  if (checkUser) {
    try {
      const isPassword = bcrypt.compareSync(password, checkUser.password);
      console.log(isPassword, "asdasd");

      if (isPassword) {
        res.status(200).send({
          userLogin: {
            id: checkUser.id,
            email: checkUser.email,
            accessToken: await getJsonWebToken(email),
          },
        });
      } else {
        res.status(404).send({ mess: "Wrong email or password" });
      }
    } catch (error) {
      console.log(error, "err");
      res.status(500).send(error);
    }
  } else {
    res.status(403).send({ mess: "Wrong email or password" });
  }
};
const verification = AsyncHandle(async (req, res) => {
  const { email } = req.body;
  const verificationCode = Math.floor(1000 + Math.random() * 9000);

  try {
    const sendMail = await handleSendMail(verificationCode, email);
    res.status(200).send({ sendMail });
  } catch (error) {
    res.status(401);
    throw new Error("Cannot send email verification!!");
  }
});
module.exports = {
  register,
  login,
  verification,
};
