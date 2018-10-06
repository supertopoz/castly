export function setAudioContext(context) {	
    return {
        type: "SET_AUDIO_CONTEXT",
        payload: context
    };
}

export const addCanvasImage = (image) => { 

  return (dispatch) => {
  // This is the hidden Canvas
  image = 'blank.png';
  var hiddenCanvas = document.getElementById('canvas');
  var context = hiddenCanvas.getContext('2d');

// I have lots of transforms right now
context.save();
context.setTransform(1, 0, 0, 1, 0, 0);
// Will always clear the right space
context.clearRect(0, 0, canvas.width, canvas.height);
context.restore();
// Still have my old transforms




  var img = new Image();          
    img.src = image;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height); 
    context.fillStyle = '#03A9F4'; 
    img.addEventListener('load', function() {
      //   cloneCanvas(hiddenCanvas)
         context.drawImage(img, 360, 10, img.width, img.height)
         //img.scale(2,2);
    }, false);
  }
  dispatch({
          type: "ADD_CANVAS_IMAGE",
          payload: image
        });
}



export function initializeUserMedia() {	

  return (dispatch) => {
  var AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioContext();

  const cloneCanvas = (oldCanvas) => {
    // This is the displayed canvas
    var newCanvas = document.getElementById('canvas2');
    var context = newCanvas.getContext('2d');
    newCanvas.width = 700//oldCanvas.width /2;
    newCanvas.height = 394//oldCanvas.height /2;
    context.drawImage(oldCanvas, 0, 0, newCanvas.width, newCanvas.height);
    context.scale(0.5,0.5)
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
        const width = video.videoWidth/1.5;
        const height = video.videoHeight/1.5;
        ctx.drawImage(video, 10, 10, width, height); 
        cloneCanvas(canvas)
    };
      draw();
  }

  const injectNewAudio = (video, stream) => {
    return new Promise((resolve, reject) => {
      const options = { audioBitsPerSecond : 128000, videoBitsPerSecond : 2500000, mimeType : 'video/mp4', video: video }
        if(audioCtx){
          const sourceNode = audioCtx.createMediaStreamSource(stream);
          const destination = audioCtx.createMediaStreamDestination();
          sourceNode.connect(destination);
          resolve(destination.stream); // Goes to dataStream in state
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
      injectNewAudio(video, stream).then(dataStream => {
        startCanvasVidoeAnimation(video)
        dispatch({
          type: "INITILIZE_USER_MEDIA",
        	payload:[dataStream, audioCtx]
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

export const startRecordingStream =(stream) => {
  return (dispatch) => {
    const canvas = document.getElementById('canvas');
    const recordStream = canvas.captureStream(30);  
    recordStream.addTrack(stream.getAudioTracks()[0]);
    let recorder = null
    try {
     recorder = new MediaRecorder(recordStream);
    } catch (e){
      console.error('Exception while createing MediaRecorder', + e)
    }
    
    recorder.ondataavailable = (e) => event.data.size &&  event.currentTarget.chunks.push(event.data)
    recorder.start();
    recorder.chunks = [];
    recorder.onpause = event => {
      console.log('paused', event)
    }
    recorder.onresume = event => {
      console.log('resume', event)
    }
    recorder.onstop = function(event) {
      console.log('Stopped', event) 
      dispatch({
          type: "STOP_RECORDING",
          payload: event
        });
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
      const vid = document.createElement('video');
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

export const changeRecordButton = (clickedButton = 'begin') => {
    let newStart = false;
    let icons = []
    if(clickedButton === 'INITILIZE') icons = ['fiber_manual_record']
    if(clickedButton === 'fiber_manual_record') icons = ['pause','stop']
    if(clickedButton === 'pause') icons = ['fiber_manual_record','stop']
    if(clickedButton === 'stop') icons = ['refresh','cloud_download']
    if(clickedButton === 'refresh') { 
      newStart = true;
      icons = ['fiber_manual_record'] 
    }
    return {
      type: "UPDATE_RECORD_BUTTONS",
      payload: {icons, newStart}
    };
}
