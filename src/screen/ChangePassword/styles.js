import React, { StyleSheet } from 'react-native';
import ConstantData from '../../JS/constant';
export default StyleSheet.create({

  card: {
    width: '100%',
    backgroundColor: 'white',
    alignSelf: "center",
    justifyContent: "center",
    padding: 10,
  },

  headerText: {
    fontSize: 18,
    marginLeft: 20,
    alignSelf: "center",
    marginTop:-18,
    color: ConstantData.colors.primary
  },


  input: {
    fontSize: 16,
    width: "95%",
    height: 46,
    margin: 0,
    borderBottomWidth: 2,
    borderRadius: 6,
    borderBottomColor: "#eee",
    alignSelf: "center",
    paddingTop: 15,
    paddingLeft: 10,
    marginBottom: 15,
  },

  inputContainerAlign: {
    marginTop: 40
  },

  button: {
    width: "90%",
    alignSelf: "center",
    borderRadius: 4,
    marginTop: 5,
    marginBottom: 10,
    justifyContent: "center",
    padding: 10,
  },

  cancelButton: {
    color: ConstantData.colors.primary,
    alignSelf: "center"
  },

  buttonTextAlign: {
    alignSelf: "center",
    color: '#fff'
  },

  buttonLeftAlign: {
    marginLeft: 15,
    marginTop:15
    
  }

})