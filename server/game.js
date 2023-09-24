import { GAME_WORDS_COUNT, ROOM_ID, TYPES, WORDS_COUNT } from './constants';
import { GameState } from './GameState';

const gameState = new GameState();
// TODO: should be class, roomId: clients[], where client is pair name and ws
const clients = [];

export const processMessage = (ws, message) => {
  const { type, data } = JSON.parse(message);
  switch (type) {
    case TYPES.JOIN_ROOM: {
      const { name } = data;
      clients.push(ws);
      gameState.addPlayer(name);
      ws.subscribe(ROOM_ID);
      ws.publish(ROOM_ID, {
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
      ws.publish(ROOM_ID, {
        type: TYPES.PLAYERS,
        data: {
          usersState: gameState.getAllUsers(),
        },
      });
      break;
    }
    case TYPES.START_NEW_GAME: {
      const exceptions = [];
      clients.forEach((client) => {
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
        ws.publish(ROOM_ID, {
          type: TYPES.GAME_CAN_BE_STARTED,
          data: {
            words: gameState.getGameWords(),
            currentTeam: gameState.getCurrentTeam(),
            currentPlayer: gameState.
          },
        });
      }
      break;
    }
    case TYPES.CHOOSE_TEAM: {
      gameState.addPlayer(data.team, data.name);
      ws.publish(ROOM_ID, {
        type: TYPES.PLAYERS,
        data: {
          playersAmount: gameState.getPlayersAmount(),
          teamOne: gameState.teamOne,
          teamTwo: gameState.teamTwo,
        },
      });
      break;
    }
    case TYPES.START_TURN: {
      ws.publish(ROOM_ID, { type: TYPES.START_TURN });
      break;
    }
    case TYPES.WORD_COMPLETED: {
      gameState.nextWord();
      ws.publish(ROOM_ID, { type: TYPES.WORD_COMPLETED });
      break;
    }
    case TYPES.END_ROUND: {
      const { completed } = data;
      const isWordsRemain = gameState.getCurrentWords().length > 0;
      gameState.updateScore(completed);
      gameState.changeTeam();
      if (isWordsRemain) {
        ws.publish(ROOM_ID, {
          type: TYPES.SCORE_UPDATE,
          data: {
            currentTeam: gameState.state.currentTeam,
            teamOneScore: gameState.state.teamOne.score,
            teamTwoScore: gameState.state.teamTwo.score,
          },
        });
      } else {
        gameState.nextRound();
        gameState.shuffleWords();
        if (gameState.getRound() === 4) {
          ws.publish(ROOM_ID, { type: TYPES.END_GAME, data: gameState.state });
        } else {
          ws.publish(ROOM_ID, {
            type: TYPES.NEW_ROUND,
            data: {
              words: gameState.getGameWords(),
            },
          });
        }
      }
      break;
    }
  }
};

export const processOpen = (ws) => {
  ws.subscribe(ROOM_ID);
};

export const processClose = (ws) => {
  ws.unsubscribe(ROOM_ID);
};
