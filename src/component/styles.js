
import React,{StyleSheet,Platform,Dimensions} from 'react-native';
import constantData from '../JS/constant';


export default StyleSheet.create({

  header:{
    borderBottomColor:'#e0e0e0',
    borderBottomWidth:1,
    width:'100%',
    flexDirection:'row',
    marginTop:(Dimensions.get('window').width>400)?(Platform.OS=='ios'?40:5):(Platform.OS=='ios'?20:5),
    justifyContent:'space-between',
    alignItems:'center',
    zIndex:100,
  },

  headerText:{
    color:'#000',
    fontSize:18,
  },

  modalLoaderText:{
    marginLeft:15,
    fontSize:16
  },


  modalText:{
    color:"#fff",
    fontSize:18
  },

  modalTitleStyle:{
    marginBottom:40,
    fontSize:16
  },


  backButton:{
    padding:10
  },
  facebookButton:{
    flexDirection:'row',
    paddingLeft:50,
    paddingRight:50,
    padding:10,
    color:'#fff',
    backgroundColor:"#3b5998",
    justifyContent:'center',
    alignItems:'center',
    borderRadius:5,
    width:'88%',
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

  fbLoginText:{
    color:"#fff",
    marginLeft:10
  }
})