import React, { useState,useEffect,useRef } from 'react'
import { data } from './data';
import './App.scss';

// Global interval
let myInterval;

const App = () => {
  const [minutes, setMin] = useState(2);
  const [seconds, setSec] = useState("00");
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState();
  const [value, setValue] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const myRef = useRef();

  useEffect(() => {
    // Waktu habis
    if(seconds===0 && minutes===0){
      reset();
      //Tampilkan score

    }
  }, [seconds, minutes])

  const startGame = (e) =>{
    e.preventDefault();
    if(!isActive){
      // Timer logic
      let time = 120;
      const tick = () =>{
        const updateMinutes = Math.floor(time/60) % 60;
        const updateSeconds = time % 60;

        setMin(updateMinutes);
        setSec(updateSeconds);
        time-=1;
      } 
      myInterval = setInterval(tick,1000);

      // Game logic
      setIsActive(true);
      
      // Kosongkan score
      setScore(0);

      renderQuestion();

      // Langsung actifkan input box ketika game dimulai
      setTimeout(()=>{
        myRef.current.focus();
      },100);
    }
  }

  const reset = () =>{
      clearInterval(myInterval);
      setMin("2");
      setSec("00");
      setIsActive(false);
  }

  const renderQuestion = () =>{
    const randomNumber = Math.floor(Math.random() * data.length);
    const pickRandom = data[randomNumber];
    const rightAnswer = pickRandom.romaji;
    
    setQuestion(pickRandom.kana);
    setCorrectAnswer(rightAnswer);
  }

  const checkAnswer = (userInput) =>{
    if(userInput === correctAnswer){
      setScore(p=>p+1);
      return true
    } 
  }

  const getQuestion = (e) =>{
    e.preventDefault();

    const isTrue = checkAnswer(value);

    if(isTrue){
      renderQuestion();
    }

    // Kosongkan input field
    setValue('');
  }

  const handleChange = (e) =>{
    setValue(e.target.value);
  }

  return (
    <div className="game-container">
      <div className="timer">
        <p>0{minutes} : {seconds}</p>
      </div>    

      <div className="btn-container">
        <button onClick={startGame}>Start</button>
        <button onClick={reset}>Reset</button>
      </div>

      {
        isActive?
        <div id="game" className={isActive?"show":"hide"}>
          <div className="question">{question}</div>
          <form onSubmit={getQuestion}>
            <input ref={myRef} onChange={handleChange} type="text" value={value}/>
          </form>
        </div>
        : <p className="hiragana">ひらがな</p>
      }

      
      <div className="score">Score:{score}</div>
    </div>
  )
}

export default App

