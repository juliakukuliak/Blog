function Comment(name, comment, date) {
	this.name = name;
  this.comment = comment;
  this.date = date;
    
}

Comment.prototype.getSimpleModel = function () {
  return {
  	   name: this.name,
      comment: this.comment,
     date: this.date,
  }
};

module.exports = Comment;