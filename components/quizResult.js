import React from 'react'
import {connect} from 'react-redux'
import {setQuizDone} from '../api'
import {Text,View,StyleSheet,TouchableHighlight} from 'react-native'
  
class QuizResult extends React.Component {

  componentDidMount(){
    setQuizDone()
  }
    render(){
      const {navigation,decks} = this.props
      const {totalCorrect,totalInCorrect,deckId} =  navigation.state.params
      return(
          <View style={styles.container}>
            <Text style={styles.title}>
                  Correct Answers {totalCorrect} 
            </Text>
            <Text style={styles.title}>
                  Incorrect Answers {totalInCorrect} 
                   </Text>
               <View style={{justifyContent:'flex-end'}}>
                 <TouchableHighlight onPress={()=>{
                       navigation.navigate('Details',{
                        deck:decks[deckId]
                       })
                 }}>
                  <View style={styles.button}>
                  <Text style={{color:"#ffffff"}}>
                    Back to deck
                  </Text>
                 </View>
             </TouchableHighlight>
             <TouchableHighlight  onPress={()=>{  navigation.goBack() }}>
                  <View style={styles.button}>
                  <Text style={{color:"#ffffff"}}>
                    Restart Quiz
                  </Text>
                 </View>
             </TouchableHighlight>
             </View>
       </View>
      )
    }
}

function mapStateToProps({decks}){
  return {decks:decks}
}

export default connect(mapStateToProps)(QuizResult)

export const configResult = ( navigation ) => {
  return {
    title:"Result",
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
    justifyContent:"space-around",
    alignItems:'center',
    padding:20
  },
    input:{
      margin:20,
      borderWidth:2,
       borderColor:'#000000', 
       borderRadius:5,
       height:50,
       width:300,
       padding:10,
       backgroundColor:'#ffffff',
       alignContent: 'center',
       alignItems:'center'
    },
    title:{
      fontSize:30,
      textAlign:'center'
    },
    button:{
      margin:10,
       backgroundColor:"#000000",
       width: 300,
       height:50,
       padding:15,
       alignItems:'center'
    }

})