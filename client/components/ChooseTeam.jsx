import { useSelector } from "react-redux";
import { useChooseTeamMutation } from "../store/api";

export const ChooseTeam = () => {
  const [ chooseTeam ] = useChooseTeamMutation();
  const { name }  = useSelector(({game}) => game.state);

  return (
    <div>
      <button onClick={() => chooseTeam({ team: 'teamOne', name })}>Blue</button>
      <button onClick={() => chooseTeam({ team: 'teamTwo', name })}>Red</button>
    </div>
  )
};