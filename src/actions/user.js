"use server";
const bcrypt = require("bcrypt");
import User from "@/models/User";

export const register = async (formData) => {
  const newUser = new User({
    ...formData,
    password: await bcrypt.hash(formData.password, 10),
  });
  const result = await newUser.save();
  return result ? true : false;
};

export const login = async (formData) => {
  const user = await User.findOne({ email: formData.email });
  if (!user) return false;
  const isMatch = await bcrypt.compare(formData.password, user.password);
  return isMatch ? JSON.stringify(user) : null;
};
