
import React,{StyleSheet,Dimensions} from 'react-native';

export default StyleSheet.create({


  container:{
    flex: 1,
    height: Dimensions.get('window').height-100,
    
    alignItems:"center",
    left: 0,
    position:"absolute",        
    top: 0,
    bottom:0,
    width: '100%'
  },

  main:{
    width:'100%',
    height:'70%',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'black'
  },
  
  card: {
    width:"80%",    
    borderRadius: 2,
    borderColor: '#eee',
    borderWidth:2,
    backgroundColor: 'white',
    justifyContent:"center",
    elevation: 1,
    padding:10,
  
    alignSelf:"center",
    marginTop:-100
  },

  thumbnail: {
    backgroundColor:'black',
    width: '100%',
    height:"100%",
  },

  input:{
    marginTop:20,
    marginBottom:10,
    padding:5,
    borderBottomColor:"#ffc107",
    borderBottomWidth:2
  },

  button:{
    width:'100%',
    backgroundColor:"#ffc107",
    marginTop:8,
    flexDirection:"row",
    padding:12,
    justifyContent:"center"
  },


  buttonText:{
    color:"#fff",
    marginLeft:10,
    fontSize:16,
    letterSpacing:1
  },


  playButton:{
    position:"absolute",
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    borderRadius:5,
    padding:8
  },

  uploadButton:{
    color:"#fff",
    marginLeft:10
  },

  errorText:{
    color:"red",
    fontSize:14,
    marginBottom:10,
    marginTop:10,
  },
  

  backgroundContainer:{
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:'black',
    width:'100%',
    height:'60%'

  },

  buttonContainer:{
    flexDirection:"row",
    marginTop:20,
    marginBottom:10,
    justifyContent:"space-around"
  },

  audioContainer:{
    width:'100%',
    height:'100%',
    justifyContent:"center",
    borderRadius:10,
    backgroundColor:"#000",
    alignItems:"center",
    justifyContent:"center",
  },

  loader:{
    width:'100%',
    marginTop:15,
    padding:12,
    backgroundColor:"#ffc107",
  }

})