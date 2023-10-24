import { DEFAULT_STATE } from '../shared/constants';
import './App.css';

import { ChooseTeam, ChooseWords, JoinRoom, StartNewGame, Teams, Game } from './components';
import { useGetGameStateQuery } from './store/api';

function App() {
  const { data = DEFAULT_STATE } = useGetGameStateQuery();
  const { teamOne, teamTwo, noTeamUsers } = data;

  return (
    <>
      <JoinRoom />
      <ChooseTeam />
      <StartNewGame />
      <ChooseWords />

     <Teams teamOne={teamOne} teamTwo={teamTwo} noTeamUsers={noTeamUsers} />
     {data.gameCanBeStarted && <Game /> }
      <span>{JSON.stringify(data, null, 2)}</span>
    </>
  )
}

export default App
