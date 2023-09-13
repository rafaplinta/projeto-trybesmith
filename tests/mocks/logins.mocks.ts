const validPassword = 'terrível';
const validUsername = 'Hagar';

const noUsernameLoginBody = { username: '', password: validPassword };
const noPasswordLoginBody = { username: validUsername, password: ''};

const unexistentUsername = { username: 'Eragon', password: 'cavaleiro' };
const wrongPasswordLoginBody = { username: validUsername, password: 'genteboa'};

const validUser = { username: validUsername, password: validPassword };

export default {
  noUsernameLoginBody,
  noPasswordLoginBody,
  unexistentUsername,
  wrongPasswordLoginBody,
  validUser,
};