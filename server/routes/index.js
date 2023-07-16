const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const { generate, save } = require("../services/tokenService");

router.post("/signUp", [
  check("email", "Некорректный email").isEmail(),
  check("nickname", "Никнейм должен состоять минимум из 6 латинских символов")
    .matches(/^[a-zA-Z]+$/)
    .isLength({ min: 5 }),
  check("password", "Пароль должен содержать минимум 8 символов").isLength({
    min: 8,
  }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Проверьте правильность введеных данных",
          errors: errors.array(),
        });
      }
      const { email, nickname, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(201).json({
          message: "Данный email уже зарегистрирован",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = await User.create({
        email: email,
        nickname: nickname,
        password: hashedPassword,
      });

      const tokens = generate({ _id: newUser._id });

      await save(newUser._id, tokens.refreshToken);

      res.status(201).send({ ...tokens, userId: newUser._id });
    } catch {
      res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
    }
  },
]);

router.get("/user", auth, async (req, res) => {
  try {
    const data = await User.findOne({ _id: req.user._id }).select(
      "-password -__v"
    );
    res.send(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});

module.exports = router;
