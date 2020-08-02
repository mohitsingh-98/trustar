import React, { StyleSheet, Dimensions } from 'react-native';
import constantData from '../../JS/constant';


export default StyleSheet.create({

  card: {
    width: Dimensions.get('window').width-25,
    borderRadius: 2,
    borderColor: '#eee',
    height:Dimensions.get('window').height*65/100,
    borderWidth: 2,
    backgroundColor: 'white',
    justifyContent: "center",
    elevation: 1,
    padding: 10,
    // marginTop: 10
  },

  userImg: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    borderColor: constantData.colors.primary,
    borderWidth: 2,
    marginRight: 10
  },

  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },

  sliderImg: {
    width: Dimensions.get('window').width,
    height: 85,
    resizeMode:'stretch'
  },

  subscribeButton: {
   
    height: 38,
    marginLeft:15,
    justifyContent: "center",
    borderRadius: 5,
    alignItems: "center",
    width: 100,
    
  },

  subscribeText: {
    color: "#fff",
    fontSize: 14
  },


  viewCount: {
    flexDirection: "row",
    width: '100%',
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },

  viewCountText: {
    fontSize: 14
  },

  textColor: {
    color: constantData.colors.primary,
    fontWeight: "bold",
    fontSize:16
  },


  iconContainer: {
    position: "absolute",
    alignItems: "center",
    height: '100%',
    justifyContent: "center",
    alignSelf: "center"
  },

  iconButtonContainer: {
    marginTop:10,
    marginBottom:10,
    flexDirection: "row",
    justifyContent:'space-between',
    alignItems:'center',
    width:'100%'
  },

  iconButton: {
    marginTop: 15,
    alignItems: "center",
    paddingRight: 20,
    paddingBottom: 10
  },

  backGroundLayer: {
    borderRadius: 5,
    padding: 6,
    width: 40,
    position: "absolute",
    bottom: 2,
    right: 2

  },

  thumbnail: {
    backgroundColor: 'black',
    width: '100%',
    height: Dimensions.get('window').height*40/100,
  },

  text: {
    fontSize: 14,
    color: 'black',
    paddingTop: 5,
  },

  subtitle: {
    fontSize: 10,
    color: '#bdbdbd',
    paddingTop: 5,
    paddingBottom: 10
  },

  description: {
    fontSize: 12,
    color: 'grey',
    paddingTop: 3,
  },

  noMoreCards: {
    justifyContent: 'center',
    marginTop:0,
    alignItems: 'center',
  },

  loader: {
    position: "absolute",
    justifyContent: "center",
    width: '100%',
    height: '100%',
    alignItems: 'center'
  }

})