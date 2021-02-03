import React, { useState } from "react";

const ImageTest = () => {
  const [test, setTest] = useState({
    name: "IMAGETEST",
    description: "IMAGETEST",
    owner: "SOMEONE",
    isTest: true,
    subscribesList: [],
    questionsList: ["hi", "hi", "hi"],
    answersList: [
      [
        { answer: "ans", status: false },
        { answer: "ans", status: false },
        { answer: "ans", status: false },
      ],
      [
        { answer: "ans", status: false },
        { answer: "ans", status: false },
        { answer: "ans", status: false },
      ],
      [
        { answer: "ans", status: false },
        { answer: "ans", status: false },
        { answer: "ans", status: false },
      ],
    ],
  });

  const [image, setImage] = useState(null);
  const changeHandler = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
    let newTest = test;
    newTest.answersList[0][0].img = event.target.files[0];
    setTest(newTest)
  };
  return (
    <div>
      <div className="file-field input-field">
        <div className="btn">
          <i className="material-icons">image</i>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={changeHandler}
          />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <img className="test-image" src={image} alt="alt" />
    </div>
  );
};

export default ImageTest;
