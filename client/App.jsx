import { useEffect } from 'react';
import { DEFAULT_STATE } from '../shared/constants';
import './App.css';

import { ChooseTeam, ChooseWords, JoinRoom, StartNewGame, Teams, Game } from './components';
import { useGetGameStateQuery, useLeaveRoomMutation } from './store/api';
import { useGameSelector } from './store/hooks';

function App() {
  const { data = DEFAULT_STATE } = useGetGameStateQuery();
  const { name } = useGameSelector();
  const [ leaveRoom ] = useLeaveRoomMutation();
  const { teamOne, teamTwo, noTeamUsers } = data;

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      leaveRoom({ name });
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [leaveRoom, name]);

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
