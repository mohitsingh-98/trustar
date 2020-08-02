import React,{StyleSheet} from 'react-native';
import constantData from '../../JS/constant';

export default StyleSheet.create({
  logo:{
    width:'75%',
    height:200,
  },

  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#cfd8dc"
  },

  textStyle:{
    color:"#fff",
    alignSelf:"center"
  },

  createNewButton:{
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:70,
    paddingRight:70,
    marginTop:10,
    justifyContent:'center',
    color:'#fff',
    width:'88%',
    backgroundColor:constantData.colors.primary,
    borderRadius:5
  },

  loginText:{
    color:constantData.colors.primary,
    marginTop:20,
    fontSize:16,
    alignSelf:"center"
  },

  orText:{
    color:"grey",
    marginTop:15,
    marginBottom:15,
    alignSelf:"center"
  },


})
 