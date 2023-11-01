import {
  words,
  RANDOM_WORDS_COUNT,
  DEFAULT_STATE,
} from '../shared/constants.js';
import { LinkedList, ListNode, shuffle, combine } from './utils/index.js';

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
    this.nextUser();
  }

  getCurrentTeam() {
    return this.state.currentTeam;
  }

  getCurrentUser() {
    return this.state.usersList ? this.state.usersList.getCurrent() : '';
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

  makeUsersQueueList() {
    const teamOneUsers = this.state.teamOne.users;
    const teamTwoUsers = this.state.teamTwo.users;
    const combined = combine(teamOneUsers, teamTwoUsers);
    this.state.usersList = new LinkedList();

    combined.forEach((name) => {
      const listNode = new ListNode(name);
      this.state.usersList.insert(listNode);
    });
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

  nextUser() {
    this.state.usersList.next();
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

  getPublicState() {
    return {
      gameWords: this.state.gameWords,
      currentWords: this.state.currentWords,
      currentTeam: this.state.currentTeam,
      currentUser: this.getCurrentUser(),
      teamOne: this.state.teamOne,
      teamTwo: this.state.teamTwo,
      noTeamUsers: this.state.noTeamUsers,
      round: this.state.round,
    };
  }
}
