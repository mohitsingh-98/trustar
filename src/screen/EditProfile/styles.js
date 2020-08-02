import React, { StyleSheet, Dimensions, Platform } from 'react-native';
import constantData from '../../JS/constant';



export default StyleSheet.create({

  container: {
    flex: 1,
    height: Dimensions.get("window").height,
    alignItems: 'center'
  },

  main: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  backButton: {
    position: 'absolute',
    zIndex: 20,
    left: 15,
    top: 30
  },

  inputContainer: {
    width: '90%',
    marginBottom: 20
  },

  inputHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },

  headerText: {
    fontSize: 12
  },

  input: {
    padding: 2,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5
  },

  editIconButton: {
    borderRadius: 50,
    position: 'absolute',
    bottom: 30,
    right: 10,
    width: 28,
    height: 28,
    backgroundColor: constantData.colors.primary,
    padding: 4,
    justifyContent: "center"
  },

  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  profileImg: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderRadius: 100/ 2,
    marginTop: 15,
    marginBottom:30,
    borderColor: "#eee",
  },

  name: {
    fontSize: 14,
    color: 'black',
    marginTop: 10,
  },

  text: {
    fontSize: 12,
    marginLeft: 20,
    marginRight: 20,
    color: constantData.colors.primary
  },

  description: {
    fontSize: 11,
    fontFamily: '',
    marginTop: 10,
    marginLeft: 18,
    marginRight: 18,
    textAlign: 'center',
  },

  saveButton: {
    width: "90%",
    alignSelf: "center",
    borderRadius: 4,
    marginTop: 15,
    justifyContent: "center",
    padding: 10,
    backgroundColor: constantData.colors.primary
  },

  saveButtonText: {
    color: "#fff",
    alignSelf: "center"
  },


  cancelButton: {
    padding: 10,
    marginBottom: 20
  },

  cancelButtonText: {
    color: constantData.colors.primary, alignSelf: "center"
  },

  modal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

  },

  modalContainer: {
    width: '100%',
    height: '100%',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },

  pickerText:{
    fontSize:20,
    margin:10
  },
  closeIcon:{
    position:'absolute',
    top:0,
    right:0,
    padding:10
  }

})