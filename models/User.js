const { Schema, model} = require("mongoose");
const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true, default: "user" },
  kurs: { type: String},
  surname: { type: String },
  name: { type: String },
  patronymic: { type: String },
  specialization: { type: String }
});

module.exports = model("User", schema);
