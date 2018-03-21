// appends an audio element to playback and download recording
var current_word;
var recorder = null;
var recordingControl = document.createElement('button');
recordingControl.type = 'button';
recordingControl.innerHTML = 'stop this recording';
recordingControl.disabled = true;
recordingControl.onclick = function(){
    if(recorder && recorder.state != "inactive")
        recorder.stop();
};
document.body.appendChild(recordingControl);

var stop = true;
var control = document.createElement('button');
control.type = 'button';
control.innerHTML = 'Start All Recordings';
control.disabled = false;
control.onclick = function(){
    if(stop == false){
        stop = true;
        control.innerHTML = 'Start All Recordings';
        recorder.stream.getTracks()[0].stop();
        recorder = null;
        recordingControl.disabled = true;
    }
    else {
        stop = false;
        control.innerHTML = 'stop forever';
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            // store streaming data chunks in array
            var chunks = [];
            // create media recorder instance to initialize recording

            recorder = new MediaRecorder(stream);
            // function to be called when data is received
            recorder.ondataavailable = e => {
                // add stream data to chunks
                console.log("data available for " + current_word);
                chunks.push(e.data);
                // if recorder is 'inactive' then recording has finished
                if (!stop && recorder && recorder.state == 'inactive') {
                    // convert stream data chunks to a 'webm' audio format as a blob
                    const blob = new Blob(chunks.slice(), { type: 'audio/webm' });
                    // convert blob to URL so it can be assigned to a audio src attribute
                    createAudioElement(URL.createObjectURL(blob),current_word+".webm");
                    var filename = "hello.txt";
                    //saveAs(blob, filename);
                    chunks = [];
                }
            };
        }).catch(console.error);
    }
};
document.body.appendChild(control);



function createAudioElement(blobUrl,filename) {
    const downloadEl = document.createElement('a');
    downloadEl.style = 'display: block';
    downloadEl.innerHTML = 'download';
    downloadEl.download = filename;
    downloadEl.href = blobUrl;
    const audioEl = document.createElement('audio');
    audioEl.controls = true;
    const sourceEl = document.createElement('source');
    sourceEl.src = blobUrl;
    sourceEl.type = 'audio/webm';
    audioEl.appendChild(sourceEl);
    document.body.appendChild(audioEl);
    document.body.appendChild(downloadEl);
    downloadEl.click();
}

chrome.runtime.onMessage.addListener(function(message, sender) {
    console.log("tab got message "+message.data)
    // request permission to access audio stream

    // start recording with 1 second time between receiving 'ondataavailable' events
    if(recorder){
        current_word = message.data;
        recorder.start(1000);
        recordingControl.disabled = false;
    }

    // setTimeout to stop recording after 4 seconds

    /*
    setTimeout(() => {
        // this will trigger one final 'ondataavailable' event and set recorder state to 'inactive'
        recorder.stop();
    }, 4000);
    */

});
