//external lib import
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//internal lib import
const UserModel = require("../model/UserModel");

//registrationUser
exports.registrationUser = (req, res) => {
  const { userName, password } = req.body;

  UserModel.aggregate(
    [
      {
        $match: { userName: userName },
      },
    ],
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "there was a server side error" });
      } else {
        if (data && data.length > 0) {
          console.log(data);

          res.status(409).json({ message: "user already registered" });
        } else {
          bcrypt.hash(password, 10, (err, hashPassword) => {
            UserModel.create(
              { ...req.body, password: hashPassword },
              (err, data) => {
                if (err) {
                  console.log(err);
                  res.status(500).json({
                    message: "there was a server side error",
                  });
                } else {
                  res.status(201).json({
                    message: "user  registered successfull",
                  });
                }
              },
            );
          });
        }
      }
    },
  );
};

//loginUser
exports.loginUser = (req, res) => {
  const { userName, password } = req.body;

  UserModel.aggregate(
    [
      {
        $match: { userName: userName },
      },
    ],
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "there was a server side error" });
      } else {
        if (data && data.length > 0) {
          bcrypt.compare(password, data[0].password, (err, result) => {
            if (result) {
              const payload = {
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
                userName: data[0].userName,
                id: data[0]._id,
              };
              const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

              delete data[0].password;

              res.json({ accessToken: token, user: data[0] });
            } else {
              res.status(401).json({ message: "unauthorized credential" });
            }
          });
        } else {
          res.status(404).json({ message: "user not found" });
        }
      }
    },
  );
};

//selectUser
exports.selectUser = (req, res) => {
  const userName = req.userName;

  UserModel.aggregate(
    [
      {
        $match: { userName: userName },
      },
    ],
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ data: "there was a server side error" });
      } else {
        if (data && data.length > 0) {
          delete data[0].password;
          res.json(data);
        } else {
          res.status(404).json({ message: "user not found" });
        }
      }
    },
  );
};

//selectUserByUserName
exports.selectUserByUserName = (req, res) => {
  const { userName } = req.params;
  UserModel.aggregate(
    [
      {
        $match: { userName: userName },
      },
    ],
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ data: "there was a server side error" });
      } else {
        if (data && data.length > 0) {
          delete data[0].password;
          res.json(data);
        } else {
          res.status(404).json({ message: "user not found" });
        }
      }
    },
  );
};

//updateUser
exports.updateUser = (req, res) => {
  const { name, phone, photo, email } = req.body;
  const { userName } = req.params;

  if (userName === req.userName) {
    UserModel.aggregate(
      [
        {
          $match: { userName: userName },
        },
      ],
      (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "there was a server side error" });
        } else {
          UserModel.updateOne(
            { userName: userName },
            { name, phone, photo, email },
            { new: true },
            (err, data) => {
              if (err) {
                console.log(err);
                res.status(500).json({
                  message: "there was a server side error",
                });
              } else {
                res.json({ message: "user update successful" });
              }
            },
          );
        }
      },
    );
  } else {
    res.status(401).json({ message: "unauthorized credential" });
  }
};

//deleteUser
exports.deleteUser = (req, res) => {
  const { userName } = req.params;

  if (userName === req.userName) {
    UserModel.deleteOne({ userName: req.userName }, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          message: "there was a server side error",
        });
      } else {
        res.json({
          message: "user delete successfull",
        });
      }
    });
  } else {
    res.status(401).json({ message: "unauthorized credential" });
  }
};
