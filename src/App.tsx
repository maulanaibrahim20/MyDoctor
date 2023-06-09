import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import Router from './router';
import FlashMessage from 'react-native-flash-message';
import { Loading } from './components';
import { Provider } from 'react-redux';
import store from './redux/store';

export default function App() {
  const [loading, setloading] = useState(false);
  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
      {loading && <Loading />}
    </>
  );
}

