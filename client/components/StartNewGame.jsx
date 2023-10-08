import { useStartNewGameMutation } from "../store/api";

export const StartNewGame = () => {
  const [startNewGame] = useStartNewGameMutation();
  return (
    <div>
      <button onClick={startNewGame}>Start New Game</button>
    </div>
  )
}