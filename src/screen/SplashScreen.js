import React, {Component} from 'react';
import {View,Image,StyleSheet,Platform,Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";



export default class SpalshScreen extends Component {

  static navigationOptions={
    header:null,
  }
  
  constructor(props){
    super(props);
  }
  
  componentDidMount(){
    // NetInfo.isConnected.addEventListener(
    //   'connectionChange',
    //   this._handleConnectivityChange
    // ); 
   
 

    const unsubscribe = NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      if(state.isConnected){
        AsyncStorage.getItem("userId").then((user)=>{
          if(user != null && user != undefined){
            this.props.navigation.navigate('Dashboard');
          }
          else if(Platform.OS !='ios'){
            setTimeout(()=>{this.props.navigation.navigate('LoginOption')},3000)
          }
          else{
            this.props.navigation.navigate('LoginOption')
          }
        })
      }
      else{
        Alert.alert("Internet not connected.!!!")
      }
    });
    
    // Unsubscribe
    unsubscribe();
  }

// Call to check network stability
  // _handleConnectivityChange = (isConnected) => { 
  //   if(isConnected == true){
  //     AsyncStorage.getItem("userId").then((user)=>{
  //       if(user != null && user != undefined){
  //         this.props.navigation.navigate('Dashboard');
  //       }
  //       else if(Platform.OS !='ios'){
  //         setTimeout(()=>{this.props.navigation.navigate('LoginOption')},3000)
  //       }
  //       else{
  //         this.props.navigation.navigate('LoginOption')
  //       }
  //     })
  //   }
  //   else{
  //     Alert.alert("Internet not connected.!!!")
  //   }
  // };

  

  render() {
    return (
      <View style={styles.container}>
        {Platform.OS !='ios' &&(
         <Image style={styles.splashImg} resizeMode="cover"
            source={require('../assets/Images/splash.png')}>
          </Image>
        )}
      </View>
    );
  }
}


const styles=StyleSheet.create({
  container:{
    width:'100%',
    height:'100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  splashImg:{
    width:'100%',
    height:'100%',
  }

  })

  