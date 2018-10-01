
import react from 'react';
import {createStackNavigator,createBottomTabNavigator ,StackNavigator,TabNavigator,TabBarBottom,TabBarTop,createSwitchNavigator} from 'react-navigation';
import signUpForm from './Scenes/Components/signUpForm'
import SignInForm from './Scenes/Components/SignInForm'
import MyList from './Scenes/MyList'
import NewTask from './Scenes/Components/NewTask'

// * AUTHENTICATION STACK NAVIGATOR
/*
export const authStack = createStackNavigator({

Welcome:{

  screen:createBottomTabNavigator ({


        SignUp:signUpForm,

        signIn:SignInForm


  },
  {

    tabBarOptions :{

      labelStyle: {
   fontSize: 20,
 }


    }



  })


}




},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 }



);*/

// AUTHENTICATED STACK NAVIGATOR

const authenticatedStack = createStackNavigator({

    MyList:{

      screen:createBottomTabNavigator ({


            Tasks:MyList


      },
      {

        tabBarOptions :{

          labelStyle: {
       fontSize: 20,
     }


        }



      }),

      navigationOptions:{

        title:"My Tasks"
      }



    },

    NewTask:{

      screen:NewTask,
      navigationOptions:{

        title:"New Task"
      }

    }



},

{




 }

);


export const RootStack = createSwitchNavigator({

afterAuth:authenticatedStack,






});
