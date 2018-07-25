var app = new Vue({
    el: "#app",
    data: {
        number: "",
        words: [],
    },
    methods: {
        press(event) {
            let key = event.target.innerText;
            if (key == "Clear") {
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
    return ["Ha", "Had", "Has", "Have", "Haven"];
}
