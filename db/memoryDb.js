const users = [];

export const findUserByEmail = (email) => {
  return users.find((user) => user.email === email);
};

export const createUser = (email, password) => {
  if (findUserByEmail(email)) {
    throw new Error('이미 존재하는 이메일입니다.');
  }
  const user = { id: Date.now(), email, password };
  users.push(user);
  return user;
};

export const validateUser = (email, password) => {
  const user = findUserByEmail(email);
  if (!user) {
    throw new Error('존재하지 않는 이메일입니다.');
  }
  if (user.password !== password) {
    throw new Error('비밀번호가 일치하지 않습니다.');
  }
  return user;
};
