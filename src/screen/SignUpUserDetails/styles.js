import React, {StyleSheet,Dimensions} from 'react-native';
import constantData from '../../JS/constant';


export default StyleSheet.create({

  container:{       
    flex: 1,
    height: Dimensions.get('window').height-100,
   
    alignItems:"center",
    left: 0,
    position:"absolute",        
    top: 20,
    bottom:0,
    width: '100%'
  },
  
  logo:{
    width:220,
    height:120,
    alignSelf:"center",
    marginBottom:40
  },
  
  input:{
    borderBottomColor:"#e0e0e0",
    marginTop:5,
    marginBottom:25,
    paddingLeft:10,
    paddingRight:5,
    paddingTop:8,
    paddingBottom:8,
    borderLeftColor:"#eee",
    borderRightColor:"#eee",
    borderWidth:1,
    fontSize:14,
    borderTopColor:"#eee"
  },

  inputContainer:{
    width:"90%",
    alignSelf:"center",
  },


  textStyle:{
    color:"#424242",
    fontSize:14
  },

  button:{
    width:'90%',
    marginTop:20,
    marginBottom:20,
    padding:8,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:5
  },

  buttonText:{
    color:'#fff'
  },
  
  modal:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'rgba(52, 52, 52, 0.8)'
  },
  
  modalContainer:{
    width:'90%',
    height:120,
    borderRadius:5,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: '#fff'
  },
    
  okButton:{
    width:"100%",
    alignItems:"center",
    position:"absolute",
    bottom:0,
    backgroundColor:constantData.colors.primary,
    padding:10
  },

  errorText:{
    color:'red',
    alignSelf:'center',
    width:'90%'
  }


})
