import React from 'react'
import {connect} from 'react-redux'

import {Text,View,StyleSheet,TouchableHighlight} from 'react-native'
  
class Quiz extends React.Component {

    state = {
        answerStatus:false,
        activeCard:0,
        totalCorrect:0,
        totalInCorrect:0
    }

  swichFormStarus=()=>{
     this.setState((state)=>({answerStatus:!state.answerStatus}))
  }


  moveToNextQuestion=(IsCorrect)=>{
     const {navigation,decks} = this.props
    if(IsCorrect)
          this.state.totalCorrect++
    else  this.state.totalInCorrect++
     let item = decks[navigation.state.params.deckId] 
     if(this.state.activeCard<(item.cards.length-1))
         this.setState((state)=>({activeCard:state.activeCard+1}))
      else navigation.navigate('QuizResult',{
        deckId:item.id,
        totalCorrect:this.state.totalCorrect,
        totalInCorrect:this.state.totalInCorrect
      })
  }

    render(){

      this.props.navigation.addListener(
        'didFocus',
           payload => {
            this.setState((state)=>( {
              answerStatus:false,
              activeCard:0,
              totalCorrect:0,
              totalInCorrect:0
          }))
            }
      );

        const {navigation,decks,cards} = this.props
        let item = decks[navigation.state.params.deckId] 
        let card = null
        card = cards[item.cards[this.state.activeCard]]
        this.state.max = item.cards.length
      return( 
        <View style={styles.container}> 
         <View style={styles.header}>
      <Text style={[{fontSize:20,margin:15}]}>{this.state.activeCard+1+'/'+(item.cards?item.cards.length:"0")}</Text>
           </View> 
           <View style={styles.row}>
              <Text style={styles.title}>{this.state.answerStatus?card.answer:card.question}</Text>
              <TouchableHighlight onPress={this.swichFormStarus}>
             <Text style={styles.desc}>{this.state.answerStatus?"Question":"Answer"}</Text>
             </TouchableHighlight>
           </View> 
           <View style={styles.actions}>
           <TouchableHighlight onPress={()=>{this.moveToNextQuestion(true)}} >
                  <View style={[styles.button,styles.buttonCorrect]}>
                  <Text style={{color:"#ffffff"}}>
                   Correct
                  </Text>
                 </View>
             </TouchableHighlight>
             <TouchableHighlight onPress={()=>{this.moveToNextQuestion(false)}} >
                  <View style={[styles.button,styles.buttonInCorrect]}>
                  <Text style={{color:"#ffffff"}}>
                   InCorrect
                  </Text>
                 </View>
             </TouchableHighlight>
           </View>
        </View> 
      )
    }
}

function mapStateToProps(state){
  return {decks:state.decks,cards:state.cards}
}

export default connect(mapStateToProps)(Quiz)

export const configQuiz = ( navigation ) => {
  return {
    title:"Quiz",
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
     justifyContent:'center',
     padding:30,
     alignContent: 'center',
     alignItems:'center'
  },
  header:{
    flex:.5,
    alignContent: 'flex-start',
    alignItems:'flex-start'
 },
  title:{
    fontSize:40,
    color:'#000000'
  },
  desc:{
    margin:20,
    fontSize:20,
    fontWeight: 'bold',
    color:'red'
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
     borderRadius:4
  },
  buttonCorrect:{
    backgroundColor:"green",
 },
 buttonInCorrect:{
  backgroundColor:"red"
}
})