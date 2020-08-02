import React, {StyleSheet} from 'react-native';


export default StyleSheet.create({
  header:{
    fontSize:14,
    color:"#616161",
    fontWeight:"400",
    marginTop:15
  },

  amountText:{
    fontSize:20,
    fontWeight:"100"
  },

  card:{
    padding:10,
    width:'90%',
    alignSelf:"center"
  },

  payButton:{
    padding:10,
    justifyContent:"center",
    alignItems:"center",
    marginTop:20
  },


  dateContainer:{
    width:"100%",
    flexDirection:"row"
  },

  dateWidth:{
    width:"70%"
  },


  cvvWidth:{
    width:"30%"
  },

  input:{
    padding:2,
    paddingLeft:2,
    borderRadius:5,
    borderColor:"grey",
    borderBottomWidth:1,
  },

  errorText:{
    color:"red"
  }
})
