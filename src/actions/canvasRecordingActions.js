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
  var image = './blank.png';
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
      sourceNode.connect(destination)
      resolve(sourceNode);
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
