import {ADD_CARD,INIT_CARDS,REMOVE_CARD} from '../actions/cards'

export function cards(state={},action){
      switch(action.type){
           case ADD_CARD:
               return {
                   ...state,
                   [action.data.id]:action.data
               }
               case INIT_CARDS:
                return {
                    ...state,
                    ...action.data
                }
                case REMOVE_CARD:
                    return (()=>{
                       let res = {}
                       for (const key in state) 
                             if (key !== action.data)
                                 res = {...res,[key]:state[key]}
                         return res
                    })()
           default:return state    
      }
}