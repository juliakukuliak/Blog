function Topic(name, author, text, date, img ) {
    if(!name) throw new Error("Name missed");
    // if(!author) throw new Error("author missed");
    // if(!text) throw new Error("text missed");
    // if(!date) throw new Error("date missed");

    this.name = name;
    this.author = author;
    this.text = text;
    this.date = date;
    this.img = img
     
    
}

Topic.prototype.getSimpleModel = function () {
    return {
        name: this.name,
        author: this.author,
        date: this.date,
        img: this.img,
        text: this.text
    }
};

module.exports = Topic;