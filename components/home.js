import React from 'react'
import {Text,View} from 'react-native'
import {handleInitDecks} from '../actions/decks'
import {handleInitCards} from '../actions/cards'
import {connect} from 'react-redux'
import ListScreen from './list'
  
class Home extends React.Component {
      componentDidMount(){
         this.props.dispatch(handleInitDecks)
         this.props.dispatch(handleInitCards)
         }
         
    render(){
      return(
          <View style={{flex: 1}}>
              <ListScreen />
          </View>
        )
    }
}

export default connect()(Home)

export const homeConfig = ( navigation ) => {
  return {
    title:"",
    headerStyle: {
      backgroundColor: 'blue'
    }
  }
}

