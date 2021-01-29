const { Schema, model, Types } = require("mongoose");
const schema = new Schema({
  testId: { type: Types.ObjectId, required: true, ref: "Tests" },
  owner: { type: Types.ObjectId, required: true, ref: "User" },
  answersList: { type: Array, required: true },
});

module.exports = model("UserAnswer", schema);
