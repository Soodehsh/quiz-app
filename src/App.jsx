import "./app.css";
import{useState,useEffect,useMemo} from 'react';
import Trivia from "./components/Trivia";
import Timer from "./components/Timer";
import Start from "./components/Start";



function App() {
  const[username, setUsername] = useState(null);
  const[questionNumber, setQuestionNumber] = useState(1);
  const[stop, setStop] = useState(false);
  const[earned, setEarned] = useState("$ 0");

  const data = [
    {
      id: 1,
      question: "Rolex is a company that specializes in what type of product?",
      answers: [
        {
          text: "Phone",
          correct: false,
        },
        {
          text: "Watches",
          correct: true,
        },
        {
          text: "Food",
          correct: false,
        },
        {
          text: "Cosmetic",
          correct: false,
        },
      ],
    },
    {
      id: 2,
      question: "When did the website `Facebook` launch?",
      answers: [
        {
          text: "2004",
          correct: true,
        },
        {
          text: "2005",
          correct: false,
        },
        {
          text: "2006",
          correct: false,
        },
        {
          text: "2007",
          correct: false,
        },
      ],
    },
    {
      id: 3,
      question: "Who played the character of harry potter in movie?",
      answers: [
        {
          text: "Johnny Deep",
          correct: false,
        },
        {
          text: "Leonardo Di Caprio",
          correct: false,
        },
        {
          text: "Denzel Washington",
          correct: false,
        },
        {
          text: "Daniel Red Cliff",
          correct: true,
        },
      ],
    },
  ];

  const moneyPyramid = useMemo(
    () => 
    [
       {id:1, amount:"kr 100"},
       {id:2, amount:"kr 200"},
       {id:3, amount:"kr 300"},
       {id:4, amount:"kr 400"},
       {id:5, amount:"kr 500"},
       {id:6, amount:"kr 600"},
       {id:7, amount:"kr 700"},
       {id:8, amount:"kr 800"},
       {id:9, amount:"kr 900"},
       {id:10, amount:"kr 1000"},
       {id:11, amount:"kr 2000"},
       {id:12, amount:"kr 5000"},
       {id:13, amount:"kr 10000"},
       {id:14, amount:"kr 15000"},
       {id:15, amount:"kr 30000"},
    ].reverse(),
     []
  );

  useEffect(()=>{
    questionNumber > 1 && setEarned(moneyPyramid.find(m => m.id === questionNumber-1).amount);
  },[moneyPyramid,questionNumber])
  return( 
  <div className="app">
    {username ? (
  <>
    <div className="main">
      {stop ? (
      <h1 className="endText">You earned: {earned}</h1>
      ) : (
       <>
          <div className="top">
            <div className="timer">
              <Timer
                setStop={setStop}
                questionNumber={questionNumber}
              />
            </div>
          </div>
          <div className="bottom">
               <Trivia 
                data={data} 
                setStop={setStop}
                questionNumber={questionNumber}
                setQuestionNumber = {setQuestionNumber}
               />
          </div>
       </>
      )}
    </div>
      <div className="pyramid">
        <ul className="moneyList">
          {moneyPyramid.map((m) => (
          <li className={questionNumber === m.id ? "moneyListItem active" : "moneyListItem"}>
            <span className="moneyListItemNumber">{m.id}</span>
            <span className="moneyListItemAmount">{m.amount}</span>
          </li>
          ))}
        </ul>
      </div>
  </>
      ) : (
      <Start setUsername={setUsername} />
      )}
  </div>
  );
}

export default App;
