import castly from './castlyReducer';


const initialState = {
    images: [],
    currentImage: null,
    mouse: [],
    dragging: false,
    resize: null,
    imageStage: {x: 10, y: 10, width: 1280, height: 720}
}

 const targetStateAddWords = {
        images: [],

      } 


 const image1 = {
    lastModified: 1537480690000,
    lastModifiedDate: 'Fri Sep 21 2018 06:58:10 GMT+0900 (Korean Standard Time) {}',
    name: "Image6.jpg",
    preview: "blob:http://localhost:1234/09934542-6325-4ace-abea-e265bb9ab5d7",
    size: 4648,
    type: "image/jpeg",
    webkitRelativePath: "",
  }

 const image2 = {
    lastModified: 1537480690000,
    lastModifiedDate: 'Fri Sep 21 2018 06:58:10 GMT+0900 (Korean Standard Time) {}',
    name: "Image10.jpg",
    preview: "blob:http://localhost:1234/fb8d6a28-3276-413a-be18-33b900b0703d",
    size: 6613,
    type: "image/jpeg",
    webkitRelativePath: "",
 }

const images = [image1, image2]

describe('castly reducer', () => {
  it('should return the initial state', () => {
    expect(castly(undefined, {})).toEqual(initialState)
  })
  it('should handle ADD_IMAGES', () => {
    const initialState = { images: [] }
    const targetState = { images: images}
    expect(castly(initialState, { type: 'ADD_IMAGES', payload: images }))
    .toEqual(targetState)
  })  
  it('should handle CURRENT_IMAGE', () => {
    const initialState = { currentImage: null}
    const targetState = { currentImage: image1}
    expect(castly(initialState, { type: 'CURRENT_IMAGE', payload: image1 }))
    .toEqual(targetState)
  })  
  it('should handle IMAGE_STAGE_DETAILS', () => {
    const payload = {x: 20, y: 20, width: 1280, height: 720}
    const initialState = { imageStage: {x: 10, y: 10, width: 1280, height: 720}}
    const targetState = { imageStage: {x: 20, y: 20, width: 1280, height: 720}}
    expect(castly(initialState, { type: 'IMAGE_STAGE_DETAILS', payload}))
    .toEqual(targetState)
  })  
  it('should handle RESIZE', () => {
    const payload = {image:''}
    const initialState = { resize: null}
    const targetState = { resize: {image: ''}}
    expect(castly(initialState, { type: 'RESIZE', payload}))
    .toEqual(targetState)
  })  
})