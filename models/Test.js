const { Schema, model, Types } = require("mongoose");
const schema = new Schema({
  name: { type: String, required: true },
  owner: { type: String, required: true },
  subscribesList: { type: Array, ref: "User" },
  questionsList: { type: Array, required: true },
  answersList: { type: Array, required: true },
});

module.exports = model("Test", schema);
