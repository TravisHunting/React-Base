import React, { useState } from 'react';
import '../static/css/App.css';


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

export function QuestionDisplay(props) {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0); 
    const [showQuestions, setShowQuestions] = useState(true);

    function CheckAnswer(question, answer) {
        console.log("Question number: " + question);
        console.log(questions[question].answerOptions[answer].isCorrect);

        if (questions[question].answerOptions[answer].isCorrect) {
            setScore(score + 1)
        }

        if (currentQuestion < questions.length -1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowQuestions(false);
        }
    }

    var questionContent = questions[currentQuestion].answerOptions.map((answer,idx) => (
        <button 
        id={"Q." + currentQuestion.toString() + ".A." + idx.toString()}
        key={"Q." + currentQuestion.toString() + ".A." + idx.toString()} 
        onClick={CheckAnswer.bind(this, currentQuestion, idx)}
        >
            {answer.answerText}</button>
    ))

    return (
      <div>
        
        {showQuestions ? <div>questions[currentQuestion].questionText</div> : "You Scored:" }
        {showQuestions ? questionContent : <div className="App-section">{score}</div>}

      </div>
    );
  }

export default QuestionDisplay;
