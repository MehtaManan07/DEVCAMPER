import {combineReducers} from 'redux'
import {getBootcampsReducer} from './Bootcamps'
import { courseReducer } from './Courses'

const rootReducer = combineReducers({
    listBootcamps: getBootcampsReducer,
    courses: courseReducer
})
export default rootReducer