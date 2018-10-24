import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import sinon from 'sinon'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
import { JSDOM } from "jsdom"
const dom = new JSDOM()

import * as actions from "./canvasRecordingActions";



const initialState = {
  audioCtx: null,
  dataStream: null,
  recorder: null,
  recordingData: null,
  canvasImage: null,
  videoData: null
}

let store

describe.skip('Adding video to dom after creating it using media stream', () => {

  beforeAll(() => {
    global.document = dom.window.document
    global.window = dom.window    
    let video = document.createElement('video')
    video.id = 'vid-holder'
    document.body.appendChild(video)
    global.Blob = function Blob(params) {return params}
    const url = 'blob:http://localhost:1234/2fd6e2a0-25c4-4e52-a234-59cfb44b55b4p'
    window.URL.createObjectURL = sinon.stub().returns(url)
    window.URL.revokeObjectURL = sinon.stub().returns({})
  })

  beforeEach(() => store = mockStore({ initialState }))

  it("handles export video stream to a videoURL", async () => {
    const data = { currentTarget: { chunks:[' '] } };
    let result =  actions.exportStream(data).then(result => result).catch(e => e)
     expect(await result).toEqual('blob:http://localhost:1234/2fd6e2a0-25c4-4e52-a234-59cfb44b55b4p');
    })

  it("handles export video stream when theres no stream", async () => {    
    let result = actions.exportStream().then(result => result).catch(e => e)
    expect(await result).toEqual('failed')
  })  
  it("handles adding video to the dom", async () => {  
    const vidURL = 'blob:http://localhost:1234/2fd6e2a0-25c4-4e52-a234-59cfb44b55b4p';
    let testVideo = document.createElement('video');
    testVideo.className = 'recordedVid';
    testVideo.controls = true;
    testVideo.src = vidURL;
    testVideo.style.width = '300px';

    let result = actions.addVidToDom(vidURL).then(result => result).catch(e => e)
    expect(await result).toEqual(testVideo)
  })

    it('should dispatch actions of set audio context', () => {
    const expectedActions = [ {type: "SET_AUDIO_CONTEXT", payload: {}} ]
    const data = {}
    store.dispatch(actions.setAudioContext(data))
    expect(store.getActions()).toEqual(expectedActions)
  })    
  it('should dispatch actions to export video', async () => {
    const expectedActions = [{type: "VIDEO_DATA", payload: {}}]
    const data = {}
    store.dispatch(actions.exportExample(data))
    expect(await store.getActions()).toEqual(expectedActions)
  })
})

