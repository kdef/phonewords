var trie = new PhonePadTrie();

var app = new Vue({
    el: "#phone",
    data: {
        number: "",
        words: [],
    },
    methods: {
        press(event) {
            let key = event.target.dataset.key;
            if (key == "clear") {
                app.number = "";
            } else {
                app.number += key;
            }
            app.words = getWords(app.number);
        }
    },
    computed: {
        wordsDisplay() {
            return this.words.join(", ");
        }
    },
});

function getWords(number) {
    return trie.getWords(app.number);
}

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
