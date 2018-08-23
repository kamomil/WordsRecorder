console.log('content script')
document.addEventListener('mouseup', function(event) {
    console.log('selection chaned!')
    var sel = window.getSelection().toString()
    if (sel.length) {
        chrome.extension.sendRequest({'message':'setText', 'data': sel}, function(response) {})
    }
})
console.log('content script 222!')

document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.ctrlKey && (evt.keyCode == 70 || evt.keyCode == 102)) {
        alert("Ctrl-F");
        //chrome.extension.sendRequest({'message':'setText', 'data': sel}, function(response) {})
    }
};
