## Chrome Extension For Recording Words

With this chrome extension you can select a text and record it.
Then the extension automatically saves the recording as a webm format.
The name of the file is the selected text with the ".webm" suffix.

It is intended for recording massive amount of words.
Then the recordings can be used for dictionaries - to have the words pronunciation.

This is very basic recording. It doesn't do advanced things like equalization or triming.
#### Design
The code in `content_script.js` is injected to every tab. It has a listener to selected text.
Once a text is selected it is sent to `background.js` which send it to `MediaRecorder.js` which contains all the logic.

You have to open the the extension tab (by clicking the icon in the top right) and push the "Start All Recording" button.
Then, upon selecting a word the recording will start.

