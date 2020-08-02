import React,{StyleSheet} from 'react-native';


export default  StyleSheet.create({
  container:{
    flex:1,
    width:"100%",        
    alignSelf:"center"
  },

  header:{
    fontSize:16,
    marginLeft:15,
    color:"#000",
    fontWeight:'bold',
    marginTop:10,
    marginBottom:8
  },

  text:{
    fontSize:14,
    marginBottom:5,
    marginLeft:15,
    marginRight:15,
  },

  button:{
    marginTop:20,
    padding:8,
    width:'80%',
    backgroundColor:"#ffa000",
    alignSelf:"center",
    marginBottom:20,
    borderRadius:5
  },

  buttonText:{
    color:"#fff",
    alignSelf:"center"
  }

})