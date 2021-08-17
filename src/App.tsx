import { GlobalStyle } from "./App.styles"
import QuestionCard from "./components/QuestionCard"
import { FetchQuizQuestions, Difficulty, QuestionState } from './API'
import { useState } from 'react'

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}
 
const TOTAL_QUESTIONS = 10

const App = () => {
  const [loading, setLoading] = useState(false); 
  const [difficulty, setDifficulty] = useState(Difficulty.EASY); 
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  

const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);
    
    const newQuestions = await FetchQuizQuestions(TOTAL_QUESTIONS, difficulty);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
}

const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
  if (!gameOver) {
    // users answer
    const answer = e.currentTarget.value;
    // check answer against correct answer
    const correct = questions[number].correct_answer === answer;
    // add score if answer is correct
    correct && setScore(prev => prev + 1);
    // save answer in array for user answers
    const answerObject = {
      question: questions[number].question,
      answer,
      correct,
      correctAnswer: questions[number].correct_answer,
    };
    setUserAnswers(prev => [...prev, answerObject])
  }
}
const levelOptions = [
  {
    label: "--Please choose a level--",
    value: "easy"
},
  {
    label: "Easy",
    value: "easy"
},
  {
    label: "Medium",
    value: "medium"
},
  {
    label: "Hard",
    value: "hard"
}]

const selectLevel = (e:any) => {
  const level = e.currentTarget.value;
  switch (level) {
    case 'easy':
      setDifficulty(Difficulty.EASY)
      break;
    case 'medium':
      setDifficulty(Difficulty.MEDIUM)
      break;
    case 'hard':
      setDifficulty(Difficulty.HARD)
      break;
    default:
      setDifficulty(Difficulty.EASY)
  }
  return difficulty;
}

const nextQuestion = () => {
    // move on to next question if not last question
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
       setGameOver(true)
    } else {
      setNumber(nextQuestion);
    }
}

  return (
    <>
    <GlobalStyle />
    <div className="App">
     <h1>React Quiz (with Typescript) </h1>
     <p>Powered by Open Trivia DB</p> 
     <select value={difficulty} onChange={selectLevel}>
            {levelOptions.map((option) => (
              <option key={option.label} value={option.value}>{option.label}</option>
            ))}
          </select>

     {gameOver || userAnswers.length === TOTAL_QUESTIONS ? 
     <button className="start" onClick={startQuiz}>Start</button>: null}
     {!gameOver ? <p className="score">Score: {score}</p> : null}
     {loading && <p>Loading Questions...</p>}
     {!loading && !gameOver &&
     <QuestionCard questionNumber={number + 1} totalQuestions={TOTAL_QUESTIONS} question={questions[number].question} answers={questions[number].answers} userAnswer={userAnswers ? userAnswers[number] : undefined} callback={checkAnswer}/>}
     {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS -1 ? <button className="next" onClick={nextQuestion}>Next Question</button> : null}
    </div>
    </>
  );
}

export default App;
