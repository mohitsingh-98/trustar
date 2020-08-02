import React,{StyleSheet,Dimensions,Platform} from 'react-native';

export default StyleSheet.create({
  container: {
    width:'100%',
    backgroundColor: '#000',
    justifyContent:"center",
    alignItems:'center',
    // height:Dimensions.get('screen').height
    flex:1
  },

  fullScreen: {
    backgroundColor:'#000',
    width: Dimensions.get('screen').width,
    height:Dimensions.get('screen').height-10,
  },  

  controls: {
    backgroundColor: "transparent",
    borderRadius: 5,
    position: 'absolute', 
    bottom: 44,
    left: 4,
    right: 4,
  },

  button:{
    position:"absolute",
    padding:10,
    backgroundColor:'rgba(52, 52, 52, 0.8)',
    width:55,
    alignSelf:"center",
    left:10,
    top:10,
    borderRadius:10,
    zIndex:1
  },


  loader:{
    position:"absolute",
    alignSelf:"center"
  },
  WebViewContainer: { 
    marginTop: (Platform.OS == 'ios') ? 20 : 0,
 
  }

})