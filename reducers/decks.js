import {ADD_DECKACTION,INIT_DECKS,REMOVE_DECK} from '../actions/decks'
import {ADD_CARD} from '../actions/cards'

export function decks(state={},action){
      switch(action.type){
           case ADD_DECKACTION:
               return {
                   ...state,
                   [action.data.id]:action.data
               }
               case INIT_DECKS:
                return {
                    ...state,
                    ...action.data
                }
                case REMOVE_DECK:
                    return (()=>{
                       let res = {}
                       for (const key in state) 
                             if (key !== action.data)
                                 res = {...res,[key]:state[key]}
                         return res
                    })()
                    case ADD_CARD:
                        return (()=>{
                             state[action.data.deckID].cards.push(action.data.id)
                             return {...state}
                        })()
           default:return state    
      }
}