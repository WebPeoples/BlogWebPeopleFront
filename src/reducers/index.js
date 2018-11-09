import { combineReducers } from 'redux'

import NovoArtigoReducer from './NovoArtigoReducer'
import UserReducer from './UserReducer'

export default combineReducers({
    NovoArtigoReducer,
    UserReducer
});