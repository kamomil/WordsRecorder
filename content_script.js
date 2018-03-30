console.log('content script')
document.addEventListener('mouseup', function(event) {
    console.log('selection chaned!')
    var sel = window.getSelection().toString()
    if (sel.length)        {
 chrome.extension.sendRequest({'message':'setText', 'data': sel}, function(response) {})
}
})
console.log('content script 222!')
