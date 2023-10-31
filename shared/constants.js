export const PORT = 3001;
export const RANDOM_WORDS_COUNT = 7;
export const GAME_WORDS_COUNT = 5;
export const ROUNDS_AMOUNT = 3;

export const words = [
  'apple',
  'banana',
  'cherry',
  'date',
  'elderberry',
  'fig',
  'grape',
  'honeydew',
  'kiwi',
  'lemon',
  'mango',
  'nectarine',
  'orange',
  'peach',
  'quince',
  'raspberry',
  'strawberry',
  'tangerine',
  'ugli',
  'watermelon',
];

export const DEFAULT_STATE = {
  gameWords: [],
  round: 0,
  currentWords: [],
  currentTeam: 'teamOne',
  playersAmount: 0,
  teamOne: {
    users: [],
    score: 0,
  },
  teamTwo: {
    users: [],
    score: 0,
  },
  noTeamUsers: [],
  currentUser: '',
  usersList: null,
};
export const ROOM_ID = 'room';

export const TYPES = {
  JOIN_ROOM: 'join_room',
  START_NEW_GAME: 'start_new_game',
  CHOOSE_TEAM: 'choose_team',
  GET_RANDOM_WORDS: 'get_random_words',
  CHOOSE_WORDS: 'choose_words',
  START_TURN: 'start_turn',
  WORD_COMPLETED: 'word_completed',
  WORD_SUCCESS: 'word_success',
  WORD_FAILURE: 'word_failure',
  END_ROUND: 'end_round',
  GAME_CAN_BE_STARTED: 'game_can_be_started',
  WORDS_LIST: 'words_list',
  PLAYERS: 'players',
  END_GAME: 'end_game',
  SCORE_UPDATE: 'score_update',
  NEW_ROUND: 'new_round',
  NEW_USER: 'new_user',
  GAME_SCORE: 'game_score',
  LEAVE_ROOM: 'leave_room',
  GAME_STATE: 'game_state',
  USER_WITH_SUCH_NAME_ALREADY_EXISTS: 'user_with_such_name_already_exists',
};
