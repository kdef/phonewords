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

// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i);
        let temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

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
        // is this number a valid path through the trie?
        if (node.children[digit] == undefined) return [];
        node = node.children[digit];
    }
    return node.words;
};

PhonePadTrie.prototype.getSuggestions = function(number) {
    let node = this.root;
    let suggestions = [];
    let limit = 3;

    // traverse to end of the number input, if valid
    for (let i in number) {
        let digit = Number(number[i]);
        if (node.children[digit] == undefined) return [];
        node = node.children[digit];
    }

    let curNode = node;
    if (curNode == this.root) return []; // is the number empty?

    curChildren = shuffle(Object.keys(curNode.children));
    limit = Math.min(curChildren.length, limit);

    // go deeper for random suggestions
    for (let i = 0; i < limit; i++) {
        node = curNode.children[curChildren.pop()];
        suggestions.push.apply(suggestions, node.words);

        for (let j = 0; j < limit; j++) {
            let children = shuffle(Object.keys(node.children));
            if (children.length == 0) break;
            //let randomChild = children[j % children.length];
            //if (node.children[randomChild] == undefined) continue;

            node = node.children[children.pop()];
            suggestions.push.apply(suggestions, node.words);
        }
    }

    return suggestions;
}

let ex = new PhonePadTrie();
ex.insert("ad");
ex.insert("be");
console.log(ex.getWords("23").toString());
