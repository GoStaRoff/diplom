const { Schema, model, Types } = require("mongoose");
const schema = new Schema({
  name: { type: String, required: true },
  description : { type:String, default:"Опис"},
  instruction : { type: String, default:"Інструкція"},
  image: { type: String},
  isTest: { type: Boolean, required: true},
  owner: { type: Types.ObjectId, required: true , ref: "User"},
  questionsList: { type: Array, required: true },
  answersList: { type: Array, required: true },
});

module.exports = model("Test", schema);
