import React,{StyleSheet,Dimensions} from 'react-native';
import constantData from '../../JS/constant';

export default StyleSheet.create({
	profileImg: {
		width: 70,
		height: 70,
		borderWidth: 2,
		borderRadius: 70/2,
    marginTop:10,
    marginLeft:10,
		overflow: "hidden",
		borderColor: "#eee"
  },
  
  userInfoContainer:{
    flexDirection:'row',

  },
  userInfo:{
    marginTop:10,
    width:Dimensions.get('screen').width-80,
    alignItems:'center',
  },
  followDetails:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-around',
  },

  followButton:{
    paddingLeft:10,
    paddingRight:10,
    marginTop:10,
    padding:5,
    borderRadius:5,
    color:'#fff',
    width:'90%',
    alignItems:'center',
    borderWidth:1,
    borderColor:constantData.colors.primary
  },


  value:{
    color:"#000"
  },

  text:{
    fontSize:12
  },

  emailText:{
    color:"#000",
    fontSize:12,
    marginLeft:15,
    marginTop:10
  },

  aboutme:{
    fontSize:12,
    marginLeft:15,
    color:"grey",
  },

  mediaConatiner:{
    flexDirection:'row',
    width:'100%',
    marginTop:20,
    height:40,
    borderColor:'#e0e0e0',
    borderBottomWidth:1,
    borderTopWidth:1,
  },

  loader:{
    marginTop:50,
    justifyContent:"center"
  },

  tabStyle:{
    height:'100%',
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    backgroundColor: "#eeeeee"
  },



  container:{
		width:'32%',
    marginTop:20,
    marginBottom:0,
    marginLeft:4,

  },
  
	
  card: {       
    width:'100%',
    borderRadius: 2,
    borderColor: 'grey',
    backgroundColor: 'white',
    justifyContent:"center",
    overflow: "hidden"
  },
    
  thumbnail: {
    backgroundColor:'black',
    width: '100%',
    height:110,
  },
    
  videoContainer:{
    flexDirection:'row',
    flexWrap:'wrap',
    // justifyContent:'space-between',
    paddingBottom:20

  },
    
  videoHeader:{
    flexDirection:"row",
    justifyContent:"space-between"
  },


  videoPlayIcon:{
  	position:"absolute",
    alignItems:"center",
    height:'100%',
    justifyContent:"center",
    alignSelf:"center"
  },
    
  videoTextContainer:{
    width:'85%',
    marginLeft:5,
    alignSelf:"center",
    overflow:"hidden"
  },


  modal:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },

  modalContainer:{
    width:'80%',
    padding:5,
    borderRadius:5,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#fff"
  },

  modalButton:{
    padding:10,
    marginLeft:10,
  },


  buttonContainer:{
    flexDirection:"row",
    marginTop:10,
    borderTopWidth:1,
    borderTopColor:"#eee",
    width:'100%',
    justifyContent:"space-around"
  },

  userName:{
    fontSize:14,
    marginTop:10
  },


})