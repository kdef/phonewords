var buttons = {
  'a': 2, 'b': 2, 'c': 2,
  'd': 3, 'e': 3, 'f': 3,
  'g': 4, 'h': 4, 'i': 4,
  'j': 5, 'k': 5, 'l': 5,
  'm': 6, 'n': 6, 'o': 6,
  'p': 7, 'q': 7, 'r': 7, 's': 7,
  't': 8, 'u': 8, 'v': 8,
  'w': 9, 'x': 9, 'y': 9, 'z': 9
};

function TrieNode() {
    this.children = {};
    this.words = [];
}  

function PhonePadTrie() {
    this.root = new TrieNode();
}

PhonePadTrie.prototype.insert = function(word) {
    let node = this.root;

    for (ltr in word) {
        let digit = buttons[word[ltr]];

        if (node.children[digit] == undefined) {
            // no words with this button sequence added yet, add new node
            node.children[digit] = new TrieNode();
        }
        node = node.children[digit];
    }
    node.words.push(word);
};

PhonePadTrie.prototype.getWords = function(number) {
    let node = this.root;
    for (n in number) {
        let digit = Number(number[n]);
        if (node.children[digit] == undefined) return [];
        node = node.children[digit];
    }
    return node.words;
};

let ex = new PhonePadTrie();
ex.insert("ad");
ex.insert("be");
console.log(ex.getWords("23").toString());
