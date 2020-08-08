import {combineReducers} from 'redux'
import {getBootcampsReducer} from './Bootcamps'
import { courseReducer } from './Courses'
import { userReducer } from './Users'

const rootReducer = combineReducers({
    listBootcamps: getBootcampsReducer,
    courses: courseReducer,
    user: userReducer
})
export default rootReducer