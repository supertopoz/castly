export const setAudioContext = context => {	
    return {
        type: "SET_AUDIO_CONTEXT",
        payload: context
    };
}

  const cloneCanvas = (oldCanvas, x, y) => {
    // This is the displayed canvas
    const newCanvas = window.document.getElementById('canvas2');
    const context = newCanvas.getContext('2d');
    newCanvas.width = x// 700//oldCanvas.width /2;
    newCanvas.height = y//394//oldCanvas.height /2;
    context.drawImage(oldCanvas, 0, 0, newCanvas.width, newCanvas.height);
//context.scale(0.5,0.5)
  }

export const canvasVideoAnimation = (video, resize) => {    

    var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    const width = (x/100)*90//oldCanvas.width /2;
    const height = (width)*0.5625394//oldCanvas.height /2;


      const canvas = window.document.getElementById('canvas');
      const ctx = canvas.getContext('2d'); 
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
      ctx.restore();
      const draw = () => { 
        window.requestAnimationFrame(draw); 
        ctx.fillRect(0, 0, ctx.height, ctx.width); 
        ctx.fillStyle = '#03A9F4';    
        ctx.drawImage(video, video.details.x, video.details.y, video.details.width, video.details.height); 
        if(resize){
          ctx.drawImage(resize, (video.details.x + video.details.width), (video.details.y + video.details.height), 40, 40)
        }      
        cloneCanvas(canvas, width, height)
    };
    draw();
  }

export function initializeUserMedia() {	

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
      window.navigator.mediaDevices.getUserMedia({
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

const createCorner =() =>{
    return new Promise((resolve, reject) => {
      const corner = new Image()
      corner.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACiSURBVDiN5dQxCsMwDIXhpNcSOkfIZHLi4CwxOYVHTf47mzppLTIU8sYH+kAgNAIMN+Z1J/Z/YEppCCHUJc4cx4Gqsq5r1bvAM8wFXmHdYAsrpfjAFhZjZJqmfrCFbduGiLDvex/Yg30Fe7FL0IOdgl6sCf6KlVLIOZNzrk5n8GAAZoaIICKYWRtcloUYYzU4zzMppY/VzAxVRVUrcISnPdg3D5nIVm+mB9cAAAAASUVORK5CYII=';
      corner.addEventListener('load', function(){
        resolve(corner)
      })
    }).catch(e => reject(e))
  }


const intilizeUserMedia = () => {
 getUserStream().then(stream => {
  createVideo(stream).then((video) =>{
    showVideo(video, stream).then((video) => {
      injectNewAudio(video, stream).then(dataStream => {
        // Add video to store. then start animation.
        createCorner().then(corner => {
          video.details = {
          width: video.videoWidth/1.3,
          height:video.videoHeight/1.3,
          originalWidth: video.videoWidth/1.3,
          originalHeight: video.videoHeight/1.3,
          ratio: ()=> this.originalHeight/this.originalWidth,
          x: 0,
          y: 0
        }
 
        canvasVideoAnimation(video, corner)
        dispatch({
          type: "INITILIZE_USER_MEDIA",
          payload:[dataStream, audioCtx, video]
        });
        })
      }).catch(err=>{
       	dispatch({
          type: "INITILIZE_USER_MEDIA",
        	payload:[err, err, err]
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
    const canvas = window.document.getElementById('canvas');
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
      vid.style.width = '300px';
      vid.onend = function() { URL.revokeObjectURL(vidURL)}
      videoHolder.appendChild(vid);
      resolve(vid)
      })
    }




export const exportStream = (event = {}) => {
    return new Promise((resolve, reject)=>{
      if (event.currentTarget && event.currentTarget.chunks.length) {
        const blob = new Blob(event.currentTarget.chunks)
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
