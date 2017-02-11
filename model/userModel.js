function User(name, username, password, email) {
	this.name = name;
  this.username = username;
  this.password = password;
  this.id = Date.now();
  this.email = email;
    
}

User.prototype.getSimpleModel = function () {
  return {
  	name: this.name,
      username: this.username,
      password: this.password,
      email: this.email,
      id: this.id
  }
};

module.exports = User;