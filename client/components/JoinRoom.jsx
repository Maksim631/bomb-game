import { memo, useState } from "react";
import { useDispatch } from 'react-redux';
import { useJoinRoomMutation } from "../store/api";

export const JoinRoom = memo(function JoinRoom(){
  const [ joinRoom ] = useJoinRoomMutation();

  const [ name, setName ] = useState('');
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch({ type: 'CHOOSE_NAME', payload: name })
    joinRoom({ name });
  }

  return (
    <div>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <button onClick={handleClick}>Join Room</button>
    </div>
  )
});