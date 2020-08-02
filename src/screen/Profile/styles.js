import React, {StyleSheet,Dimensions} from 'react-native';
import constantData from '../../JS/constant';



export default StyleSheet.create({

	container:{
		width: "100%",
		height: 20,
		height: Dimensions.get('window').height,
		justifyContent: "center"
	},

	mainContainer:{
		paddingBottom: 20,
		justifyContent: 'center'
	},

	header:{
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 10,
		// marginTop:20 
	},

	iconButton:{
		padding:10,
	},

	editButton:{
		borderRadius: 50,
		width: 40,
		height: 40,
		backgroundColor: constantData.colors.primary,
		padding: 4,
		justifyContent: "center" 
	},

	profileImg: {
		width: 100,
		height: 100,
		borderWidth: 2,
		borderRadius: 100/2,
		marginTop: 25,
		alignSelf: "center",
		overflow: "hidden",
		borderColor: "#eee"
	},

	profileStatus:{
		flexDirection:"row",
		paddingBottom:10,
		justifyContent:"space-around"
	},

	userInfo:{
		flexDirection: 'row',
		alignSelf: "center",
		marginTop: 25,
		justifyContent: 'flex-start',
	},


	infoText:{
		width: '80%',
		marginLeft: 15,
		borderBottomColor: 'grey',
		borderBottomWidth: 0.5
	},

	icon:{
		width: 38,
		height: 38,
		justifyContent: 'center',
		borderRadius: 50,
		backgroundColor: constantData.colors.primary
	},


	iconStyle:{
		alignSelf: 'center',
		color: '#fff'
	},


	headerFont:{
		fontSize: 10, 
	},


	inputValue:{
		color: 'black',
		fontSize: 12,
		marginRight: 10 
	},

	textConatiner:{
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},

	line:{
		width: '30%',
		borderBottomColor: 'grey',
		borderBottomWidth: 0.5,
	},
	
	name: {
		fontSize: 14,
		color: 'black',
		marginTop: 10,
		alignSelf: "center",
	},

	text: {
		fontSize: 12,
		marginLeft: 20,
		marginRight: 20,
		color: constantData.colors.primary
	},

	description: {
		fontSize: 14,
		marginTop: 8,
		marginLeft: 18,
		marginRight: 18,
		color:'grey',
		textAlign: 'center',
		alignSelf: "center",
	},

	count:{
		textAlign:"center"
	},

	headerText:{
		fontSize: 20,
		letterSpacing:1
	},


	iconAlign:{
		alignSelf: "center" 
	},
	
	card: {
		width: 150,
		// height:100,
		borderRadius: 5,
		borderColor: 'grey',
		// backgroundColor: 'white',
		justifyContent: "flex-start",
		marginLeft: 10,
		overflow: "hidden"
	},

	thumbnail: {
		backgroundColor: 'black',
		width: 150,
		height: 95,
		borderRadius: 5,

	},
	
	gridView: {
		backgroundColor: 'blue',
		flexDirection: 'row',
		width: '100%',
		overflow: 'scroll'
	},

	mediaText:{
		textAlign: 'left',
		fontSize: 18,
		marginLeft:15,
		marginBottom:15,
		marginTop:20,
	},

	videoContainer:{
		width: '100%',
		flexDirection: 'row',
		marginBottom:40, 
	},


	playVideoButton:{
		position: "absolute",
		alignItems: "center",
		height: '100%',
		justifyContent: "center",
		alignSelf: "center"
	},


	mainAudioContainer:{
		width: '100%',
		marginBottom:50,
		borderBottomColor: "#eee",
		paddingBottom: 20,
		borderBottomWidth: 2,
		flexDirection: 'row'
	},

	audioContainer:{
		width:120,
		marginRight:20,
		marginLeft:10,
		marginTop:15,
		marginBottom:20
	},

	audioPlayButtonContainer:{
		width:'100%',
		height:90,
		justifyContent:"center",
		alignItems:"center",
		justifyContent:"center",
	},

	audioPlayButton:{
		backgroundColor: 'rgba(52, 52, 52, 0.8)',
		borderRadius:5,
		paddingTop:6,
		paddingBottom:6,
		paddingLeft:10,
		paddingRight:10
	},

	audioTextContainer:{
		width:'98%',
		overflow:"hidden",
		marginLeft:5,
		alignSelf:"center",
	}



  
})