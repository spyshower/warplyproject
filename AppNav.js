import React from 'react'

import { createStackNavigator, createSwitchNavigator, createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';

import Welcome from './src/components/screens/Welcome'
import ListTab from './src/components/screens/ListTab'
import MapTab from './src/components/screens/MapTab'


const welcomeNavigator = createStackNavigator(
  {
    WelcomeScreen: {
      screen: Welcome,
      navigationOptions: {
        header: null,
      },
    },
  },
  {

  }
)

const tabNavigator = createMaterialTopTabNavigator(
  {
    TabOne: {
      screen: ListTab,
      navigationOptions: {
        tabBarLabel: 'List'
      }

    },
    TabTwo: {
      screen: MapTab,
      navigationOptions: {
        tabBarLabel: 'Map'
      }
    },
  },

  {
    tabBarOptions: {
      style: {
        paddingVertical: 4,
        backgroundColor: 'rgb(42,208,88)',
      },
      indicatorStyle: {
        height: 0
      },
    },
  }
)

const stackNavigator = createStackNavigator({
  first: {
    screen: tabNavigator,
    navigationOptions: {
      title: 'SuperCool app',
    }
  }
})

const Container = createSwitchNavigator(
  {
    Welcome: welcomeNavigator,
    Main: stackNavigator
  },
  {
    initialRouteName: 'Welcome',
  }
)



export default createAppContainer(Container)
