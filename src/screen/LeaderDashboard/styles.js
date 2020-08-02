import React,{StyleSheet} from 'react-native';
import constantData from '../../JS/constant';

export default StyleSheet.create({

  

  card:{
    width:'90%',
    alignSelf:"center",
    padding:10,
    marginTop:10,
    borderColor: '#eee',
    elevation:2,
    borderColor: '#eee',
    borderWidth:2,
    flexDirection:'row',
    alignItems:'center',
    
  },

  loaderContainer:{
    width:'100%',
    height:400,
    justifyContent:'center',
    alignItems:'center'
  },

  main:{
    alignSelf:'center',
    justifyContent:"center",
    height:'90%'
  },

  userImg:{
    width:50,
    height:50,
    borderRadius:50/2,
    borderColor:constantData.colors.primary,
    borderWidth:2,
    marginRight:10
  },

  followDetails:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center'
  },


  value:{
    color:"#000",
    textAlign:'left'
  },

  textContainer:{
    marginLeft:10,
    marginTop:10
  },
  text:{
    fontSize:12
  },
})