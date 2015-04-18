var Pair = require('input-pair');

var Form = function() {
  if ( !(this instanceof Form) ) return new Form();

  this.el = document.createElement('div');
  this.pairs = [];
  this.addNewPair();
};

// add a pair to the end of the array
Form.prototype.addNewPair = function() {
  var p = new Pair({
    onComplete: onComplete.bind(this),
    onDelete: onDelete.bind(this)
  });

  this.pairs.push(p);
  this.el.appendChild(p.el);
};

// add a new pair
function onComplete(pair, event) {
  var index = this.pairs.indexOf(pair);
  if (index === (this.pairs.length-1) ) {
    this.addNewPair();
  }
}

// remove the pair, change focus to prev input
function onDelete(pair, event) {
  var index = this.pairs.indexOf(pair);
  if ( index !== (this.pairs.length-1) ) {
    this.pairs.splice(index, 1);
    (this.pairs[index-1] || this.pairs[0]).valueEl.focus();
    pair.el.remove();
  }
  else {
    this.pairs[index-1].valueEl.focus();
  }
}

module.exports = Form;
