This small Vue app shows all the possible English words you could mean for any sequence of digits you type on a phone dial pad.

Suggestions for longer words that you might be trying to type are displayed underneath the results. These are random suggestions for now.

The app uses a [trie](https://en.wikipedia.org/wiki/Trie) data structure to hold all the words in the English dictionary. Keys into the tree are numbers and we follow the sequence of digits in the number to traverse the tree to the node holding words made from that number. This makes searching for longer suggestions with the same prefix fast. "he" -> 43 and "hello" -> 43556
