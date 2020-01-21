import React from 'react'
import {Text,FlatList,View,StyleSheet,TouchableHighlight} from 'react-native'
import { withNavigation} from 'react-navigation'

import {connect} from 'react-redux'
  
class List extends React.Component {
  componentDidMount(){
  }


    render(){
      const {decks} = this.props
      const items  = []
      for (key in decks) {
      items.push(decks[key])
      }

    return(    
      (items &&
          <FlatList data={items} renderItem={({item})=>{
               return  <TouchableHighlight onPress={()=> this.props.navigation.navigate('Details',{
                deck:item
               })} >
                 <View style={styles.row} key={item.id}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.desc}>cards {item.cards && item.cards.length}</Text>
                  </View> 
                  </TouchableHighlight>
             }}/> )
           )
    }
}

function mapStateToProps(state){
   return {decks:state.decks}
}
export default withNavigation(connect(mapStateToProps)(List))

const styles = StyleSheet.create({
    row:{
       flex:1,
       justifyContent:'center',
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
    }

})