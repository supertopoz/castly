import * as actions from "./castlyActions";

describe('hangman actions', () => {
  it('should create an action to add new words', () => {
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
    const expectedAction = { type: 'ADD_IMAGES', payload: images}
    expect(actions.addImages(images)).toEqual(expectedAction)
  })
})
