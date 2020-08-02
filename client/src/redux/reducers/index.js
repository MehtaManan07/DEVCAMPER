import {combineReducers} from 'redux'
import {getBootcampsReducer} from './Bootcamps'

const rootReducer = combineReducers({
    listBootcamps: getBootcampsReducer
})
export default rootReducer