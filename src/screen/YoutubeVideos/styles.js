import React,{StyleSheet,Dimensions} from 'react-native';
import constantData from '../../JS/constant';


export default StyleSheet.create({

  safeArea: {
    width: 150,
    height:100,
    marginLeft:5,
    marginTop:5,
    backgroundColor: '#000'
  },

  profileImg:{
    width:150,
    height:100,
  },
  
  modalLoaderText:{
    marginTop:15,
    fontSize:16
  },

  listContainer:{
    flexDirection: 'row',
    margin: 10,
    alignItems: 'flex-start'
  },
  textStyle:{
    width: 150
  },

  listOption:{
    height: 40,
    width: 150 
  }

})