import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import user from "../models/user.js";
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new user({
      firstName,
      lastName,
      email,
      Password: hashPassword,
      picturePath,
      friends,
      location,
      occupation,
    });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error });
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const User = await user.findOne({ email });
    if (!User) {
      return res.status(401).json({ message: "wrong email" });
    }

    const isMatch = await bcrypt.compare(password, User.Password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: User._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    delete User.Password;

    res.status(200).json({ token, User });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
