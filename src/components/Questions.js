import React, { useState } from 'react';


export const questions = [
    {
        questionText: 'What is the capital of France?',
        answerOptions: [
            { answerText: 'New York', isCorrect: false },
            { answerText: 'London', isCorrect: false },
            { answerText: 'Paris', isCorrect: true },
            { answerText: 'Dublin', isCorrect: false },
        ],
    },
    {
        questionText: 'Who is CEO of Tesla?',
        answerOptions: [
            { answerText: 'Jeff Bezos', isCorrect: false },
            { answerText: 'Elon Musk', isCorrect: true },
            { answerText: 'Bill Gates', isCorrect: false },
            { answerText: 'Tony Stark', isCorrect: false },
        ],
    },
    {
        questionText: 'The iPhone was created by which company?',
        answerOptions: [
            { answerText: 'Apple', isCorrect: true },
            { answerText: 'Intel', isCorrect: false },
            { answerText: 'Amazon', isCorrect: false },
            { answerText: 'Microsoft', isCorrect: false },
        ],
    },
    {
        questionText: 'How many Harry Potter books are there?',
        answerOptions: [
            { answerText: '1', isCorrect: false },
            { answerText: '4', isCorrect: false },
            { answerText: '6', isCorrect: false },
            { answerText: '7', isCorrect: true },
        ],
    },
];

function CheckAnswer(id) {
    let data = id.split(".");
    let questionNumber = data[1];
    let answerNumber = data[3];
    console.log(questions[questionNumber].answerOptions[answerNumber].isCorrect);
    return questions[questionNumber].answerOptions[answerNumber].isCorrect;
}

export function QuestionDisplay(props) {
    return (
      <div>

        <div>{questions[props.questionNumber].questionText}</div>

        {questions[props.questionNumber].answerOptions.map((answer,idx) => (
            <button 
            id={"Q." + props.questionNumber.toString() + ".A." + idx.toString()}
            key={"Q." + props.questionNumber.toString() + ".A." + idx.toString()} 
            onClick={CheckAnswer.bind(this, "Q." + props.questionNumber.toString() + ".A." + idx.toString())}
            >
                {answer.answerText}</button>
        ))}

      </div>
    );
  }

export default QuestionDisplay;
