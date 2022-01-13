const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    let user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    user = await user.save();

    if (!user)
      return res
        .status(500)
        .json({ succces: false, message: "user not create" });
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
  }
};
exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: "user not found" });

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
        },
        process.env.SECRET,
        { expiresIn: "1d" }
      );
      return res.status(200).json({ user: user, token: token });
    }
    return res
      .status(500)
      .json({ succces: false, message: "Parola veya Email hatalı" });
  } catch (error) {
    console.log(error);
  }
};
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).send("Invalid user Id");

    let newPassword;
    if (req.body.password) {
      newPassword = bcrypt.hashSync(req.body.password, 10);
    } else {
      newPassword = user.password;
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        username: req.body.username,
        email: req.body.email,
        password: newPassword,
      },
      { new: true }
    );

    if (!updateUser)
      return res
        .status(500)
        .json({ succces: false, message: "user not update" });
    res.status(201).send(updateUser);
  } catch (error) {
    console.log(error);
  }
};
