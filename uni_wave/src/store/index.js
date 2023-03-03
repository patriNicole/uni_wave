import {createStore,compose,combineReducers,applyMiddleware} from 'redux';

import thunkMiddleware from 'redux-thunk';

//import the reducer
import { authReducer } from './reducers/authReducer.js';
import { messengerReducer } from './reducers/messangerReducer.js';
import { teachingReducer } from './reducers/teachingReducer.js';

//the reducer
const rootReducer = combineReducers({
    auth: authReducer,
    messenger : messengerReducer,
    teaching: teachingReducer
})

const middleware = [thunkMiddleware];

const store = createStore(rootReducer,compose(applyMiddleware(...middleware),
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
));

export default store;