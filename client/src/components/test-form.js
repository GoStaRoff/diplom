import React, { useState, useContext } from "react";
import { useMessage } from "../hooks/message.hook";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/auth-context";

const TestForm = ({ test }) => {
  const message = useMessage();
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [userAnswers, setUserAnswers] = useState(
    Array(test.questionsList.length)
  );

  const changeHandler = (questionIndex, answerIndex) => {
    let newUserAnswers = [...userAnswers];
    newUserAnswers[questionIndex] =
      test.answersList[questionIndex][answerIndex].answer;
    setUserAnswers(newUserAnswers);
  };

  const completeTest = async () => {
    for (let i = 0; i < userAnswers.length; i++) {
      if (userAnswers[i] === undefined) {
        message("Заповніть усі питання відповіддю");
        return;
      }
    }
    try {
      const data = await request(
        "/api/answers/add",
        "POST",
        { testId: test._id, userId: auth.userId, answersList: userAnswers },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      message(data.message);
    } catch (e) {
      message(e);
    }
  };

  return (
    <div className="row page-card">
      <div className="test-info">
        <h4>{test.name}</h4>
        <p>Опис : {test.description}</p>
        <span>
          Тип тесту :{" "}
          {test.isTest
            ? "Вірних відповідей не існує"
            : "Одна правильна відповідь на запитання"}
        </span>
      </div>
      <div className="questions">
        {test.questionsList.map((question, questionIndex) => {
          return (
            <div className="question" key={question + questionIndex}>
              <div className="question-text">
                <h5>
                  {questionIndex + 1}.{" " + question}
                </h5>
              </div>
              {test.answersList[questionIndex].map((answer, answerIndex) => {
                return (
                  <div
                    key={answer + question + answerIndex + questionIndex}
                    className="answer"
                  >
                    <label className="answer-text">
                      <input
                        className="with-gap"
                        name={`group${questionIndex}`}
                        type="radio"
                        onChange={() => {
                          changeHandler(questionIndex, answerIndex);
                        }}
                      />
                      <span>{answer.answer}</span>
                    </label>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="completed-test">
        <button
          className="btn waves-effect waves-light"
          name="createTest"
          onClick={completeTest}
        >
          <i className="large material-icons right">check</i>Завершити тест
        </button>
      </div>
    </div>
  );
};

export default TestForm;
