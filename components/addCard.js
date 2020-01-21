import React from 'react'
import {addCard} from '../actions/cards'
import {connect} from 'react-redux'

import {Text,View,StyleSheet,TextInput,KeyboardAvoidingView,TouchableHighlight} from 'react-native'
  
class AddCard extends React.Component {

  questionInput = null
  answerInput = null
  add = ()=>{
    if(this.questionInput && this.answerInput){
      const {id} = this.props.navigation.state.params.deck
      this.props.dispatch(addCard(this.questionInput,this.answerInput,id))
      this.props.navigation.goBack()
    }else alert('Question and Answer required')
   }

    render(){
     
      return(
        <KeyboardAvoidingView style={{flex:1}}>
          <View style={styles.container}>
            <View style={{flex:3}}>
               <TextInput  placeholder="Question"    onChangeText={(text) => this.questionInput = text} style={styles.input}/>
               <TextInput  placeholder="Answer"   onChangeText={(text) => this.answerInput = text} style={styles.input}/>
               </View>
                 <TouchableHighlight onPress={this.add}>
                  <View style={styles.button}>
                  <Text style={{color:"#ffffff"}}>
                   Submit
                  </Text>
                 </View>
             </TouchableHighlight>
       </View>
      </KeyboardAvoidingView>
      )
    }
}

export const cardConfig = ( navigation ) => {
  return {
    title:"Add Card",
    headerTitleAlign:'center',
    headerTintColor:'white',
    headerStyle: {
      backgroundColor: 'blue'
    },
    headerTitleStyle: { color: 'white' }
  }
}

export default connect()(AddCard)

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
    button:{
       backgroundColor:"#000000",
       width: 300,
       height:50,
       padding:15,
       alignItems:'center'
    }

})