import {
  words,
  RANDOM_WORDS_COUNT,
  DEFAULT_STATE,
} from '../shared/constants.js';
import { shuffle } from './utils/shuffle.js';

export class GameState {
  constructor() {
    this.state = DEFAULT_STATE;
  }

  // TODO: move it out of class
  getRandomWords(exceptions) {
    const result = [];
    const updatedExceptions = [...exceptions];
    while (result.length < RANDOM_WORDS_COUNT) {
      const word = words[Math.floor(Math.random() * words.length)];
      if (updatedExceptions.includes(word)) continue;
      result.push(word);
      updatedExceptions.push(word);
    }
    return result;
  }

  chooseWords(chosenWords) {
    this.state.gameWords.push(...chosenWords);
  }

  getGameWords() {
    return this.state.gameWords;
  }

  getCurrentWords() {
    return this.state.currentWords;
  }

  resetCurrentWords() {
    this.state.currentWords = shuffle([...this.state.gameWords]);
  }

  nextRound() {
    this.state.round++;
    return this.state.round;
  }

  nextWord() {
    this.state.currentWords.pop();
  }

  updateScore(amount) {
    this.state[this.state.currentTeam].score += amount;
  }

  changeTeam() {
    if (this.state.currentTeam === 'teamOne')
      this.state.currentTeam = 'teamTwo';
    else this.state.currentTeam = 'teamOne';
  }

  getCurrentTeam() {
    return this.state.currentTeam;
  }

  getCurrentUser() {
    // TODO: implement
  }

  getTeamOneScore() {
    return this.state.teamOne.score;
  }

  getTeamTwoScore() {
    return this.state.teamTwo.score;
  }

  resetGame() {
    this.state = DEFAULT_STATE;
  }

  addPlayer(name, team) {
    if (this.isUserWithName(name)) {
      this.removeExistingPlayer(name);
    }
    this.state.playersAmount++;
    if (team) {
      this.state[team].users.push(name);
    } else {
      this.state.noTeamUsers.push(name);
    }
  }

  isUserWithName(name) {
    const isNoTeamUser = !!this.state.noTeamUsers.find(
      (userName) => userName === name
    );
    const isTeamOneUser = !!this.state.teamOne.users.find(
      (userName) => userName === name
    );
    const isTeamTwoUser = !!this.state.teamTwo.users.find(
      (userName) => userName === name
    );
    return isNoTeamUser || isTeamOneUser || isTeamTwoUser;
  }

  removeExistingPlayer(name) {
    this.state.playersAmount--;
    this.state.noTeamUsers = this.state.noTeamUsers.filter(
      (userName) => userName !== name
    );
    this.state.teamOne.users = this.state.teamOne.users.filter(
      (userName) => userName !== name
    );
    this.state.teamTwo.users = this.state.teamTwo.users.filter(
      (userName) => userName !== name
    );
  }

  getPlayersAmount() {
    return this.state.playersAmount;
  }

  getAllUsers() {
    return {
      teamOne: this.state.teamOne.users,
      teamTwo: this.state.teamTwo.users,
      noTeamUsers: this.state.noTeamUsers,
    };
  }
}
