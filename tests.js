// Test trie.js

QUnit.test("listTrieNodeChildren", function(assert) {
    let node = new TrieNode();
    node.children["a"] = null;
    node.children["b"] = null;

    let children = node.listChildren();

    assert.ok(children instanceof Array);
    assert.equal(children.length, 2);
});

QUnit.test("newTrieIsEmpty", function(assert) {
    let trie = new PhonePadTrie();
    let children = trie.root.listChildren();
    let data = trie.root.words;
    assert.equal(children.length, 0);
    assert.equal(data.length, 0);
});

QUnit.test("trieInsert", function(assert) {
    let trie = new PhonePadTrie();

    trie.insert("do");
    trie.insert("it");

    assert.notOk(trie.root.children[7]);
    assert.ok(trie.root.children[3]);
    assert.ok(trie.root.children[3].children[6]);
    assert.ok(trie.root.children[4]);
    assert.ok(trie.root.children[4].children[8]);
    assert.equal(trie.root.listChildren().length, 2);
    assert.equal(trie.root.children[3].listChildren().length, 1);
    assert.equal(trie.root.children[4].listChildren().length, 1);
    assert.equal(trie.root.children[3].children[6].listChildren().length, 0);
    assert.equal(trie.root.children[4].children[8].listChildren().length, 0);
});

QUnit.test("trieGetWords", function(assert) {
    let trie = new PhonePadTrie();

    trie.insert("dog");
    trie.insert("cat");
    trie.insert("ad");
    trie.insert("be");

    assert.ok(trie.getWords("364").includes("dog"));
    assert.ok(trie.getWords("228").includes("cat"));
    assert.ok(trie.getWords("23").includes("ad"));
    assert.ok(trie.getWords("23").includes("be"));
    assert.equal(trie.getWords("777").length, 0);
    assert.equal(trie.getWords("36").length, 0);
});

QUnit.test("trieGetSuggestions", function(assert) {
    let trie = new PhonePadTrie();
    let words = ["ad", "ab", "abe", "able"];

    trie.insert("administer");
    for (let i in words) {
        trie.insert(words[i]);
    }

    let suggs = trie.getSuggestions("2");

    for (let i in words) {
        assert.ok(suggs.includes(words[i]), "suggests " + words[i]);
    }
    assert.equal(suggs.length, 4);
    assert.notOk(suggs.includes("administer")); // too deep in trie
    assert.ok(trie.getSuggestions("236464").includes("administer"));
});
