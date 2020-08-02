import React,{StyleSheet,Dimensions,Platform} from 'react-native';
import constantData from '../../JS/constant';

export default StyleSheet.create({

  container:{
    flex: 1,
    height: Dimensions.get('window').height,
    // justifyContent: 'center',
    backgroundColor:'#fff',
    alignItems:"center",
   
    width: '100%'
  },
  
  logo:{
    width:'100%',
    height:180,
  },

  errorText:{
    color:"red",fontSize:14
  },
  
  input:{
    fontSize:16,
    width:"85%",
    height:40,
    margin:0,
    borderWidth:2,
    borderRadius:6,
    borderColor:"#eee",
    paddingTop: ( Platform.OS === 'ios' ) ? 0 : 10,
    paddingLeft:10,
    marginBottom:15,
  },

  signInButton:{
    width:'85%',
    padding:10,
    justifyContent:'center',
    color:'#fff',
    backgroundColor:constantData.colors.primary,
    borderRadius:5
  },

  buttonText:{
    color:"#fff",
    alignSelf:"center"
  },

  orText:{
    color:"#000",
    margin:10,
    alignSelf:"center"
  },


  textMessage:{
    flexDirection:"row",
    marginTop:10,
    alignSelf:"center"
  },

  text:{
    color:"grey",
    fontSize:12,
  },

  textHighlight:{
    color:constantData.colors.primary,
    fontSize:12,
  },

  footer:{
    width:"100%",
    justifyContent:"center",
    flexDirection:"row",
    backgroundColor:"#fff",
    borderTopWidth:2,
    borderTopColor:"#eee",
    position:"absolute",
    bottom:0,
    paddingTop:15,
    paddingBottom:15,

  },

  facebookLoginButton:{
    width:'85%',
    padding:10,
    justifyContent:'center',
    color:'#fff',
    backgroundColor:'#004c8c',
    borderRadius:5,
    marginTop:10
  }

})