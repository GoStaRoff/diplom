import React, { useState } from "react";
const axios = require("axios");

const ImageTest = () => {
  const [file, setFile] = useState(null);
  const onFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("myImage", file);
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
  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <h1>File Upload</h1>
      <input type="file" name="myImage" onChange={onChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default ImageTest;
