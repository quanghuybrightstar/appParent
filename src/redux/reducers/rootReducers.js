import { combineReducers } from 'redux';
import listening9Reducers from './listening9Reducers';
import pronunciationF11Reducer from './pronunciationF11Reducer';
import readingF4Reducer from './readingF4Reducer';
import readingD12Reducer from './readingD12Reducer';
import readingD11Reducer from './readingD11Reducer';
import readingD7Reducer from './readingD7Reducer';
import readingF6Reducer from './readingF6Reducer';
import readingF2Reducer from './ReadingF2Reducer';
import readingF14Reducer from './readingF14Reducer';
import readingD7NewReducer from './readingD7NewReducer';
import vocabularyReducers from './vocabulary';
import reading8Reducer from './readingD8Reducer';
import reading9Reducer from './readingD9Reducer';
import reading10Reducer from './readingD10Reducers';
import readingD13Reducer from './readingD13Reducer';
import listening8Reducer from './listening8Reducer';
import listenningD6Reducer from './listenningD6Reducer';
import GrammarD5Reducer from './GrammarD5Reducer';
import WrittingD5Reducer from './WrittingD5Reducer';
import TesttingReducer from './TestingReducer';
import Reading11NewReducer from './reading11NewReducer';
import reading13NewReducer from './reading13NewReducer';
import timegiaobai from './timegiaobai';
import AuthStackReducer from './AuthStackReducer';
import LoginDataReducer from './LoginDataReducer'
import hoanthanhReducer from './hoanthanhReducer';
import ListStudentReducer from "./ListStudentReducer";
import ListeningD1Reducer from "./ListeningD1Reducer";
import ListeningD2Reducer from "./ListeningD2Reducer";
import ListeningD3Reducer from "./ListeningD3Reducer";
import ListeningD4Reducer from "./ListeningD4Reducer";
import GrammarD1Reducer from "./GrammarD1Reducer";
import GrammarD2Reducer from "./GrammarD2Reducer";
import GrammarD3Reducer from "./GrammarD3Reducer";
import GrammarD4Reducer from "./GrammarD4Reducer";
import GrammarD6Reducer from "./GrammarD6Reducer";
import GrammarD7Reducer from "./GrammarD7Reducer";
import GrammarD8Reducer from "./GrammarD8Reducer";
import GrammarD9Reducer from "./GrammarD9Reducer";
import GrammarD10Reducer from "./GrammarD10Reducer";
import GrammarD11Reducer from "./GrammarD11Reducer";
import GrammarD12Reducer from "./GrammarD12Reducer";
import GrammarD13Reducer from "./GrammarD13Reducer";
import GrammarD14Reducer from "./GrammarD14Reducer";
import WrittingD1Reducer from "./WrittingD1Reducer";
import WrittingD2Reducer from "./WrittingD2Reducer";
import WrittingD3Reducer from "./WrittingD3Reducer";
import WrittingD4Reducer from "./WrittingD4Reducer";
// phan hoc vien
import LoadAPILogin from '../../ReduxStudent/reducers/Student/LoadAPILogin';
import LoadAPIInboxHV from '../../ReduxStudent/reducers/Student/LoadAPIInboxHV';
import LoadAPIInboxDetailHV from '../../ReduxStudent/reducers/Student/LoadAPIInboxDetailHV';
import LoadAPISkillUnitHV from '../../ReduxStudent/reducers/Student/LoadAPISkillUnit';
import LoadAPIProfileHV from '../../ReduxStudent/reducers/Student/LoadAPIProfileHV';
import LoadAPIByClassHV from '../../ReduxStudent/reducers/Student/LoadAPIByClass';
import LoadAPIFreeLearningHV from '../../ReduxStudent/reducers/Student/LoadAPIFreeLearning';
import LoadAPIFunctionHV from '../../ReduxStudent/reducers/Student/LoadAPIFunctionScreen';
import ListeningD5Reducer from './ListeningD5Reducer';
import ListeningD7Reducer from './ListeningD7Reducer';
import FavoriteCurriculumReducer from './FavoriteCurriculumReducer';
import { LanguageStackReducer } from "./AppLanguage";
import AssignManagentReducer from './AssignManagentReducer'
import AssignReducer from './AssignReducer'
import FilterReducer from './FilterReducer';
import ModalReducer from './ModalReducer';
import ManageChildrenReducer from './Parent/ManageChildren';
const rootReducer = combineReducers({
  pronunciationF11Reducer,
  readingF4Reducer,
  readingD12Reducer,
  readingD11Reducer,
  vocabularyReducers,
  readingD7Reducer,
  reading8Reducer,
  reading9Reducer,
  reading10Reducer,
  listening9Reducers,
  listening8Reducer,
  listenningD6Reducer,
  GrammarD5Reducer,
  WrittingD5Reducer,
  TesttingReducer,
  Reading11NewReducer,
  readingD7NewReducer,
  readingD13Reducer,
  readingF6Reducer,
  readingF2Reducer,
  readingF14Reducer,
  reading13NewReducer,
  timegiaobai,
  AuthStackReducer,
  LoginDataReducer,
  hoanthanhReducer,
  ListStudentReducer,
  FavoriteCurriculumReducer,
  AssignManagentReducer,
  // reducer Student
  LoadAPILogin,
  LoadAPIInboxHV,
  LoadAPIInboxDetailHV,
  LoadAPISkillUnitHV,
  LoadAPIProfileHV,
  LoadAPIByClassHV,
  LoadAPIFreeLearningHV,
  LoadAPIFunctionHV,
  ListeningD1Reducer,
  ListeningD2Reducer,
  ListeningD3Reducer,
  ListeningD4Reducer,
  ListeningD5Reducer,
  ListeningD7Reducer,
  GrammarD1Reducer,
  GrammarD2Reducer,
  GrammarD3Reducer,
  GrammarD4Reducer,
  GrammarD13Reducer,
  GrammarD6Reducer,
  GrammarD7Reducer,
  GrammarD8Reducer,
  GrammarD9Reducer,
  GrammarD10Reducer,
  GrammarD11Reducer,
  GrammarD12Reducer,
  GrammarD14Reducer,
  WrittingD1Reducer,
  WrittingD2Reducer,
  WrittingD3Reducer,
  WrittingD4Reducer,
  LanguageStackReducer,
  AssignReducer,
  FilterReducer,
  ModalReducer,
  ManageChildrenReducer
});

export default rootReducer;
