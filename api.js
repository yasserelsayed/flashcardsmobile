import { AsyncStorage } from 'react-native'
const STORAGEDECKS = 'KEY_Decks'
const STORAGECARDS = 'KEY_Cards'
const STORAGEQUIZDONE='KEY_Done'

 export function insertDeck (title) {
      let id =  generateID()
      AsyncStorage.mergeItem(STORAGEDECKS, JSON.stringify({
        [id]:{id,title,cards:[]}
      }))
      return {id,title,cards:[]}
  }

  export function inserCard (question,answer,deckID) {
    let id =  generateID()
    AsyncStorage.mergeItem(STORAGECARDS, JSON.stringify({
      [id]:{id,question,answer,deckID}
    }))
    updateDeck(id,deckID)
    return {id,question,answer,deckID}
}

export function setQuizDone () {
 let day =  getDayOfYear()
 AsyncStorage.getItem(STORAGEQUIZDONE).then((items)=>{
     itms =    JSON.parse(items)
    if(!itms) 
    return  AsyncStorage.setItem(STORAGEQUIZDONE,JSON.stringify([day]))
     if (!itms.includes(day)){
      itms = itms.concat(day)
    return  AsyncStorage.setItem(STORAGEQUIZDONE, JSON.stringify(itms))
    }
 })
}

export function getQuizDone (callBack) {
  let day =  getDayOfYear()
  return AsyncStorage.getItem(STORAGEQUIZDONE).then((items)=>{
    itms =    JSON.parse(items)
     ret = true 
     if(itms)
     ret =!itms.includes(day)
     return callBack(ret)
   })
  }

  function getDayOfYear(){
    var now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  var diff = now - start;
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);
     return day
  }



  export function getAllDecks () {
      return AsyncStorage.getItem(STORAGEDECKS)
   }

   export function getAllCards () {
    return AsyncStorage.getItem(STORAGECARDS)
 }

  function updateDeck(cardID,deckID) {
    AsyncStorage.getItem(STORAGEDECKS)
     .then((results)=>{
      const  data =  JSON.parse(results)
      data[deckID].cards.push(cardID)
      AsyncStorage.setItem(STORAGEDECKS,JSON.stringify(data))
    })
  }

 
   
export function removeDeck (id) {
  AsyncStorage.getItem(STORAGEDECKS)
  .then((results)=>{
   const  data =  JSON.parse(results)
   data[id] = undefined
   delete  data[id] 
    AsyncStorage.setItem(STORAGEDECKS,JSON.stringify(data))
  })
}

 function generateID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}
