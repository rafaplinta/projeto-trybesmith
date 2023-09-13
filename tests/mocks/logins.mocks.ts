const validPassword = 'terrível';
const validUsername = 'Hagar';

const noUsernameLoginBody = { username: '', password: validPassword };
const noPasswordLoginBody = { username: validUsername, password: ''};

const unexistentUsername = { username: 'Eragon', password: 'cavaleiro' };
const wrongPasswordLoginBody = { username: validUsername, password: 'genteboa'};

const validUser = { username: validUsername, password: validPassword };

const hashedPassword = '$2a$10$lQGsGScdxhjGRuYVJX3PX.347IWLNiSk6hOiMmjxlzLEI32lg5LMW';

const existingUser = { 
  id: 1, 
  username: validUsername,
  vocation: 'Guerreiro',
  level: 10,
  password: hashedPassword,
};

export default {
  noUsernameLoginBody,
  noPasswordLoginBody,
  unexistentUsername,
  wrongPasswordLoginBody,
  validUser,
  existingUser,
};