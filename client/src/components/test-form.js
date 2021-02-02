import React, { useState } from "react";

const TestForm = ({ test }) => {
  const [userAnswers, setUserAnswers] = useState(Array(test.questionsList.length));
  
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
                    <label  className="answer-text">
                      <input
                        className="with-gap"
                        name={`group${questionIndex}`}
                        type="radio"
                      />
                      <span >{answer.answer}</span>
                    </label>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TestForm;
