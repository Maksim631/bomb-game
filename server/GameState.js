import { words, RANDOM_WORDS_COUNT, DEFAULT_STATE } from './constants';

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
    this.state.gameWords.push(chosenWords);
  }

  getGameWords() {
    return this.state.gameWords;
  }

  getCurrentWords() {
    return this.state.currentWords;
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
    this.state.playersAmount++;
    if (team) {
      this.state[team].users.push(name);
    } else {
      this.state.noTeamUsers.push(name);
    }
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
