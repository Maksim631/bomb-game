import { useSelector } from 'react-redux';

export const useGameSelector = () => useSelector((state) => state.game.state);
