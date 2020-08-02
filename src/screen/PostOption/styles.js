import React,{StyleSheet,Dimensions} from 'react-native';
import constantData from '../../JS/constant';

export default StyleSheet.create({

  container:{
    // height:Dimensions.get("screen").height-300,
    flex:1,
    alignItems:"center",
    justifyContent:'center',
    borderColor:"#eee",
    width:'100%',
    alignSelf:"center",
  },

  iconButton:{
    flexDirection:"row",
    alignItems:"center",
    width:'80%',
    borderBottomColor:"#eee",
    borderBottomWidth:1,
    padding:12
  },

  logo:{
    width:'75%',
    height:180,
    position:'absolute',
    top:40
  },

  iconButtonText:{
    color:"grey",
    fontSize:20,
    fontWeight:"bold",
    marginLeft:30,
    textAlign:"right",
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
    padding:10
  },

  modalTitleStyle:{
    marginBottom:40,
    borderBottomColor:"#eee",
    borderBottomWidth:1,
    padding:10,
    paddingLeft:0,
    width:'90%',
    fontSize:16
  },

  modalText:{
    fontSize:18
  },

})    