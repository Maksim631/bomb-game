import { useEffect } from 'react';
import './App.css';
import { useGetGameStateQuery } from './store/api';
import { JoinRoom } from './components/JoinRoom';
import { ChooseTeam } from './components/ChooseTeam';
import { StartNewGame } from './components/StartNewGame';
import { ChooseWords } from './components/ChooseWords';

function App() {
  const { data } = useGetGameStateQuery();


  useEffect(() => {
    console.log(data)
  }, [data]);

  return (
    <>
      <JoinRoom />
      <ChooseTeam />
      <StartNewGame />
      <ChooseWords />
      <span>{JSON.stringify(data, null, 2)}</span>
    </>
  )
}

export default App
