//external import
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//internal import
const { existingUser } = require("../middleware/existingUser");

//registrationUser
exports.registratonUser = async (req, res) => {
  const hasUser = await existingUser(req.body.userName);

  if (hasUser && hasUser.length > 0) {
    res.status(400).json({ status: "fail", data: "user already registered" });
  } else {
    try {
      const salt = await bcrypt.genSaltSync(10);
      const hashPassword = await bcrypt.hashSync(req.body.password, salt);

      const newUser = new User({
        ...req.body,
        password: hashPassword,
      });
      await newUser.save();
      res
        .status(201)
        .json({ status: "success", data: "user create successful" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "fail", data: error });
    }
  }
};

//loginUser
exports.loginUser = async (req, res) => {
  const hasUser = await existingUser(req.body.userName);

  if (hasUser && hasUser.length > 0) {
    try {
      const comparePassword = await bcrypt.compare(
        req.body.password,
        hasUser[0].password,
      );

      if (comparePassword) {
        const plyload = {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: {
            id: hasUser[0]._id,
            userName: hasUser[0].userName,
          },
        };

        const generetToken = await jwt.sign(
          plyload,
          process.env.JWT_SECRET_KEY,
        );
        res.json({ status: "success", token: generetToken });
      } else {
        res
          .status(404)
          .json({ status: "fail", data: "unauthorized credential" });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "fail", data: "there was a server side error" });
    }
  } else {
    res.status(401).json({ status: "fail", data: "user not found" });
  }
};

//selectUser
exports.selectUser = async (req, res) => {
  const hasUser = await existingUser(req.userName);

  if (hasUser && hasUser.length > 0) {
    if (req.userName === req.params.userName) {
      res.json({ status: "success", data: hasUser });
    } else {
      res.status(401).json({ status: "fail", data: "unauthorized credential" });
    }
  } else {
    res.status(401).json({ status: "fail", data: "user not found" });
  }
};

//updateUser
exports.updateUser = async (req, res) => {
  const { name, email, password, photo, phone } = req.body;
  const updatedUser = {
    name,
    email,
    password,
    photo,
    phone,
  };

  const hasUser = await existingUser(req.userName);

  if (hasUser && hasUser.length > 0) {
    if (req.userName === req.params.userName) {
      try {
        await User.updateOne({ userName: req.userName }, updatedUser, {
          new: true,
        });
        res.json({ status: "success", data: "user update successfull" });
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ status: "fail", data: "there was a server side error" });
      }
    } else {
      res.status(401).json({ status: "fail", data: "unauthorized credential" });
    }
  } else {
    res.status(404).json({ status: "fail", data: "user not found" });
  }
};

//deleteUser
exports.deleteUser = async (req, res) => {
  const hasUser = await existingUser(req.userName);

  console.log(hasUser);

  if (hasUser && hasUser.length > 0) {
    if (req.userName === req.params.userName) {
      try {
        await User.deleteOne({ userName: req.userName });
        res
          .status(200)
          .json({ status: "success", data: "user delete success" });
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ status: "fail", data: "there was a server side error" });
      }

      res.json({ status: "success", data: hasUser });
    } else {
      res.status(401).json({ status: "fail", data: "unauthorized credential" });
    }
  } else {
    res.status(401).json({ status: "fail", data: "user not found" });
  }
};
