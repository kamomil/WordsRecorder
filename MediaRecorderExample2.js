// appends an audio element to playback and download recording
var words_queue = [];
var recorder = null;
var chunks = [];

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
        words_queue = [];
    }
    else {
        stop = false;
        words_queue = [];
        control.innerHTML = 'stop forever';
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {

            recorder = new MediaRecorder(stream);

            recorder.ondataavailable = e => {
                current_word = words_queue[0];
                console.log("data available for " + current_word);
                console.log("state is "+recorder.state);
                chunks.push(e.data);
                //it is important to create the blob in the ondataavailable event
                //since the first data after the start() contain the file header,
                //then it might happen the the last chnuck of one blob become
                //buggily the first chunck of the next blob, then the header is missing
                if (recorder && recorder.state == 'inactive') {

                    const blob = new Blob(chunks, { type: 'audio/webm' });
                    console.log("blob size 1 = " +blob.size);
                    createAudioElement(URL.createObjectURL(blob),current_word+".webm");
                    words_queue.shift();
                    chunks = [];
                    recorder.start(1000);

                }

            };
        }).catch(console.error);
    }
};

document.body.appendChild(control);

var br = document.createElement('br');
document.body.appendChild(br);
document.body.appendChild(br);
document.body.appendChild(br);


function createAudioElement(blobUrl,filename) {
    const downloadEl = document.createElement('a');
    downloadEl.style = 'display: block';
    downloadEl.innerHTML = filename;
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

    if(recorder){
        //console.log("state1 "+recorder.state);
        words_queue.push(message.data);
        if(recorder.state == "recording"){
            recorder.stop();
        }
        else
        {
            recorder.start(1000);
        }


        // start recording with 0.01 second time between receiving 'ondataavailable' events
    }

    // setTimeout to stop recording after 4 seconds

    /*
    setTimeout(() => {
        // this will trigger one final 'ondataavailable' event and set recorder state to 'inactive'
        recorder.stop();
    }, 4000);
    */

});
