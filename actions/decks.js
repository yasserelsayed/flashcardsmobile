import {insertDeck,getAllDecks,removeDeck} from '../api'
export const ADD_DECKACTION = "AddDeck"
export const INIT_DECKS = "InitDecks"
export const REMOVE_DECK = "removeDeck"

export function addDeck(title){
 let objDeck = insertDeck(title)
  return {
      type : ADD_DECKACTION,
      data : objDeck
    }
}

 function initDecks(items){
   return {
       type : INIT_DECKS,
       data : items
     }
 }

 export function removeDeckItem(id){
  removeDeck(id)
  return {
      type : REMOVE_DECK,
      data : id
    }
}

 export function handleInitDecks(dispatch){
   getAllDecks().then((items)=>{
         let rows = JSON.parse(items)
         dispatch(initDecks(rows))
    })
  }
