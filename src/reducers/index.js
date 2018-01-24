import { combineReducers } from 'redux';
import nav from './nav'
import app from './app'
import auth from '../views/Login/reducers'
import policy from '../views/Locker/reducers'

export default combineReducers({
    app,
    nav,
    auth,
    policy
});
