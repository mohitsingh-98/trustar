import React, { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({

  listContainer: {
    width: '100%',
    height: 100,
  },

  loaderContainer:{
    width:'100%',
    height:400,
    justifyContent:'center',
    alignItems:'center'
  },
  
  container: {
    flex:1,
  },

  crouselContain: {
    marginTop: 10
  },

  sliderImg: {
    width: Dimensions.get('window').width,
    height: 80,
    resizeMode:'stretch'
  },

  subscribeButton: {
    position: "absolute",
    right: 10,
    bottom: 10,
    height: 34,
    justifyContent: "center",
    borderRadius: 5,
    alignItems: "center",
    width: 100,
    backgroundColor: "#d50000"
  },

  subscribeText: {
    color: "#fff",
    fontSize: 14
  },
})