import React, { StyleSheet, Dimensions } from 'react-native';



export default StyleSheet.create({
	verfifyOtpInput: {
		margin: 5,
		fontSize: 24,
		textAlign: "center",
		borderBottomWidth: 1,
		borderBottomColor: "#000",
		width: '10%'
	},


	verifyHeaderText: {
		color: "#000",
		fontSize: 15,
		marginBottom:10
	},


	emailText: {
		color: "#ffc107",
		fontSize: 14,
		fontWeight: "bold",
	},


	errorText: {
		color: 'red'
	},


	inputContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		marginTop:40
	},

	button: {
		width: '90%',
		marginBottom: 20,
		padding: 8,
		alignSelf: "center",
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center"
	},

	container: {
		
		alignItems: "center",
		width: '100%',
		flex:1,
		backgroundColor:'#fff',

	},
	logo: {
		width: 220,
		height: 120,
		alignSelf: "center",
		marginBottom:20,
		marginTop:20
	},

	buttonContainer: {
		width: '100%',
		justifyContent: 'center',
		marginBottom: 20,
		alignItems: 'center'
	},


	displayText: {
		width: "90%",
		marginTop: 10,
		marginBottom:20,
		color: "grey",
		textAlign: "center",
		fontSize: 12
	}
})