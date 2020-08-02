import React, { StyleSheet, Dimensions, Platform } from 'react-native';
import constantData from '../../JS/constant';



export default StyleSheet.create({

	listContainer:{
		paddingBottom:10,
		flex:1,
		backgroundColor:'#fff'
	},

	header: {
		borderBottomColor: '#e0e0e0',
		borderBottomWidth: 1,
		width: '100%',
		flexDirection: 'row',
		// marginTop: (Dimensions.get('window').width > 400) ? (Platform.OS == 'ios' ? 40 : 5) : (Platform.OS == 'ios' ? 20 : 5),
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 100,
		padding: 10
	},
	headerText: {
		fontSize: 18
	},

	loaderContainer: {
		width: '100%',
		height: Dimensions.get('window').height - 100,
		justifyContent: 'center',
		alignItems: 'center'
	},

	mainContainer: {
		width: '90%',
		alignSelf:'center',
		borderBottomColor: '#eee',
		borderBottomWidth: 2,
		paddingBottom: 15,
	},

	card: {
		width: '100%',
		borderRadius: 2,
		borderColor: 'grey',
		backgroundColor: 'white',
		justifyContent: "center",
		overflow: "hidden"
	},

	thumbnail: {
		backgroundColor: 'black',
		width: '100%',
		height: 110,
	},


	videoContainer: {
		width: '100%',
		flexDirection: 'row',
	},

	container: {
		width: 100,
		marginBottom: 0,
		marginLeft: 4,

	},

	topUserInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 10,
	},
	userImg: {
		width: 35,
		height: 35,
		borderRadius: 35 / 2,
		borderColor: constantData.colors.primary,
		borderWidth: 2,
		marginRight: 10
	},

})