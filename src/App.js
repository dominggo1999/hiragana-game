import React, { useState,useEffect,useRef } from 'react'
import { hiragana, katakana } from './data';
import './App.scss';

// Global interval
let myInterval;

const App = () => {
  const [minutes, setMin] = useState("02");
  const [seconds, setSec] = useState("00");
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState();
  const [value, setValue] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [timeIsOut, setTimeIsOut] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const myRef = useRef();

  useEffect(() => {
    // Waktu habis
    if(timeIsOut){
      reset();
      //Tampilkan score
    }
  }, [timeIsOut])

  const startGame = (e) =>{
    e.preventDefault();
    if(!isActive){
      // Timer logic
      const m = 2; // Kali menit 
      let time = 60 * m ;
      const tick = () =>{
        const updateMinutes = Math.floor(time/60) % 60;
        const updateSeconds = time % 60;

        setMin(updateMinutes);
        setSec(updateSeconds);

        if(time===0){
          setTimeIsOut(true);
        }

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
      setMin("00");
      setSec("00");
      setIsActive(false);
      setValue('');
  }

  const renderQuestion = () =>{
    // Pilih kana disini
    // const data = [...hiragana,...katakana];
    const data = hiragana;
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

  const formatTime = (time) =>{
      if(time.toString().length === 1 || time === 0){
        time = "0" + time;
      } 


      return time 
  }

  return (
    <div className="game-container">
      <div className="timer">
        <p>{formatTime(minutes)} : {formatTime(seconds)}</p>
      </div>   

      <div className="btn-container">
        <button className="btn start" onClick={startGame}>Start</button>
        <button className="btn reset" onClick={reset}>Reset</button>
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


 