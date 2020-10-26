const { getDb } = require('../util/database');

const getRegisteredUsers = () => {
  const db = getDb();
  return db.collection('fradoUsers').find({});
};

exports.getRegisteredUsers = getRegisteredUsers;
