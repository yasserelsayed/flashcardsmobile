import React from 'react'
import {addDeck} from '../actions/decks'
import {connect} from 'react-redux'

import {Text,View,StyleSheet,TextInput,KeyboardAvoidingView,TouchableHighlight} from 'react-native'
  
class AddNew extends React.Component {

  titleInput = null
  add = ()=>{
    if(this.titleInput){
      this.props.dispatch(addDeck(this.titleInput))
      this.props.navigation.goBack()
      this.titleInput = ""
    }else alert('Deck title required')
   }

    render(){
     
      return(
        <KeyboardAvoidingView style={{flex:1}}>
          <View style={styles.container}>
            <Text style={styles.title}>
              What is the title of your new deck ?? 
            </Text>
            <View style={{flex:3}}>
               <TextInput    onChangeText={(text) => this.titleInput = text} style={styles.input}/>
               </View>
                 <TouchableHighlight onPress={this.add}>
                  <View style={styles.button}>
                  <Text style={{color:"#ffffff"}}>
                    Create Deck
                  </Text>
                 </View>
             </TouchableHighlight>
       </View>
      </KeyboardAvoidingView>
      )
    }
}

export default connect()(AddNew)

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
       backgroundColor:"#000000",
       width: 300,
       height:50,
       padding:15,
       alignItems:'center'
    }

})