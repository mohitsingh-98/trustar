import React,{StyleSheet,Dimensions} from 'react-native';

export default StyleSheet.create({

  fullScreen: {
  	flex: 1,
    backgroundColor: "black",
    justifyContent:"center"
  },

  videoView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  videoContainerAndroid: {
    width: Dimensions.get('screen').width,
    height:Dimensions.get('screen').height,
  },
 


  videoIcon: {
    width: 50,
    height: 50
  },

  pauseImageWrapper: {
    alignItems: 'center',
    alignSelf: 'center',
    position: "absolute",
  },

  backButtonWrapper: {
    flexDirection:"row",
    bottom:0,
    position: 'absolute',
    alignSelf: "center",       
    justifyContent:"flex-end",
  },

  icon:{
    margin:20,
  }

})