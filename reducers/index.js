import {createStore,applyMiddleware,combineReducers} from 'redux'
import {decks} from './decks'
import {cards} from './cards'
import thunk from 'redux-thunk'

export default createStore(combineReducers({decks,cards}),applyMiddleware(thunk))
