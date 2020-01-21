import React from 'react'
import {connect} from 'react-redux'
import {removeDeckItem} from '../actions/decks'

import {Text,View,StyleSheet,TextInput,KeyboardAvoidingView,TouchableHighlight, Button} from 'react-native'
  
class DeckDetails extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.deck.title
    }
  }



  remove = ()=>{
    const {id} = this.props.navigation.state.params.deck
    this.props.dispatch(removeDeckItem(id))
    this.props.navigation.goBack()
  }

    render(){
     const {navigation,decks} = this.props
      let item = decks[navigation.state.params.deck.id] 
      if(!item)  return (<View></View>)
      return( 
        <View style={styles.container}> 
           <View style={styles.row}>
              <Text style={styles.title}>{item.title}</Text>
             <Text style={styles.desc}>cards {item.cards && item.cards.length}</Text>
           </View> 
           <View style={styles.actions}>
           <TouchableHighlight onPress={()=> this.props.navigation.navigate('AddCard',{
                deck:item
               })} >
                  <View style={[styles.button,styles.buttonAdd]}>
                  <Text style={{color:"#000000"}}>
                    Add card
                  </Text>
                 </View>
             </TouchableHighlight>
             <TouchableHighlight onPress={()=>{
               if(item.cards.length>0)  this.props.navigation.navigate('Quiz',{ deckId:item.id})
               else alert("Sorry you can't take quiz because there are no cards in the deck")
               }}>
                  <View style={[styles.button,styles.buttonQuiz]}>
                  <Text style={{color:"#ffffff"}}>
                    Start Quiz
                  </Text>
                 </View>
             </TouchableHighlight>
             <TouchableHighlight onPress={this.remove} style={{margin:15}}>
                  <Text style={{color:"red"}}>
                   Delete Deck
                  </Text>
             </TouchableHighlight>
           </View>
        </View> 
      )
    }
}

function mapStateToProps(state){
  return {decks:state.decks}
}

export default connect(mapStateToProps)(DeckDetails)

export const config = ( navigation ) => {
  return {
    headerTitleAlign:'center',
    headerTintColor:'white',
    headerStyle: {
      backgroundColor: 'blue'
    },
    headerTitleStyle: { color: 'white' }
  }
}

const styles = StyleSheet.create({
  container:{
     flex:1,
     justifyContent:'center'
  },row:{
     flex:1,
     justifyContent:'flex-start',
     padding:30,
     alignContent: 'center',
     alignItems:'center'
  },
  title:{
    fontSize:25,
    color:'#000000'
  },
  desc:{
    margin:20,
    fontSize:15,
    color:'#808080'
  },
  actions:{
     flex:1,
     justifyContent:'flex-end',
     alignItems:'center',
     padding:30
  },
  button:{
    width: 300,
    height:60,
    padding:20,
    margin:10,
    alignItems:'center',
     borderWidth:2,
     borderRadius:4
  },
  buttonQuiz:{
    backgroundColor:"#000000",
 },
 buttonAdd:{
  backgroundColor:"#ffffff"
}
})