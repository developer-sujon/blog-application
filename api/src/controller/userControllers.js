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
        res
          .status(500)
          .json({ status: "fail", data: "there was a server side error" });
      } else {
        if (data && data.length > 0) {
          console.log(data);

          res
            .status(400)
            .json({ status: "fail", data: "user already registered" });
        } else {
          bcrypt.hash(password, 10, (err, hashPassword) => {
            UserModel.create(
              { ...req.body, password: hashPassword },
              (err, data) => {
                if (err) {
                  console.log(err);
                  res.status(500).json({
                    status: "fail",
                    data: "there was a server side error",
                  });
                } else {
                  res.status(201).json({
                    status: "success",
                    data: "user  registered successfull",
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
        res
          .status(500)
          .json({ status: "fail", data: "there was a server side error" });
      } else {
        if (data && data.length > 0) {
          bcrypt.compare(password, data[0].password, (err, result) => {
            if (result) {
              const payload = {
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
                data: {
                  userName: data[0].userName,
                  id: data[0]._id,
                },
              };

              const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

              res.json({ status: "success", token });
            } else {
              res.status(401).json({ token: "unauthorized credential" });
            }
          });
        } else {
          res.status(404).json({ status: "fail", data: "user not found" });
        }
      }
    },
  );
};

//selectUser
exports.selectUser = (req, res) => {
  const { userName, ...others } = req.body;

  if (req.userName) {
    UserModel.aggregate(
      [
        {
          $match: { userName: req.userName },
        },
      ],
      (err, data) => {
        if (err) {
          console.log(err);
          res
            .status(500)
            .json({ status: "fail", data: "there was a server side error" });
        } else {
          if (data && data.length > 0) {
            res.json(data);
          } else {
            res.status(404).json({ status: "fail", data: "user not found" });
          }
        }
      },
    );
  } else {
    res.status(401).json({ status: "fail", data: "unauthorized credential" });
  }
};

//updateUser
exports.updateUser = (req, res) => {
  const { userName, ...others } = req.body;

  if (req.userName) {
    UserModel.aggregate(
      [
        {
          $match: { userName: req.userName },
        },
      ],
      (err, data) => {
        if (err) {
          console.log(err);
          res
            .status(500)
            .json({ status: "fail", data: "there was a server side error" });
        } else {
          if (data && data.length > 0) {
            bcrypt.hash(req.body.password, 10, (err, hashPassword) => {
              if (err) {
                console.log(err);
                res.status(500).json({
                  status: "fail",
                  data: "there was a server side error",
                });
              } else {
                UserModel.updateOne(
                  { userName: req.userName },
                  { others, password: hashPassword },
                  { new: true },
                  (err, data) => {
                    if (err) {
                      console.log(err);
                      res.status(500).json({
                        status: "fail",
                        data: "there was a server side error",
                      });
                    } else {
                      res.json({ data });
                    }
                  },
                );
              }
            });
          } else {
            res.status(404).json({ status: "fail", data: "user not found" });
          }
        }
      },
    );
  } else {
    res.status(401).json({ status: "fail", data: "unauthorized credential" });
  }
};

//deleteUser
exports.deleteUser = (req, res) => {
  const { userName, ...others } = req.body;

  if (req.userName) {
    UserModel.aggregate(
      [
        {
          $match: { userName: req.userName },
        },
      ],
      (err, data) => {
        if (err) {
          console.log(err);
          res
            .status(500)
            .json({ status: "fail", data: "there was a server side error" });
        } else {
          if (data && data.length > 0) {
            UserModel.deleteOne({ userName: req.userName }, (err, data) => {
              if (err) {
                console.log(err);
                res.status(500).json({
                  status: "fail",
                  data: "there was a server side error",
                });
              } else {
                res.json({
                  status: "success",
                  data: "user delete successfull",
                });
              }
            });
          } else {
            res.status(404).json({ status: "fail", data: "user not found" });
          }
        }
      },
    );
  } else {
    res.status(401).json({ status: "fail", data: "unauthorized credential" });
  }
};
