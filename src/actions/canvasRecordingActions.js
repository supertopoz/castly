export const setAudioContext = context => {	
    return {
        type: "SET_AUDIO_CONTEXT",
        payload: context
    };
}

export function reset() {
    return {
        type: "RESET",
        payload: ''
    };
}

export function uninitialize() {
    return {
        type: "UNINITIALIZE",
        payload: ""
    };
}

  const cloneCanvas = (oldCanvas, newCanvas, context) => {
    context.drawImage(oldCanvas, 0, 0, newCanvas.width, newCanvas.height);
  }


  const setVisibleCanvasSize = (visibleCanvas) => {
    var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = Math.floor(w.innerWidth || e.clientWidth || g.clientWidth),
    y = Math.floor(w.innerHeight|| e.clientHeight|| g.clientHeight);
    if(x < 700){ 
        x = x-15 
        y = Math.floor((x-15)*0.5625)
      } else {
          x = 768
          y =  432
      }
    visibleCanvas.width = x
    visibleCanvas.height = y
    return visibleCanvas;
  }

export const canvasVideoAnimation = (current) => {  

      const canvas = window.document.getElementById('canvas');
      const ctx = canvas.getContext('2d'); 
      const visibleCanvas = window.document.getElementById('canvas2');
      const context = visibleCanvas.getContext('2d');
      let newCanvas = setVisibleCanvasSize(visibleCanvas);
      var toggle = false;
      (function loop() {
        toggle = !toggle;

        if (toggle) { 
          newCanvas = setVisibleCanvasSize(visibleCanvas);
          ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
          ctx.beginPath();
            if(current.currentImage){
               ctx.fillRect(current.imageStage.x, current.imageStage.y, current.imageStage.width, current.imageStage.height)
               //ctx.drawImage(current.currentImage, currenCanvasObjects.imageStage.x+ currenCanvasObjects.imageStage.width/2 - newImageWidth/2, currenCanvasObjects.imageStage.y, (newImageWidth), newImageHeight)
               ctx.drawImage(current.currentImage, current.imageStage.x, current.imageStage.y, (current.currentImage.width *(current.imageStage.height/current.currentImage.height)), current.imageStage.height )
              if(current.imageStageHighlight){
               ctx.drawImage(current.resizeCorner, (current.imageStage.x + current.imageStage.width), (current.imageStage.y + current.imageStage.height), 80, 80)
             }
            }         
          ctx.stroke();
           if(current.currentImage && current.imageStageHighlight){
            ctx.beginPath();
              ctx.lineWidth = 10;
              ctx.strokeStyle ="white"; 
              ctx.setLineDash([10, 10]);
              ctx.strokeRect(current.imageStage.x, current.imageStage.y, current.imageStage.width, current.imageStage.height);  
            ctx.stroke();  
          }
          ctx.drawImage(current.video, current.video.details.x, current.video.details.y, current.video.details.width, current.video.details.height); 
          if(current.videoHighlight){
            ctx.beginPath();
              ctx.lineWidth = 10;
              ctx.strokeStyle ="white"; 
              ctx.setLineDash([10, 10]);
              ctx.strokeRect(current.video.details.x, current.video.details.y, current.video.details.width, current.video.details.height);  
            ctx.stroke();  
            ctx.drawImage(current.resizeCorner, (current.video.details.x + current.video.details.width), (current.video.details.y + current.video.details.height), 80, 80)
          }
      }
      if(current.running){
        window.requestAnimationFrame(loop);    
        cloneCanvas(canvas, newCanvas, context)
      }

    })();
  }

export function initializeUserMedia(current) {	
  return (dispatch) => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioContext();

  const showVideo = (video, stream) => {
    return new Promise((resolve,reject)=>{
      video.addEventListener('loadedmetadata', () => {     
        video.play();
        resolve(video)
      });
    })
  }



  const injectNewAudio = (video, stream) => {
    return new Promise((resolve, reject) => {
  //    const options = { audioBitsPerSecond : 128000, videoBitsPerSecond : 2500000, mimeType : 'video/mp4', video: video }
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
    const video = window.document.createElement('video');
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

     navigator.getUserMedia = ( navigator.getUserMedia ||
                   navigator.webkitGetUserMedia ||
                   navigator.mozGetUserMedia ||
                   navigator.msGetUserMedia); 


      navigator.mediaDevices.getUserMedia({ 

        audio: true,
        video: true
        // {
        //   width: { min: 128, ideal: 384, max: 768 },
        //   height: { min: 72, ideal: 216, max: 432 },
        // }

      }).then(function(stream) {
      window.localStream = stream;
       console.log('Stream Came online');


      resolve(stream)
    }).catch(function(err) {
    /* handle the error */
    if (err.name=="NotFoundError" || err.name == "DevicesNotFoundError" ){
        console.log('required track is missing')
        reject(`We didn't find both a mic and a camera. You need both a camera and a mic to for castly to work.`)
    } else if (err.name=="NotReadableError" || err.name == "TrackStartError" ){
          console.log('webcam or mic are already in use')
          reject(`webcam or mic are already in use. Please close them in other tabs or browsers, and reload this page.`)
    } else if (err.name=="OverconstrainedError" || err.name == "ConstraintNotSatisfiedError" ){
        console.log('constraints can not be satisfied by avb. devices')
        reject(`${err}`)
    } else if (err.name=="NotAllowedError" || err.name == "PermissionDeniedError" ){
        console.log('permission denied in browser')
        reject(`Camera and microphone denied access. Please allow access. Reload page if needed.`)
    } else if (err.name=="TypeError" || err.name == "TypeError" ){
        console.log('empty constraints')
        reject(`${err}`)
    } else {
         console.log('other errors')
         reject(`${err}`)
    }
    })
   })
}

const createCorner =() =>{
    return new Promise((resolve, reject) => {
      const corner = new Image()
      corner.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACiSURBVDiN5dQxCsMwDIXhpNcSOkfIZHLi4CwxOYVHTf47mzppLTIU8sYH+kAgNAIMN+Z1J/Z/YEppCCHUJc4cx4Gqsq5r1bvAM8wFXmHdYAsrpfjAFhZjZJqmfrCFbduGiLDvex/Yg30Fe7FL0IOdgl6sCf6KlVLIOZNzrk5n8GAAZoaIICKYWRtcloUYYzU4zzMppY/VzAxVRVUrcISnPdg3D5nIVm+mB9cAAAAASUVORK5CYII=';
      corner.addEventListener('load', function(){
        resolve(corner)
      })
    }).catch(e => reject(e))
  }



   getUserStream().then(stream => {
    
    createVideo(stream).then((video) =>{
      showVideo(video, stream).then((video) => {
        injectNewAudio(video, stream).then(dataStream => {
          // Add video to store. then start animation.
          createCorner().then(corner => {
            video.details = {
            width: Math.floor(video.videoWidth/1.3),
            height: Math.floor(video.videoHeight/1.3),
            originalWidth: Math.floor(video.videoWidth/1.3),
            originalHeight: Math.floor(video.videoHeight/1.3),
            x: 0,
            y: 0
          }

          current.video = video;
          current.resizeCorner = corner;
          current.running = true;
          canvasVideoAnimation(current)

          dispatch({
            type: "INITILIZE_USER_MEDIA",
            payload:[dataStream, audioCtx, video]
          });
          })
        }).catch(error=>{
         	dispatch({
            type: "INITILIZE_USER_MEDIA",
          	payload:[error, error, error]
          });
        })
      })
    })
   }).catch(error => {
    dispatch({
            type: "INITILIZE_USER_MEDIA",
            payload:[error, error, error]
          });
   })
  }

}

export const startRecordingStream =(audioStream) => {
  return (dispatch) => {
    const canvas = window.document.getElementById('canvas');
    let recordStream;

    if ('captureStream' in canvas) {
        recordStream = canvas.captureStream(15);
    } else if ('mozCaptureStream' in canvas) {
        recordStream = canvas.mozCaptureStream();
    } else if (!options.disableLogs) {
        console.error('Upgrade to latest Chrome or otherwise enable this flag: chrome://flags/#enable-experimental-web-platform-features');
    }

    recordStream.addTrack(audioStream.getAudioTracks()[0]);
    let recorder = null;
    //const options = {mimeType: 'video/webm;codecs=h264'};
    try {
     recorder = new MediaRecorder(recordStream);
    } catch (e){
      console.error('Exception while creating MediaRecorder', + e)
    }
    recorder.start();
    recorder.chunks = [];
    recorder.ondataavailable = () => {
      console.log('DATA IN BECAME AVAILABLE')
      event.data.size && event.currentTarget.chunks.push(event.data)
    }
    recorder.onpause = event => {
      console.log('paused', event)
    }
    recorder.onresume = event => {
      console.log('resume', event)
    }
    recorder.onstop = function(event) {
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


export const addVidToDom =(vidURL) => {
      return new Promise((resolve,reject) =>{
      if(vidURL === null) {
        reject('NO VIDEO CREATED')
      }
      const vid = window.document.createElement('video');
      let videoHolder = window.document.getElementById('vid-holder')
      vid.controls = true;
      //vid.controlsList = "nodownload";
      vid.className = 'recordedVid'
      vid.src = vidURL;
      vid.style.width = '100%';
      vid.onend = function() { URL.revokeObjectURL(vidURL)}
      videoHolder.appendChild(vid);
      resolve(vid)
      })
    }

export const exportStream = (event = {}) => {
    return new Promise((resolve, reject)=>{
      if (event.currentTarget && event.currentTarget.chunks.length) {
        const blob = new Blob(event.currentTarget.chunks, {type: 'video/mp4'})
        const vidURL = URL.createObjectURL(blob);
        resolve(vidURL);
      } else {
        reject('failed');
      }
    })
  }

export const exportVideo =(event) =>{
  
  return (dispatch) => {
    exportStream(event).then(vidURL => {
      addVidToDom(vidURL).then(result => {
        dispatch({ type: "VIDEO_DATA", payload: result });       
      }).catch(e => {
        dispatch({ type: "VIDEO_DATA", payload: e});         
      })
    }).catch(e => {
      dispatch({ type: "VIDEO_DATA", payload: e});       
    })
  }
}



export const changeRecordButton = (clickedButton = 'begin') => {
    let newStart = false;
    let icons = []
    if(clickedButton === 'fiber_manual_record') icons = ['stop']
    if(clickedButton === 'stop') icons = ['refresh','cloud_download']
    if(clickedButton === 'refresh') { 
      icons = ['fiber_manual_record']
    }
    return {
      type: "UPDATE_RECORD_BUTTONS",
      payload: {icons, newStart}
    };
}
