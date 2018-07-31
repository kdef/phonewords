var trie = new PhonePadTrie();

var app = new Vue({
    el: "#phone",
    data: {
        number: "",
        words: [],
        suggestions: []
    },
    methods: {
        press(event) {
            let key = event.target.dataset.key;
            if (key == "clear") {
                app.number = "";
            } else if (key == "del") {
                app.number = app.number.slice(0, -1);
            } else {
                app.number += key;
            }
            app.words = trie.getWords(app.number);
            app.suggestions = trie.getSuggestions(app.number);
        },
        keyboardPress(event) {
            let key = event.key;
            if (key in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']) {
                app.number += key;
            } else if (key == "Backspace") {
                app.number = app.number.slice(0, -1);
            }
            app.words = trie.getWords(app.number);
            app.suggestions = trie.getSuggestions(app.number);
        }
    },
    computed: {
        wordsDisplay() {
            return this.words.join(", ");
        },
        suggestDisplay() {
            return this.suggestions.sort().join(", ");
        }
    },
    created: function() {
        window.addEventListener("keypress", this.keyboardPress);
    }
});

function loadWords() {
    let resp = JSON.parse(this.responseText);
    let words = resp.words;

    for (let i = 0; i < words.length; i++) {
        trie.insert(words[i]);
    }
    console.log("Loaded all words");
}

var req = new XMLHttpRequest();
req.addEventListener("load", loadWords);
req.open("GET", "words.json");
req.send();
