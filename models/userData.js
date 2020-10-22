const { getDb } = require('../util/database');

class UserData {
  constructor(name, email, mobile,place,courses) {
    this.name = name;
    this.email = email;
    this.mobile = mobile;
    this.place=place;
    this.courses=courses;
  }

  save() {
    const db = getDb();
   return db.collection('fradoUsers')
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = UserData;
