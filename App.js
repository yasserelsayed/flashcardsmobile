import React from 'react'
import { View} from 'react-native'
import { createAppContainer} from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import { Ionicons } from '@expo/vector-icons'
import QuizScreen,{configQuiz} from './components/quiz'
import QuizResultScreen,{configResult} from './components/quizResult'
import AddNewScreen from './components/addNew'
import AddCardScreen,{cardConfig} from './components/addCard'
import HomeScreen,{homeConfig} from './components/home'
import DeckDetails,{config} from './components/deckDetails'
import Store from './reducers'
import {Provider} from 'react-redux'
import {getQuizDone} from './api'
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';


export default class App extends React.Component {

  createNotification () {
    return {
      title: 'let s practice quiz',
      body: "👋don't forget to practice your quizzes today!",
      ios: {
        sound: true,
      },
      android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true,
      }
    }
  }

  setLocalNotification() {
    Permissions.askAsync(Permissions.NOTIFICATIONS).then((state)=>{
      const { status } = state
      if(status ==='granted'){
        Notifications.cancelAllScheduledNotificationsAsync()
        Notifications.scheduleLocalNotificationAsync(
          this.createNotification(),
          { time: ((new Date()).getTime() + 1000)}
        )
       }
      })
    }

    componentDidMount(){
      getQuizDone((noQuizToday)=>{
       if(noQuizToday)
       this.setLocalNotification()
      })
    }
    
  

  render() {
    return (
        <View style={{flex: 1}}>
          <Provider store = {Store}>
            <Screens />
          </Provider>
        </View>
    )
  }
}

const Screens  = createAppContainer(createStackNavigator({
  Home:{
    screen:createBottomTabNavigator({
      List: HomeScreen,
      AddNew: AddNewScreen
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        title:navigation.state.routeName==="List"?"Decks":"Add Deck", 
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          let IconComponent = Ionicons;
          let iconName;
          if (routeName === 'List') {
            iconName = `ios-wallet`;
          } else if (routeName === 'AddNew') {
            iconName = `ios-add-circle-outline`;
          }
          return <IconComponent name={iconName} size={25} color={tintColor} />;
        },
      }),
      tabBarOptions: {
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
        style: { backgroundColor: "#f7f7f7" } 
      }
    }),
    navigationOptions : ({ navigation }) => homeConfig(navigation)
  },
  Details:{
    screen: DeckDetails,
    navigationOptions :({ navigation })=>config(navigation)
  },
  AddCard:{
    screen: AddCardScreen,
    navigationOptions :({ navigation })=>cardConfig(navigation)
  },
  Quiz:{
    screen: QuizScreen,
    navigationOptions :({ navigation })=>configQuiz(navigation)
  },
  QuizResult:{
    screen: QuizResultScreen,
    navigationOptions :({ navigation })=>configResult(navigation)
  }
 }))

