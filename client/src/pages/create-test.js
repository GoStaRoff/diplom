import React, { useState, useContext, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/auth-context";
import { useHistory } from "react-router-dom";
import { useMessage } from "../hooks/message.hook";
import "./create-test.css";

const CreateTest = () => {
  const axios = require("axios");
  const message = useMessage();
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [testName, setTestName] = useState("");
  const [testDescription, setTestDescription] = useState("");
  const [isTest, setIsTest] = useState(false);
  const [questions, setQuestions] = useState([
    "Question example1?",
    "Question example2?",
    "Question example3?",
  ]);
  const [answers, setAnswers] = useState([
    [
      { answer: "Answer example11", status: true },
      { answer: "Answer example12", status: false },
      { answer: "Answer example13", status: false },
    ],
    [
      { answer: "Answer example2", status: false },
      { answer: "Answer example2", status: true },
      { answer: "Answer example2", status: false },
    ],
    [
      { answer: "Answer example31", status: false },
      { answer: "Answer example32", status: false },
      { answer: "Answer example33", status: true },
    ],
  ]);

  const typeHandler = (_isTest) => {
    setIsTest(_isTest);
  };

  const addQuestion = () => {
    setQuestions([...questions, ""]);
    setAnswers([...answers, []]);
  };

  const deleteQuestion = (questionIndex) => {
    let newQuestions = [...questions];
    let newAnswers = [...answers];
    newQuestions = newQuestions.filter(
      (question, index) => index !== questionIndex
    );
    newAnswers = newAnswers.filter((answer, index) => index !== questionIndex);
    setQuestions(newQuestions);
    setAnswers(newAnswers);
  };

  const addAnswer = (questionIndex) => {
    let newAnswers = [...answers];

    newAnswers[questionIndex] = [
      ...newAnswers[questionIndex],
      { answer: "", status: false },
    ];
    setAnswers(newAnswers);
  };

  const deleteAnswer = (questionIndex, answerIndex) => {
    let newAnswers = [...answers];
    newAnswers[questionIndex] = newAnswers[questionIndex].filter(
      (answer, index) => index !== answerIndex
    );
    setAnswers(newAnswers);
  };

  const changeAnswerImage = async (event, questionIndex, answerIndex) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("myImage", event.target.files[0]);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    let imageName = null;
    await axios
      .post("/image/upload", formData, config)
      .then((response) => (imageName = response.data.message))
      .catch((error) => alert(error.response.data.message));
    if (imageName) {
      let newAnswers = [...answers];
      newAnswers[questionIndex][answerIndex].image = imageName;
      console.log(newAnswers);
      setAnswers(newAnswers);
    }
  };

  const createTest = async () => {
    if (testName.length < 1) {
      message("Введіть назву теста");
      return;
    }
    if (testDescription.length < 1) {
      message("Введіть опис теста");
      return;
    }
    if (questions.length < 1) {
      message("Створіть хоча б одне запитання");
      return;
    }
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].length < 1) {
        message("Заповніть всі поля для тексту запитання");
        return;
      }
    }
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].length < 2) {
        message("Створіть мінімум дві відповіді для питання");
        return;
      }
    }
    for (let i = 0; i < answers.length; i++) {
      for (let j = 0; j < answers[i].length; j++) {
        if (answers[i][j].answer.length < 1) {
          message("Заповніть всі поля для тексту відповіді");
          return;
        }
      }
    }
    if (!isTest) {
      for (let i = 0; i < answers.length; i++) {
        let isChecked = false;
        for (let j = 0; j < answers[i].length; j++) {
          if (answers[i][j].status) {
            isChecked = true;
          }
        }
        if (!isChecked) {
          message("Оберіть правильну відповідь для усіх запитань");
          return;
        }
      }
    }

    const test = {
      name: testName,
      description: testDescription,
      owner: "",
      isTest: isTest,
      subscribesList: [],
      questionsList: questions,
      answersList: answers,
    };
    try {
      const data = await request(
        "/api/test/create",
        "POST",
        { from: test },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      history.push(`/testlist/${data.test._id}`);
    } catch (e) {}
  };

  const changeName = (event) => {
    setTestName(event.target.value);
  };

  const changeDescription = (event) => {
    setTestDescription(event.target.value);
  };

  const changeQuestion = (event, questionIndex) => {
    let newQuestions = [...questions];
    newQuestions[questionIndex] = event.target.value;
    setQuestions(newQuestions);
  };

  const changeAnswer = (event, questionIndex, answerIndex) => {
    let newAnswers = [...answers];
    newAnswers[questionIndex][answerIndex].answer = event.target.value;
    setAnswers(newAnswers);
  };

  const changeTrueAnswer = (questionIndex, answerIndex) => {
    let newAnswers = [...answers];
    newAnswers[questionIndex] = newAnswers[questionIndex].map(
      (answer, index) => {
        if (index === answerIndex) answer.status = true;
        else answer.status = false;
        return answer;
      }
    );
    setAnswers(newAnswers);
  };

  useEffect(() => {
    window.M.updateTextFields();
  }, []);
  return (
    <div onClick={window.M.updateTextFields}>
      <div className="row page-card">
        <div className="col s10 offset-s1" style={{ paddingTop: "2rem" }}>
          <div className="create-test-info">
            <h4>Інформація про тест</h4>
            <div className="input-field ">
              <input
                id="input_text"
                type="text"
                data-length="40"
                defaultValue={testName}
                onChange={changeName}
              />
              <label htmlFor="input_text">Назва тесту</label>
            </div>
            <div className="input-field ">
              <textarea
                id="textareaDescription"
                className="materialize-textarea"
                data-length="3000"
                defaultValue={testDescription}
                onChange={changeDescription}
              ></textarea>
              <label htmlFor="textareaDescription">Опис тесту</label>
            </div>
            <div className="type-test">
              <span>Тип тесту : </span>
              <label>
                <input
                  className="with-gap"
                  name="groupType"
                  type="radio"
                  checked={!isTest}
                  onChange={() => {
                    typeHandler(false);
                  }}
                />
                <span>Одна правильна відповідь</span>
              </label>
              <label>
                <input
                  className="with-gap"
                  name="groupType"
                  type="radio"
                  checked={isTest}
                  onChange={() => {
                    typeHandler(true);
                  }}
                />
                <span>Правильної відповіді немає</span>
              </label>
            </div>
          </div>
          <div className="test-questions">
            <h4>Запитання</h4>
            {questions.map((question, questionIndex) => {
              return (
                <div className="question" key={question + questionIndex}>
                  <div className="question-text">
                    <h5>
                      {questionIndex + 1}.{" "}
                      <div className="input-field ">
                        <textarea
                          id={`question${questionIndex}`}
                          className="materialize-textarea"
                          data-length="3000"
                          defaultValue={question}
                          onBlur={(event) => {
                            changeQuestion(event, questionIndex);
                          }}
                        ></textarea>
                        <label htmlFor={`question${questionIndex}`}>
                          Запитання
                        </label>
                      </div>
                    </h5>
                  </div>
                  {answers[questionIndex].map((answer, answerIndex) => {
                    return (
                      <div
                        key={answer + question + answerIndex + questionIndex}
                        className="answer"
                      >
                        {!isTest && (
                          <label>
                            <input
                              className="with-gap"
                              name={`group${questionIndex}`}
                              type="radio"
                              checked={
                                answers[questionIndex][answerIndex].status
                              }
                              onChange={() => {
                                changeTrueAnswer(questionIndex, answerIndex);
                              }}
                            />
                            <span></span>
                          </label>
                        )}
                        <div className="input-field">
                          <textarea
                            id={`answer${questionIndex}${answerIndex}`}
                            className="materialize-textarea"
                            data-length="3000"
                            defaultValue={answer.answer}
                            onChange={(event) => {
                              changeAnswer(event, questionIndex, answerIndex);
                            }}
                          ></textarea>
                          <label
                            htmlFor={`answer${questionIndex}${answerIndex}`}
                          >
                            Варіант відповіді
                          </label>
                        </div>
                        <button
                          className="btn waves-effect waves-light btn red delete-btn"
                          name="createTest"
                          onClick={() => {
                            deleteAnswer(questionIndex, answerIndex);
                          }}
                        >
                          <i className="material-icons">close</i>
                        </button>
                        <div className="file-field input-field answer-image">
                          <div className="btn">
                            <i className="material-icons">image</i>
                            <input
                              type="file"
                              name="myImage"
                              onChange={(event) => {
                                changeAnswerImage(
                                  event,
                                  questionIndex,
                                  answerIndex
                                );
                              }}
                              accept=".png, .jpg, .jpeg"
                            />
                          </div>
                          <div
                            className="file-path-wrapper"
                            style={{ width: "100px" }}
                          >
                            <input className="file-path validate" type="text" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <button
                    className="btn waves-effect waves-light -btn yellow darken-3"
                    name="createTest"
                    onClick={() => {
                      addAnswer(questionIndex);
                    }}
                  >
                    <i className="large material-icons right">add_circle</i>
                    Додати відповідь
                  </button>
                  <button
                    className="btn waves-effect waves-light -btn white"
                    name="createTest"
                    style={{ color: "black", marginLeft: "20px" }}
                    onClick={() => {
                      deleteQuestion(questionIndex);
                    }}
                  >
                    <i className="large material-icons right">delete_forever</i>
                    Видалити запитання
                  </button>
                </div>
              );
            })}
            <div className="add-question">
              <button
                className="btn waves-effect waves-light create-test-btn green add-question"
                name="createTest"
                onClick={addQuestion}
              >
                <i className="large material-icons right">add_circle</i>Додати
                запитання
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="create-completed-test">
        <button
          className="btn waves-effect waves-light"
          name="createTest"
          onClick={createTest}
        >
          <i className="large material-icons right">add_circle</i>Створити тест
        </button>
      </div>
    </div>
  );
};

export default CreateTest;
