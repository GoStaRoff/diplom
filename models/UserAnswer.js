const { Schema, model, Types } = require("mongoose");
const schema = new Schema({
  testId: { type: Types.ObjectId, required: true, ref: "Test" },
  userId: { type: Types.ObjectId, required: true, ref: "User" },
  answersList: { type: Array, required: true },
  result: { type: String },
});

module.exports = model("Answer", schema);
