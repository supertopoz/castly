export function addWords(words = '') {	
    return {
        type: "ADD_WORDS",
        payload: words
    };
}

export function reset(options) {  
    return {
        type: "RESET",
        payload: options
    };
}

export function wordListCategory(type) {	
    return {
        type: "WORD_LIST_TYPE",
        payload: type
    };
}

export function wordFromList(wordIndex) {	
    return {
        type: "WORD_FROM_LIST",
        payload: wordIndex
    };
}

export function convertWordToDashes(currentWord = '') {	
    return {
        type: "CONVERT_WORD_TO_DASHES",
        payload: currentWord
    };
}

export function getLetter(letter = '') {	
    return {
        type: "GET_LETTER",
        payload: letter
    };
}

export function letterCheckInsert() {   
    return {
        type: "LETTER_CHECK_INSERT",
        payload: true
    };
}

export function reachedEnd() {	
    return {
        type: "REACHED_END_OF_LIST",
        payload: true
    };
}