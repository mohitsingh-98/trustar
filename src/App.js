import React, { Component } from 'react';
import AppContainer from './navigators/navigation';
import { Provider } from 'react-redux';
import store from './JS/Reducers/index';
import { SafeAreaView, Platform, StatusBar } from 'react-native';



const App = () => {
  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:'#fff' }}>
      <StatusBar barStyle="light-content" />

      <Provider store={store}>
        {Platform.OS == 'ios' &&
          <StatusBar barStyle="dark-content" />
        }
        <AppContainer />
      </Provider>
    </SafeAreaView>
  );
};



export default App;

