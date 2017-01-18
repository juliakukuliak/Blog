

function User(username, password, id ) {
    this.username = username;
    this.password = password;
    this.id = id;
    
}

User.prototype.getSimpleModel = function () {
    return {
        username: this.username,
        password: this.password,
        id: this.id
    }
};

module.exports = User;