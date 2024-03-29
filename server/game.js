import { GAME_WORDS_COUNT, ROUNDS_AMOUNT, TYPES } from '../shared/constants.js';
import { GameState } from './GameState.js';
import { gameClients } from './GameClients.js';

const gameState = new GameState();

const updateGameState = () => {
  gameClients.sendToAll({
    type: TYPES.GAME_STATE,
    data: gameState.getPublicState(),
  });
};

export const processMessage = (connection, message) => {
  const { type, data } = JSON.parse(message.data);
  console.log('processMessage', 'type', type, 'data', data);
  switch (type) {
    case TYPES.JOIN_ROOM: {
      const { name } = data;
      if (gameState.isUserWithName(name)) {
        connection.send(
          JSON.stringify({
            type: TYPES.USER_WITH_SUCH_NAME_ALREADY_EXISTS,
          })
        );
        return;
      }
      gameClients.addClient(name, connection);
      gameState.addPlayer(name);
      updateGameState();
      break;
    }
    case TYPES.CHOOSE_TEAM: {
      const { name, team } = data;
      gameState.addPlayer(name, team);
      updateGameState();
      break;
    }
    case TYPES.START_NEW_GAME: {
      const exceptions = [];
      gameState.makeUsersQueueList();
      gameClients.forEachClient((client) => {
        const words = gameState.getRandomWords(exceptions);
        exceptions.push(...words);
        client.send(
          JSON.stringify({
            type: TYPES.GET_RANDOM_WORDS,
            data: {
              words,
            },
          })
        );
      });
      break;
    }
    case TYPES.CHOOSE_WORDS: {
      const { words } = data;
      gameState.chooseWords(words);
      if (
        gameState.getGameWords().length ===
        gameState.getPlayersAmount() * GAME_WORDS_COUNT
      ) {
        gameClients.sendToAll({
          type: TYPES.GAME_CAN_BE_STARTED,
        });
        gameState.resetCurrentWords();
        updateGameState();
      }
      break;
    }
    case TYPES.START_TURN: {
      gameClients.sendToAll({ type: TYPES.START_TURN });
      break;
    }
    case TYPES.WORD_SUCCESS: {
      gameState.updateScore(1);
      gameState.nextWord();
      gameClients.sendToAll({ type: TYPES.WORD_SUCCESS });
      updateGameState();
      break;
    }
    case TYPES.WORD_FAILURE: {
      gameState.nextWord();
      gameClients.sendToAll({ type: TYPES.WORD_FAILURE });
      updateGameState();
      break;
    }
    case TYPES.END_ROUND: {
      const isWordsRemain = gameState.getCurrentWords().length > 0;
      console.log(isWordsRemain);
      gameState.changeTeam();
      if (isWordsRemain) {
        updateGameState();
      } else {
        const round = gameState.nextRound();
        gameState.resetCurrentWords();
        if (round > ROUNDS_AMOUNT) {
          gameClients.sendToAll({ type: TYPES.END_GAME });
        }
        updateGameState();
      }
      break;
    }
    case TYPES.LEAVE_ROOM: {
      gameState.removeExistingPlayer(data.name);
      gameClients.removeClient(data.name);
      break;
    }
  }
};

export const processOpen = () => {
  console.log('nothing to do here');
};

export const processClose = () => {
  console.log('delete client from gameClients');
};
