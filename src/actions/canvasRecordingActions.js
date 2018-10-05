export function setAudioContext(context) {	
    return {
        type: "SET_AUDIO_CONTEXT",
        payload: context
    };
}

export function initializeUserMedia() {	

  return (dispatch) => {
  var AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioContext();
    function cloneCanvas(oldCanvas) {
    // This is the displayed canvas
    var newCanvas = document.getElementById('canvas2');
    var context = newCanvas.getContext('2d');
    newCanvas.width = 700//oldCanvas.width /2;
    newCanvas.height = 394//oldCanvas.height /2;
    context.drawImage(oldCanvas, 0, 0, newCanvas.width, newCanvas.height);
    context.scale(0.5,0.5)
}

function updateCanvas(){
  // This is the hidden Canvas
  var image = 'blank.png';
  console.log(image)
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var img = new Image();          
    img.src = image;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height); 
    context.fillStyle = '#03A9F4'; 
    img.addEventListener('load', function() {
         cloneCanvas(canvas)
         context.drawImage(img, 360, 10, img.width, img.height)
         //img.scale(2,2);
    }, false);
}

const showVideo = (video, stream) => {
  return new Promise((resolve,reject)=>{
    video.addEventListener('loadedmetadata', () => {     
      video.play();
      resolve(video)
    });
  })
}

const startCanvasVidoeAnimation = (video) => { 
    
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d'); 
    const draw = () => { 
      window.requestAnimationFrame(draw); 
      ctx.fillRect(0, 0, ctx.height, ctx.width); 
      ctx.fillStyle = '#03A9F4';       
      var width = video.videoWidth/1.5;
      var height = video.videoHeight/1.5;
      ctx.drawImage(video, 10, 10, width, height); 
      cloneCanvas(canvas)
  };
    draw();
  }

const injectNewAudio = (video, stream) => {
  return new Promise((resolve, reject) => {
     var options = { audioBitsPerSecond : 128000, videoBitsPerSecond : 2500000, mimeType : 'video/mp4', video: video }
      if(audioCtx){
      const sourceNode = audioCtx.createMediaStreamSource(stream);
      const destination = audioCtx.createMediaStreamDestination();
      sourceNode.connect(destination);
      resolve(destination.stream); // Goes to myRecording in state
      } else {
        reject({});
      }
    })
}

const createVideo = (stream) => {
  return new Promise((resolve,reject)=>{
    var video = document.createElement('video');
    video.srcObject = stream;
      try {
        video.srcObject = stream;
     } catch (error) {
        console.log(error)
        video.src = URL.createObjectURL(stream);
     }
    video.muted = true; 
    resolve(video)
  })
}

let getUserStream = () => {
  return new Promise((resolve, reject) => {
    navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  })
  .then(function (stream) {
    resolve(stream)
  }).catch(function(error) {
    reject(error)
    console.log('error', error);
  })
 })
}

const intilizeUserMedia = () => {
 getUserStream().then(stream => {
  createVideo(stream).then((video) =>{
    showVideo(video, stream).then((video) => {
      injectNewAudio(video, stream).then(newRecording => {
        startCanvasVidoeAnimation(video)
        updateCanvas()  
        dispatch({
          type: "INITILIZE_USER_MEDIA",
        	payload:[newRecording, audioCtx]
        });
      }).catch(err=>{
       	dispatch({
          type: "INITILIZE_USER_MEDIA",
        	payload:[error, error]
        });
      })
    })
  })
 })
}
intilizeUserMedia()
}
}

export const startRecordingStream =(stream) =>{
    console.log('stream', stream)
   // stream = window.STREAM;
   // console.log('STREAM', window.STREAM)
  return (dispatch) => {
    // Start up recorder
    //AUDIOCTX.resume();
    // inject it into the canvas
    var canvas = document.getElementById('canvas');
    var recordStream = canvas.captureStream(30);  
    recordStream.addTrack(stream.getAudioTracks()[0]);


    let recorder = null
    try {
     recorder = new MediaRecorder(recordStream);
    } catch (e){
      console.error('Exception while createing MediaRecorder', + e)
    }
    
    recorder.ondataavailable = function(e){
     console.log('Media Data', event.data)
     // this.chunks.push(e.data)
      return event.data.size &&  event.currentTarget.chunks.push(event.data)
    }
    recorder.start();
    recorder.chunks = [];
    recorder.onpause = event => {
      console.log('paused', event)
    }
    recorder.onresume = event => {
      console.log('resume', event)
    }
    recorder.onstop = function(event) {
      console.log(recorder);
      console.log('Stopped', event) 
      dispatch({
          type: "STOP_RECORDING",
          payload: event
        });
     // exportStream(event).then(vidURL => {
     //   addVidToDom(vidURL)
    //  }).catch(error => {
    //    console.log(error)
    //  })
    }
    dispatch({
          type: "START_RECORDING",
          payload: recorder
        });   
  }
  }


export const exportVideo =(event) =>{
  return (dispatch) => {

    const addVidToDom =(vidURL) => {
    let vid = document.createElement('video');
    vid.controls = true;
    //vid.controlsList = "nodownload";
    vid.className = 'recordedVid'
    vid.src = vidURL;
    vid.style.width = '300px';
    vid.onend = function() { URL.revokeObjectURL(vidURL) }
    var canva = document.getElementById('vid-holder')
    canva.appendChild(vid);
  }

  const exportStream = (event) => {
    return new Promise((resolve, reject)=>{
      if (event.currentTarget.chunks.length) {
        const blob = new Blob(event.currentTarget.chunks)
        const vidURL = URL.createObjectURL(blob);
        resolve(vidURL);
      } else {
        reject('recording export failed');
      }
    })
  }
  exportStream(event).then(vidURL => {
    addVidToDom(vidURL)
      dispatch({
        type: "VIDEO_DATA",
        payload: vidURL
      }); 
  })
}
}