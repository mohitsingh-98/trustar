
// import {
//   createAppContainer,
// } from 'react-navigation';
// // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator,createMaterialTopTabNavigator } from 'react-navigation-tabs';
// import { createDrawerNavigator } from 'react-navigation-drawer';
// // import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import React, { Component } from 'react';
// import Profile from '../screen/Profile/ProfileScreen';
// import EditProfileScreen from '../screen/EditProfile/EditProfileScreen';
// import Competition from '../screen/Competition/CompetitionScreen';
// import Icons from 'react-native-vector-icons/FontAwesome';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import WelcomeScreen from '../screen/SplashScreen';
// import FollowerScreen from '../screen/Follower/FollowerScreen';
// import NewVideoScreen from '../screen/NewVideo/NewVideoScreen';
// import Feed from '../screen/Feed/Feed';
// import PreviewVideoScreen from '../screen/PreviewVideo/PreviewVideoScreen';
// import { Image } from 'react-native';
// import LoginOptionScreen from '../screen/LoginOption/LoginOptionScreen';
// import LoginScreen from '../screen/Login/LoginScreen';
// import UserEmail from '../screen/SignUpEmail/SignUpEmail';
// import UserEmailVerify from '../screen/SignUpEmailVerify/SignUpEmailVerify';
// import SignUpUserDetails from '../screen/SignUpUserDetails/SignUpUserDetails';
// import ForgetEmail from '../screen/ForgetEmail/ForgetEmail';
// import ForgetEmailVerify from '../screen/ForgetEmailVerify/ForgetEmailVerify';
// import ForgetPassword from '../screen/ForgetPassword/ForgetPassword';
// import VideoScreen from '../screen/VideoPlayer/VideoPlayerScreen';
// import UploadVideo from '../screen/Upload/UploadVideo';
// import SubscribeScreen from '../screen/Subscribe/SubscribeScreen';
// import PaymentScreen from '../screen/Payment/PaymentScreen';
// import ChangePassword from '../screen/ChangePassword/ChangePasswordScreen'
// import DrawerContent from '../screen/DrawerContent'
// import constantData from '../JS/constant';
// import UserDetails from '../screen/userDetails/userDetails';
// import CompetitionListScreen from '../screen/CompetionList/CompetitionListScreen';
// import LeaderDashboard from '../screen/LeaderDashboard/LeaderDashboard';
// import LeaderDashboardList from '../screen/LeaderDashboard/LeaderDashboardList';
// import PostOption from '../screen/PostOption/PostOption';
// import YoutubeVideos from '../screen/YoutubeVideos/YoutubeVideos';
// import FollowingUser from '../screen/FollowingUser/FollowingUser';
// import ExploreScreen from '../screen/Explore/ExploreScreen';




// const DashboardTabNavigator = createMaterialTopTabNavigator(
//   {
//     Feeds: { screen: props => <Feed {...props} /> },
//     Competition: { screen: props => <Competition {...props} /> }
//   },
//   {
//     tabBarPosition: 'top',
//     swipeEnabled: false,
//     animationEnabled: true,
//     tabBarOptions: {
//       activeTintColor: '#000',
//       inactiveTintColor: '#bdbdbd',
//       upperCaseLabel: false,
//       style: {
//         backgroundColor: '#fff',
//       },
//       tabStyle: {
//         height: 50,
//       },
//       labelStyle: {
//         textAlign: 'center',
//       },
//       indicatorStyle: {
//         borderBottomColor: constantData.colors.primary,
//         borderBottomWidth: 2,
//       },
//     },
//   }
// );


// const HomeStack = createStackNavigator({
//   HomeTab: {
//     screen: DashboardTabNavigator, navigationOptions: ({ navigation }) => ({
//       title: "",
//       // header:props =>{<Headers {...props} />},
//       // headerTitle: (
//       //   <Image style={{ width: 100, resizeMode: "cover", alignSelf: "center", marginLeft: 10, height: 50 }} source={require('../assets/logo/01.png')} />
//       // ),
//       headerStyle: {
//         height: 10,
//         backgroundColor: "#fff",
//         elevation: 0,
//         shadowOpacity: 0,
//       },
//       headerTitleStyle: {
//         fontSize: 18,
//         fontWeight: "normal",
//         color: "black",
//       },

//     })
//   },
//   CompetitionList: {
//     screen: CompetitionListScreen, navigationOptions: {
//       headerTitleStyle: { fontWeight: "normal", fontSize: 16 },
//       headerStyle: { elevation: 0 },
//       title: "Upcoming Competitions"
//     }},

//   LeaderDashboard: { screen: LeaderDashboard, navigationOptions: {
//     headerTitleStyle: { fontWeight: "normal", fontSize: 16 },
//     headerStyle: { elevation: 0 },
//     title: "Top Competitors"
//   }},
//   leaderDashboard: { screen: LeaderDashboardList, navigationOptions: {
//     headerTitleStyle: { fontWeight: "normal", fontSize: 16 },
//     headerStyle: { elevation: 0 },
//     title: "Leaderboard"
//   }},
  
// },{
//   initialRouteName:'HomeTab'
// })


// const LoginStack =createStackNavigator({
//   LoginOption: { screen: LoginOptionScreen, navigationOptions: { header: null }},
//   Login: { screen: LoginScreen,  navigationOptions: {
//     headerTitleStyle: { fontWeight: "normal", fontSize: 16 },
//     headerStyle: { elevation: 0 },
//     title: "Login"
//   }},
// })





// const MyDrawerNavigator = createDrawerNavigator({
//   Profile: {
//     screen: Profile,
//     navigationOptions: () => ({
//       header: null
//     })
//   },

  

//   changePassword: {
//     screen: ChangePassword,
//     navigationOptions: () => ({
//       header: null
//     })
//   }
// }, {
//     contentComponent: DrawerContent,
//   }
// )


// const SignInStack = createStackNavigator({

//   UserEmail: {screen: UserEmail, navigationOptions: { header: null }},
//   UserEmailVerify: {
//   screen: UserEmailVerify,navigationOptions: { header: null }},
//   SignUpUserDetails: { screen: SignUpUserDetails, navigationOptions: { header: null } },

// })


// const ForgetPasswordStack=createStackNavigator({
//   ForgetEmail: {
//     screen: ForgetEmail, navigationOptions: { header: null }},
//   ForgetEmailVerify: {
//     screen: ForgetEmailVerify, navigationOptions: { header: null }},

//   ResetPassword: {
//     screen: ForgetPassword, navigationOptions: { header: null }},
// })



// const bottomTab = createBottomTabNavigator({
//   Home: {
//     screen: HomeStack, navigationOptions:({navigation})=> ({
//       tabBarLabel:'Home',  
//       tabBarIcon: ({ tintColor }) => (
//         <Icons name="home" size={22} style={{ color: tintColor }} />
//       ),
//       tabBarOptions: {
//         activeTintColor: constantData.colors.primary,
//         inactiveTintColor: '#bdbdbd',
//       },
//      tabBarOnPress: (tab, jumpToIndex) => {
//         if(!tab.focused){
//           console.warn(navigation.navigate('Feed'))
//           // navigation.navigate.goBack();
//           navigation.navigate('HomeTab');
//         }
//       }

//     })
//   },

//   explore: {
//     screen: ExploreScreen, navigationOptions: {
//       tabBarLabel:'Explore',  
//       tabBarIcon: ({ tintColor }) => (
//         <MaterialIcons name="explore" size={22} style={{ color: tintColor }} />
//       ),
//       tabBarOptions: {
//         activeTintColor: constantData.colors.primary,
//         inactiveTintColor: '#bdbdbd',
//       }

//     }
//   },

//   Voice: {
//     screen: PostOption, navigationOptions: {
//       tabBarLabel:'Add', 
//       tabBarIcon: ({ tintColor }) => (
//         <Icons name="microphone" size={28} style={{ color: tintColor, alignSelf: "center" }} />
//       ),
//       tabBarOptions: {
//         activeTintColor: constantData.colors.primary,
//         inactiveTintColor: '#bdbdbd',
        
//       }
      

//     }
//   },

//   follower: {
//     screen: FollowerScreen, navigationOptions: {
//       tabBarLabel:'Follow',  
//       tabBarIcon: ({ tintColor }) => (
//         <Icons name="heart" size={22} style={{ color: tintColor }} />
//       ),
//       tabBarOptions: {
//         activeTintColor: constantData.colors.primary,
//         inactiveTintColor: '#bdbdbd',

//       }

//     }
//   },

//   Profile: {

//     screen: MyDrawerNavigator, navigationOptions: {
//       tabBarLabel:'Profile',  
//       tabBarIcon: ({ tintColor }) => (

//         <Icons name="user" size={22} style={{ color: tintColor }} />
//       ),
//       tabBarOptions: {
//         activeTintColor: constantData.colors.primary,
//         inactiveTintColor: '#bdbdbd',

//       }

//     }
//   }

// })

// const AppSwitchNavigator = createStackNavigator({

//   Welcome: { screen: WelcomeScreen },
//   LoginStack:{screen:LoginStack,navigationOptions:{header:null}},
//   Signin:{screen:SignInStack, navigationOptions: {
//     headerTitleStyle: { fontWeight: "normal", fontSize: 16 },
//     headerStyle: { elevation: 0 },
//     title: "Sign Up"
//   }},
//   ForgetPassword:{screen:ForgetPasswordStack,navigationOptions:{
//     headerTitleStyle: { fontWeight: "normal", fontSize: 16 },
//     headerStyle: { elevation: 0 },
//     title: "Forgot Password"
//   }},

//   Dashboard: {
//     screen: bottomTab, navigationOptions: {
//       header: null
//     }
//   },
//   Record: { screen: NewVideoScreen },
//   uploadvideo: {
//     screen: UploadVideo, navigationOptions: {
//       headerTitleStyle: { fontWeight: "normal", fontSize: 16 },
//       headerStyle: { elevation: 0 },
//       title: "Post"
//     }
//   },
//   FollowingUser: {screen: FollowingUser},
//   editProfile: {
//     screen: EditProfileScreen, navigationOptions: {
//       header: null
//     }
//   },
//   Preview: { screen: PreviewVideoScreen },

//   userDetails: { screen: UserDetails, navigationOptions: {
//     headerTitleStyle: { fontWeight: "normal", fontSize: 16 },
//     headerStyle: { elevation: 0 },
//     title: "User Details"
//   }},
//   VideoRecording: { screen: NewVideoScreen },
//   video: {
//     screen: VideoScreen, navigationOptions: {
//       header: null
//     }
//   },
//   Subscribe: { screen: SubscribeScreen },

//   Payment: { screen: PaymentScreen },
 
//   Youtube: {
//     screen: YoutubeVideos, navigationOptions: {
//       headerTitleStyle: { fontWeight: "normal", fontSize: 16 },
//       headerStyle: { elevation: 0 },
//       title: "Your Videos"
//     }
//   },



// });

// const AppContainer = createAppContainer(AppSwitchNavigator);

// export default AppContainer;





import {
  createAppContainer,


} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer'
import React, { Component } from 'react';
import Profile from '../screen/Profile/ProfileScreen';
import EditProfileScreen from '../screen/EditProfile/EditProfileScreen';
import Competition from '../screen/Competition/CompetitionScreen';
import Icons from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import WelcomeScreen from '../screen/SplashScreen';
import FollowerScreen from '../screen/Follower/FollowerScreen';
import NewVideoScreen from '../screen/NewVideo/NewVideoScreen';
import Feed from '../screen/Feed/Feed';
import PreviewVideoScreen from '../screen/PreviewVideo/PreviewVideoScreen';
import { View } from 'react-native';
import LoginOptionScreen from '../screen/LoginOption/LoginOptionScreen';
import LoginScreen from '../screen/Login/LoginScreen';
import UserEmail from '../screen/SignUpEmail/SignUpEmail';
import UserEmailVerify from '../screen/SignUpEmailVerify/SignUpEmailVerify';
import SignUpUserDetails from '../screen/SignUpUserDetails/SignUpUserDetails';
import ForgetEmail from '../screen/ForgetEmail/ForgetEmail';
import ForgetEmailVerify from '../screen/ForgetEmailVerify/ForgetEmailVerify';
import ForgetPassword from '../screen/ForgetPassword/ForgetPassword';
import VideoScreen from '../screen/VideoPlayer/VideoPlayerScreen';
import UploadVideo from '../screen/Upload/UploadVideo';
import SubscribeScreen from '../screen/Subscribe/SubscribeScreen';
import PaymentScreen from '../screen/Payment/PaymentScreen';
import ChangePassword from '../screen/ChangePassword/ChangePasswordScreen'
import DrawerContent from '../screen/DrawerContent'
import constantData from '../JS/constant';
import UserDetails from '../screen/userDetails/userDetails';
import CompetitionListScreen from '../screen/CompetionList/CompetitionListScreen';
import LeaderDashboard from '../screen/LeaderDashboard/LeaderDashboard';
import LeaderDashboardList from '../screen/LeaderDashboard/LeaderDashboardList';
import PostOption from '../screen/PostOption/PostOption';
import YoutubeVideos from '../screen/YoutubeVideos/YoutubeVideos';
import FollowingUser from '../screen/FollowingUser/FollowingUser';
import ExploreScreen from '../screen/Explore/ExploreScreen';




const DashboardTabNavigator = createMaterialTopTabNavigator(
  {
    Feeds: { screen: props => <Feed {...props} /> },
    Competition: { screen: props => <Competition {...props} /> }
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: false,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#000',
      inactiveTintColor: '#bdbdbd',
      upperCaseLabel: false,
      style: {
        backgroundColor: '#fff',
      },
      tabStyle: {
        height: 50,
      },
      labelStyle: {
        textAlign: 'center',
      },
      indicatorStyle: {
        borderBottomColor: constantData.colors.primary,
        borderBottomWidth: 2,
      },
    },
  }
);


const HomeStack = createStackNavigator({
  HomeTab: {
    screen: DashboardTabNavigator, navigationOptions: ({ navigation }) => ({
      title: "",
      // header:props =>{<Headers {...props} />},
      // headerTitle: (
      //   <Image style={{ width: 100, resizeMode: "cover", alignSelf: "center", marginLeft: 10, height: 50 }} source={require('../assets/logo/01.png')} />
      // ),
      headerStyle: {
        height: 10,
        backgroundColor: "#fff",
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTitleStyle: {
        fontSize: 18,
        fontWeight: "normal",
        color: "black",
      },

    })
  },
  CompetitionList: {
    screen: CompetitionListScreen, navigationOptions: {
      headerTitleStyle: { fontWeight: "normal", fontSize: 16 },
      headerStyle: { elevation: 0 },
      title: "Upcoming Competitions"
    }
  },

  LeaderDashboard: {
    screen: LeaderDashboard, navigationOptions: {
      headerTitleStyle: { fontWeight: "normal", fontSize: 16 },
      headerStyle: { elevation: 0 },
      title: "Top Competitors"
    }
  },
  leaderDashboard: {
    screen: LeaderDashboardList, navigationOptions: {
      headerTitleStyle: { fontWeight: "normal", fontSize: 16 },
      headerStyle: { elevation: 0 },
      title: "Leaderboard"
    }
  },

}, {
  initialRouteName: 'HomeTab'
})


const LoginStack = createStackNavigator({
  LoginOption: { screen: LoginOptionScreen, navigationOptions: { header: null } },
  Login: {
    screen: LoginScreen, navigationOptions: {
      headerTitleStyle: { fontWeight: "normal", fontSize: 16 },
      headerStyle: { elevation: 0 },
      title: "Login"
    }
  },
})





const MyDrawerNavigator = createDrawerNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: () => ({
      header: null
    })
  },



  changePassword: {
    screen: ChangePassword,
    navigationOptions: () => ({
      header: null
    })
  }
}, {
  contentComponent: DrawerContent,
}
)


const SignInStack = createStackNavigator({

  UserEmail: { screen: UserEmail, navigationOptions: { header: null } },
  UserEmailVerify: {
    screen: UserEmailVerify, navigationOptions: { header: null }
  },
  SignUpUserDetails: { screen: SignUpUserDetails, navigationOptions: { header: null } },

})


const ForgetPasswordStack = createStackNavigator({
  ForgetEmail: {
    screen: ForgetEmail, navigationOptions: { header: null }
  },
  ForgetEmailVerify: {
    screen: ForgetEmailVerify, navigationOptions: { header: null }
  },

  ResetPassword: {
    screen: ForgetPassword, navigationOptions: { header: null }
  },
})



const bottomTab = createBottomTabNavigator({
  Home: {
    screen: HomeStack, navigationOptions: ({ navigation }) => ({
      // tabBarLabel:'Home',  
      // tabBarIcon: ({ tintColor }) => (
      //   <Icons name="home" size={22} style={{ color: tintColor }} />
      // ),
      // tabBarOptions: {
      //   activeTintColor: constantData.colors.primary,
      //   inactiveTintColor: '#bdbdbd',
      // },
      tabBarOnPress: (tab, jumpToIndex) => {
        if (!tab.focused) {
          console.warn(navigation.navigate('Feed'))
          // navigation.navigate.goBack();
          navigation.navigate('HomeTab');
        }
      }

    })
  },

  explore: { screen: ExploreScreen },

  Voice: { screen: PostOption },

  follower: { screen: FollowerScreen },

  Profile: { screen: MyDrawerNavigator }

}, {
  defaultNavigationOptions: ({ navigation }) => ({


    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      if (routeName === 'Home') {
        return (
          <View>
            <Icons name="home" size={28} style={{ color: focused?constantData.colors.primary:"#bdbdbd" }} />
          </View>
        );
      } else if (routeName == 'explore') {
        return (
          <View>
            <MaterialIcons name="explore" size={28} style={{ color: focused?constantData.colors.primary:"#bdbdbd"  }} />
          </View>
        );
      }
      else if (routeName == 'Voice') {
        return (
          <View>
            <Icons name="microphone" size={28} style={{ color: focused?constantData.colors.primary:"#bdbdbd"  }} />
          </View>
        );
      }

      else if (routeName == 'follower') {
        return (
          <View>
            <Icons name="heart" size={28} style={{ color: focused?constantData.colors.primary:"#bdbdbd"  }} />
          </View>
        );
      }

      else if (routeName == 'Profile') {
        return (
          <View>
            <Icons name="user" size={28} style={{ color: focused?constantData.colors.primary:"#bdbdbd"  }} />
          </View>
        );
      }
    },
  }),
  tabBarOptions: {
    activeTintColor: '#e91e63',
    inactiveTintColor: '#263238',
    showLabel: false,
    labelStyle: {
      fontSize: 5,
      fontWeight: 'bold',
      marginTop: 5,
      textAlign: 'center'
    },
    style: {
      height: 60,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      borderTopWidth:0,
      elevation:20
    }
  },
})


const AppSwitchNavigator = createStackNavigator({

  Welcome: { screen: WelcomeScreen },
  LoginStack: { screen: LoginStack, navigationOptions: { header: null } },
  Signin: {
    screen: SignInStack, navigationOptions: {
      headerTitleStyle: { fontWeight: "normal", fontSize: 16 },
      headerStyle: { elevation: 0 },
      title: "Sign Up"
    }
  },
  ForgetPassword: {
    screen: ForgetPasswordStack, navigationOptions: {
      headerTitleStyle: { fontWeight: "normal", fontSize: 16 },
      headerStyle: { elevation: 0 },
      title: "Forgot Password"
    }
  },

  Dashboard: {
    screen: bottomTab, navigationOptions: {
      header: null
    }
  },
  Record: { screen: NewVideoScreen },
  uploadvideo: {
    screen: UploadVideo, navigationOptions: { header: null }
  },
  FollowingUser: { screen: FollowingUser },
  editProfile: {
    screen: EditProfileScreen, navigationOptions: {
      header: null
    }
  },
  Preview: { screen: PreviewVideoScreen },

  userDetails: {
    screen: UserDetails, navigationOptions: {
      headerTitleStyle: { fontWeight: "normal", fontSize: 16 },
      headerStyle: { elevation: 0 },
      title: "User Details"
    }
  },
  VideoRecording: { screen: NewVideoScreen },
  video: {
    screen: VideoScreen, navigationOptions: {
      header: null
    }
  },
  Subscribe: { screen: SubscribeScreen },

  Payment: { screen: PaymentScreen },

  Youtube: {
    screen: YoutubeVideos, navigationOptions: {
      headerTitleStyle: { fontWeight: "normal", fontSize: 16 },
      headerStyle: { elevation: 0 },
      title: "Your Videos"
    }
  },



});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default AppContainer;