import {inserCard,getAllCards} from '../api'
export const ADD_CARD = "AddCard"
export const INIT_CARDS = "InitCards"
export const REMOVE_CARD = "removeCard"

export function addCard(Question,Answer,deckID){
  let objDeck = inserCard(Question,Answer,deckID)
  return {
      type : ADD_CARD,
      data : objDeck
    }
}

 function initCards(items){
   return {
       type : INIT_CARDS,
       data : items
     }
 }

 export function removeCardItem(id){
  //removeDeck(id)
  return {
      type : REMOVE_CARD,
      data : id
    }
}

 export function handleInitCards(dispatch){
   getAllCards().then((items)=>{
         let rows = JSON.parse(items)
          dispatch(initCards(rows))
    })
  }
