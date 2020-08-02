import React,{StyleSheet} from 'react-native';

export default StyleSheet.create({
	
	container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    flex: 1,
    fontSize: 20,
  },
  
  header:{
    flexDirection:'row',
    position:"absolute",
    zIndex:10,
    top:40,
    width:'90%',
    alignItems:'center',
    justifyContent:'space-between'
  },

  cameraView:{
    height: '100%',
    width: '100%' 
  },

  editIcon:{
    padding:10,
  },

  marqueText:{
    color:'#fff',
    width:'90%',
    padding:10
  },
  
  iconButton:{
    width:108,
    flexDirection:'row',
    alignItems:'center'
  },
  
  buttonContainer:{
    flex: 0,
    flexDirection: "row",
    justifyContent: "center"
  },

  button:{
    position: 'absolute',
    zIndex: 10,
    bottom: 20, 
  },
	
	loader:{
    position:"absolute",
    justifyContent:"center",
    width:'100%',
    height:'100%',
    alignItems:'center'
  },

  loaderText:{
    color:"#fff",
    marginTop:10
  }
})