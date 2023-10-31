import { useEffect } from "react";
import { DEFAULT_STATE } from "../../shared/constants";
import { useGetGameStateQuery, useTurnEndMutation, useWordCorrectMutation, useWordIncorrectMutation } from "../store/api";
import { Timer } from "./Timer";
import { useGameSelector } from "../store/hooks";

export const Game = () => {
  const { data = DEFAULT_STATE } = useGetGameStateQuery();
  const [ onWordCorrect ] = useWordCorrectMutation();
  const [ onWordIncorrect ] = useWordIncorrectMutation();
  const [ endTurn ] = useTurnEndMutation();
  const { name } = useGameSelector();
  
  const lastWord = data.currentWords[data.currentWords.length - 1];
  const isYourTurn = name === data.currentUser;

  useEffect(() => {
    if (data.currentWords.length === 0) {
      endTurn();
    }
  }, [data.currentWords, endTurn])

  return (
    <div>
      <h1>Game</h1>
      <h2>Current team {data.currentTeam}</h2>
      <h2>Current user {data.currentUser}</h2>
      {isYourTurn && 
        <>
          <Timer onTimerEnd={endTurn} /> 

          <h3>Word</h3>
          <p>{lastWord}</p>

          <button onClick={onWordCorrect}>Correct Word</button>
          <button onClick={onWordIncorrect}>Incorrect Word</button>
        </>
      }
    </div>
  )
};