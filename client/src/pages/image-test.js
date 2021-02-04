import React from "react";
const axios = require("axios");

const ImageTest = () => {
  const onChange = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("myImage", e.target.files[0]);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    await axios
      .post("/image/upload", formData, config)
      .then((response) => alert(response.data.message))
      .catch((error) => alert(error.response.data.message));
  };

  return (
    <form >
      <h1>File Upload</h1>
      <div class="file-field input-field">
        <div class="btn">
          <span>File</span>
          <input type="file" name="myImage" onChange={onChange} />
        </div>
        <div class="file-path-wrapper">
          <input class="file-path validate" type="text" />
        </div>
      </div>
      <button type="submit">Upload</button>
    </form>
  );
};

export default ImageTest;
