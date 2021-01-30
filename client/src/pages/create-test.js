import React, { useState, useContext, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/auth-context";
import { useHistory } from "react-router-dom";
import "./create-test.css";

const CreateTest = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setLink] = useState("");
  const [isTest, setIsTest] = useState(null);
  const [questions, setQuestions] = useState([
    "Question example1?",
    "Question example2?",
    "Question example3?",
  ]);
  const [answers, setAnswers] = useState([
    [
      { answer: "Answer example1", status: true },
      { answer: "Answer example1", status: true },
      { answer: "Answer example1", status: true },
    ],
    [
      { answer: "Answer example2", status: true },
      { answer: "Answer example2", status: true },
      { answer: "Answer example2", status: true },
    ],
    [
      { answer: "Answer example3", status: true },
      { answer: "Answer example3", status: true },
      { answer: "Answer example3", status: true },
    ],
  ]);

  const test = {
    name: "",
    description: "",
    owner: "",
    subscribesList: [],
    questionsList: [],
    answersList: [],
  };

  const typeHandlerTrue = () => {
    setIsTest(true);
  };

  const typeHandlerFalse = () => {
    setIsTest(false);
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
      { answer: "", status: true },
    ];
    setAnswers(newAnswers);
    console.log(newAnswers);
  };

  const deleteAnswer = (questionIndex, answerIndex) => {
    let newAnswers = [...answers];
    newAnswers[questionIndex] = newAnswers[questionIndex].filter(
      (answer, index) => index !== answerIndex
    );
    setAnswers(newAnswers);
  };

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const pressHandler = async (event) => {
    if (event.key === "Enter") {
      try {
        const data = await request(
          "/api/link/generate",
          "POST",
          { from: link },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        history.push(`/userlist/${data.link._id}`);
      } catch (e) {}
    }
  };
  return (
    <div>
      <div className="row page-card">
        <div className="col s10 offset-s1" style={{ paddingTop: "2rem" }}>
          <div className="create-test-info">
            <h4>Інформація про тест</h4>
            <div className="input-field ">
              <input id="input_text" type="text" data-length="40" />
              <label htmlFor="input_text">Назва тесту</label>
            </div>
            <div className="input-field ">
              <textarea
                id="textarea2"
                className="materialize-textarea"
                data-length="3000"
              ></textarea>
              <label htmlFor="textarea2">Опис тесту</label>
            </div>
            <form action="#">
              <div className="file-field input-field">
                <div className="btn">
                  <div>Картинка (не обов'язково)</div>
                  <input type="file" accept=".png, .jpg, .jpeg" />
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" />
                </div>
              </div>
            </form>
            <div className="type-test">
              <span>Тип тесту : </span>
              <label>
                <input
                  className="with-gap"
                  name="group1"
                  type="radio"
                  checked={!isTest}
                  onChange={typeHandlerFalse}
                />
                <span>Одна правильна відповідь</span>
              </label>
              <label>
                <input
                  className="with-gap"
                  name="group1"
                  type="radio"
                  checked={isTest}
                  onChange={typeHandlerTrue}
                />
                <span>Правильної відповіді немає</span>
              </label>
            </div>
          </div>
          <div className="test-questions">
            <h4>Запитання</h4>
            {questions.map((question, questionIndex) => {
              return (
                <div className="question" key={questionIndex}>
                  <div className="question-text">
                    <h5>
                      {questionIndex + 1}.{" "}
                      <div className="input-field ">
                        <textarea
                          id="textarea2"
                          className="materialize-textarea"
                          data-length="3000"
                          defaultValue={question}
                        ></textarea>
                        <label htmlFor="textarea2">Запитання</label>
                      </div>
                    </h5>
                  </div>
                  {answers[questionIndex].map((answer, answerIndex) => {
                    return (
                      <div className="input-field answer">
                        <textarea
                          id="textarea2"
                          className="materialize-textarea"
                          style={{width:"70%"}}
                          data-length="3000"
                          defaultValue={answer.answer}
                        ></textarea>
                        <label htmlFor="textarea2">Варіант відповіді</label>
                        <button
                          className="btn waves-effect waves-light btn red delete-btn"
                          name="createTest"
                          onClick={() => {
                            deleteAnswer(questionIndex, answerIndex);
                          }}
                        >
                          <i className="material-icons">close</i>
                        </button>
                        
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
                        style={{ color: "black" , marginLeft: '20px'}}
                        onClick={() => {
                          deleteQuestion(questionIndex);
                        }}
                      >
                        <i className="large material-icons right">
                          delete_forever
                        </i>
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
        <button className="btn waves-effect waves-light" name="createTest">
          <i class="large material-icons right">add_circle</i>Створити тест
        </button>
      </div>
    </div>
  );
};

export default CreateTest;
