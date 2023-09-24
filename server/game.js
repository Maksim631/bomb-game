import { GAME_WORDS_COUNT, ROUNDS_AMOUNT, TYPES } from './constants';
import { GameState } from './GameState';
import { gameClients } from './GameClients';

const gameState = new GameState();

export const processMessage = (connection, message) => {
  const { type, data } = JSON.parse(message);
  switch (type) {
    case TYPES.JOIN_ROOM: {
      const { name } = data;
      gameClients.addClient(name, connection);
      gameState.addPlayer(name);
      gameClients.sendToAll({
        type: TYPES.PLAYERS,
        data: {
          usersState: gameState.getAllUsers(),
        },
      });
      break;
    }
    case TYPES.CHOOSE_TEAM: {
      const { name, team } = data;
      gameState.addPlayer(name, team);
      gameClients.sendToAll({
        type: TYPES.PLAYERS,
        data: {
          usersState: gameState.getAllUsers(),
        },
      });
      break;
    }
    case TYPES.START_NEW_GAME: {
      const exceptions = [];
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
        gameState.getPlayersAmount() / GAME_WORDS_COUNT
      ) {
        gameClients.sendToAll({
          type: TYPES.GAME_CAN_BE_STARTED,
          data: {
            words: gameState.getGameWords(),
            currentTeam: gameState.getCurrentTeam(),
            currentPlayer: gameState.getCurrentUser(),
          },
        });
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
      break;
    }
    case TYPES.WORD_FAILURE: {
      gameState.nextWord();
      gameClients.sendToAll({ type: TYPES.WORD_FAILURE });
      break;
    }
    case TYPES.END_ROUND: {
      const isWordsRemain = gameState.getCurrentWords().length > 0;
      gameState.changeTeam();
      if (isWordsRemain) {
        gameClients.sendToAll({
          type: TYPES.SCORE_UPDATE,
          data: {
            currentTeam: gameState.state.currentTeam,
            teamOneScore: gameState.getTeamOneScore(),
            teamTwoScore: gameState.getTeamTwoScore(),
          },
        });
      } else {
        const round = gameState.nextRound();
        gameState.shuffleWords();
        if (round > ROUNDS_AMOUNT) {
          gameClients.sendToAll({
            type: TYPES.END_GAME,
            data: gameState.state,
          });
        } else {
          gameClients.sendToAll({
            type: TYPES.NEW_ROUND,
            data: {
              words: gameState.getGameWords(),
            },
          });
        }
      }
      break;
    }
    case TYPES.LEAVE_ROOM: {
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
