import {
    LOAD_SKILL_GRAMMAR,
    LOAD_SKILL_WRITING,
    LOAD_SKILL_VOCABULARY,
    LOAD_SKILL_SPEAKING,
    LOAD_SKILL_LISTENING,
    LOAD_SKILL_READING,
    LOAD_SKILL_PRONUNCIATION,
    LOAD_SKILL_MINITEST
} from "../../actions/Student/types"

const data = {
    //count : 0,
    isLoadding: true,
    ListGrammar: null,
    ListWriting: null,
    ListSpeaking: null,
    ListVocabulary: null,
    ListReading: null,
    ListListening: null,
    ListPronunciation: null,
    ListMiniTest:null,
}

export default function LoadAPIFreeLearning(state = data, action) {
    switch (action.type) {
        case LOAD_SKILL_GRAMMAR:
            data.ListGrammar = action.data;
            return {
                ...state,
                ListGrammar: action.data,
            };
        case LOAD_SKILL_WRITING:
            data.ListWriting = action.data;
            return {
                ...state,
                ListWriting: action.data,
            };
        case LOAD_SKILL_SPEAKING:
            data.ListSpeaking = action.data;
            return {
                ...state,
                //count: data.count + 1,
                ListSpeaking: action.data,
                //isLoadding : false,
            };
        case LOAD_SKILL_VOCABULARY:
            data.ListVocabulary = action.data;
            return {
                ...state,
                //count: data.count + 1,
                ListVocabulary: action.data,
                //isLoadding : false,
            };
        case LOAD_SKILL_READING:
            data.ListReading = action.data;
            return {
                ...state,
                //count: data.count + 1,
                ListReading: action.data,
                //isLoadding : false,
            };
        case LOAD_SKILL_LISTENING:
            data.ListListening = action.data;
            return {
                ...state,
                isLoadding: false,
                ListListening: action.data,
            };
        case LOAD_SKILL_PRONUNCIATION:
            data.ListPronunciation = action.data;
            return {
                ...state,
                isLoadding: false,
                ListPronunciation: action.data,
            };
        case LOAD_SKILL_MINITEST:
            data.ListMiniTest = action.data;
            return {
                ...state,
                isLoadding:false,
                ListMiniTest:action.data,
            }
        default: return state;
    }
}