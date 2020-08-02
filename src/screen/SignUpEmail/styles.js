import React,{StyleSheet,Dimensions,Platform} from 'react-native';


export default StyleSheet.create({

  container:{       
    height: Dimensions.get('window').height-100,
    backgroundColor:'#fff',
    alignItems:"center",
    left: 0,
    position:"absolute",        
    top: 0,
    bottom:0,
    width: '100%'    
  },

  main:{
    width:"90%",
    marginTop:20,
    alignSelf:"center"
  },

  errorText:{
    color:"red",
    marginTop:10,
    marginBottom:10,
    fontSize:14
  },
  
  logo:{
    width:220,
    height:150,
    alignSelf:"center",
    marginBottom:20,
    marginTop:50,
  },

  inputHeader:{
    color:"#424242",
    fontSize:16
  },
  
  input:{
    borderBottomColor:"#e0e0e0",
    marginTop:5,
    fontSize:16,
    padding:Platform.OS=='ios'?15:10,
    borderLeftColor:"#eee",
    borderRightColor:"#eee",
    borderWidth:1,
    borderTopColor:"#eee"
  },
  
  phoneInputWidth:{
    width:"70%",
    borderColor:"#e0e0e0",
    borderWidth:1,
    paddingLeft:10,
    padding:Platform.OS=='ios'?10:5
  },

  button:{
    width:'100%',
    marginBottom:20,
    padding:12,
    alignSelf:"center",
    borderRadius:5,
    justifyContent:"center",
    alignItems:"center"
  },

  dropDown:{
    width:'30%',
    height:40,
    paddingLeft:8,
    borderColor:'#eee',
    borderWidth:1
  }
  
})