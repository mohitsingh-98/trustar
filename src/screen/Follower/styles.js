
import React,{StyleSheet,Platform,Dimensions} from 'react-native';
import constantData from '../../JS/constant';


export default StyleSheet.create({
    mainContainer:{
      width:"100%"
    },

    container:{
      flex:1,
      justifyContent:'flex-start',
      backgroundColor:'#fff'
    },


	header: {
		// borderBottomColor: '#e0e0e0',
		// borderBottomWidth: 1,
		width: '100%',
    flexDirection: 'row',
    // marginTop:10,
		// marginTop: (Dimensions.get('window').width > 400) ? (Platform.OS == 'ios' ? 40 : 5) : (Platform.OS == 'ios' ? 20 : 5),
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 100,
		padding: 10
	},
	headerText: {
		fontSize: 18
	},

    inputContainer:{
      borderBottomColor:"#eee",
      borderBottomWidth:1,
      width:"100%",
      paddingBottom:5,
      marginTop:10
      // marginTop:(Dimensions.get('window').width>400)?(Platform.OS=='ios'?50:5):(Platform.OS=='ios'?40:5),
    },
  
    input:{
      width:"90%",
      alignSelf:"center",
      fontSize:12,
      color:"grey",
      paddingLeft:12,
      padding:Platform.OS=='ios'?10:5,
      borderRadius:20,
      backgroundColor:"#eee"
    },
  

  
    listStyle:{
      width:'90%',
      flexDirection:'row',
      paddingTop:5,
      alignSelf:'center',
      paddingBottom:6,
      borderBottomColor:'#eeeeee',
      borderBottomWidth:1,
      justifyContent:'space-between'
    },
  
    listContainer:{
      flexDirection:'row',
      alignSelf:'center',
      alignItems:"center"
    },
  
    image:{
      width:50,
      height:50,
      borderRadius:50/2,
      marginTop:5,
      alignSelf:'center',
      borderColor:constantData.colors.primary,
      borderWidth:2,

    },
  
    text:{
      fontSize:14,
      marginLeft:10,
      color:'black'
    },

    userName:{
      fontSize:14,
      marginTop:10
    },
  
    followButton:{
      marginRight:10,
      width:100,
      borderColor:constantData.colors.primary,
      borderWidth:1,
      borderRadius:8,
      paddingTop:4,
      paddingBottom:4,
      paddingLeft:10,
      paddingRight:10,
      justifyContent:'center',
      alignSelf:'center'
    },
  
    followText:{
      fontSize:14,
      textAlign:'center',
      alignSelf:'center'
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
  
    buttonContainer:{
      flexDirection:"row",
      marginTop:10,
      borderTopWidth:1,
      borderTopColor:"#eee",
      width:'100%',
      justifyContent:"space-around"
    },
  
    modalButton:{
      padding:10,
      marginLeft:10,
    },
    
    loader:{
      position:"absolute",
      justifyContent:"center",
      width:'100%',
      height:'100%',
      alignItems:'center'
  }
  
  })