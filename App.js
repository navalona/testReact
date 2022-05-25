
import React from 'react';
import { RootNavigator } from './src/navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import store from './src/store';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { Provider } from  'react-redux';

const App = () => {
  let persistor = persistStore(store);

 return (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <RootNavigator/>
        </NavigationContainer>
        </PersistGate>
    </Provider>

  
   
  );
};


export default App;
