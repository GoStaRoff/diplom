const { Schema, model, Types } = require("mongoose");
const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  login: { type: String, required: true, default: "newUser" },
  userType: { type: String, required: true, default: "user" },
  surname: { type: String },
  name: { type: String },
  patronymic: { type: String },
  address: { type: String },
  specialization: { type: String },
  testAnswers: { type: Array, ref: "UserAnswer" },
});

module.exports = model("User", schema);
