/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {RootStack} from './src/Routes'
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './src/Reducers/reducer'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { PersistGate } from 'redux-persist/lib/integration/react';
import IsLoading from './src/Scenes/Components/isLoading'
// * PERSIST_CONFIG

const persistConfig = {
 key: 'root',
 storage: storage,
 stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

// * CREATING PERSIST REDUCER

const pReducer = persistReducer(persistConfig, reducer);

// * CREATING REDUX STORE

export const store = createStore(pReducer,applyMiddleware(thunk));
export const persistor = persistStore(store);


export default class App extends Component<Props> {
  render() {
    return (

    <Provider store={store}>
      <PersistGate loading={<IsLoading />} persistor={persistor}>
      <RootStack/>
    </PersistGate>
    </Provider>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
