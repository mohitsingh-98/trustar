import React,{StyleSheet,Dimensions,Platform} from 'react-native';
import constantData from '../../JS/constant';


export default StyleSheet.create({

  mainContainer:{
    width:"100%",
    height:'100%',
    backgroundColor:'#fff'
  },

	container:{
		width:'100%',
    elevation:2,
    borderColor: '#eee',
    backgroundColor:'#fff',
  },

  loaderContainer:{
    width:'100%',
    height:400,
    justifyContent:'center',
    alignItems:'center'
  },
  
  sliderImg:{
    width: '100%',
    height: 80,
    
    // resizeMode: 'stretch'
  },

  userInfoText:{
    margin:10,
    marginBottom:2,
  },
	
  card: {       
    width:'100%',
    borderColor: 'grey',
    backgroundColor: 'white',
  },
    
  thumbnail: {
    backgroundColor:'#212121',
    // width: '100%',
    // height:Dimensions.get('screen').height-300,
  },
    
  videoContainer:{
    width:'100%',
    borderBottomColor:"#eee",
    paddingBottom:20,
    borderBottomWidth:2,
    flexDirection:'row',
   
  },
    
  videoHeader:{
    marginTop:10,
    backgroundColor:'#fff',
    flexDirection:"row",
    justifyContent:"center",
    alignItems:'center'
  
  },


  videoPlayIcon:{
  	position:"absolute",
    alignItems:"center",
    height:'100%',
    justifyContent:"center",
    alignSelf:"center",
  },
    
  videoTextContainer:{
    width:'100%',
    alignSelf:"center",
  },

  viewText:{
    position:"absolute",
    right:15
  },


  userImg:{
    width:35,
    height:35,
    borderRadius:35/2,
    borderColor:constantData.colors.primary,
    borderWidth:2,
    marginRight:10
  },

  userInfo:{
    flexDirection:'row',
    alignItems:'center',
    margin:0,
    marginBottom:5,
    
  },

  topUserInfo:{
    flexDirection:'row',
    alignItems:'center',
    margin:10,
  },
  modalContainer:{
    width:'90%',
    borderRadius:5,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: '#fff',
  },

  buttonContainer:{
    flexDirection:"row",
    marginTop:10,
    borderTopWidth:1,
    borderTopColor:"#eee",
    width:'100%',
    justifyContent:"space-around"
  },

  modalButton:{
    padding:10,
    marginLeft:10,
  },

  modalList:{
    padding:15,
    borderBottomColor:'#eee',
    justifyContent:'center',
    alignItems:'center',
    borderBottomWidth:1,
    width:'100%'
  },

  modalListtext:{
    fontSize:18,
    fontWeight:'400',
   
  },
    

  iconButton:{
    padding:10,
    borderRadius:50/2,
    margin:0,
  },

  likesText:{
    color:"#000",
    marginLeft:10,
    fontWeight:"bold",
    fontSize:14,
    marginTop:-7,
    marginBottom:0
  },


  subscribeButton:{
    position:"absolute",
    right:10,
    bottom:5,
    height:34,
    justifyContent:"center",
    borderRadius:5,
    alignItems:"center",
    width:100,
    backgroundColor:"#d50000"
  },

  subscribeText:{
    color:"#fff",
    fontSize:14
  },
    
  titleText:{
 
    fontSize:20,
    color:"#000",
    marginBottom:10
   
	},

	button:{
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    borderRadius:5,
    padding:10,
    marginTop:-70
	},

	audioPlayButton:{
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    borderRadius:5,
    paddingTop:6,
    paddingBottom:6,
    paddingLeft:10,
    paddingRight:10
	},
	    
  main:{
    width:120,
    marginRight:20,
    marginLeft:10,
    marginTop:25,
    marginBottom:20
  },
    
  audioContainer:{
    width:'100%',
    height:90,
    justifyContent:"center",
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:'#fff'
  },

   
  textButton:{
    marginRight:10,
    marginTop:20,
    fontSize:14,
    color:constantData.colors.primary
  },

  WebViewContainer: { 
    marginTop: (Platform.OS == 'ios') ? 20 : 0,
  },

  refreshButton:{
    padding:5,
    fontSize:40,
    width:170,
    justifyContent:'center',
    alignItems:'center',
    marginTop:20,
    borderRadius:20,
    flexDirection:'row',
    backgroundColor:constantData.colors.primary
    
  }
  
	
})