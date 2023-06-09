import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ILLogo} from '../../assets';
import {colors, fonts} from '../../utils';
import {getData} from '../../utils/localStorage';

export default function Splash({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      getData('userdata')
        .then(response => {
          if (response == undefined) {
            navigation.replace('GetStarted');
          } else {
            navigation.replace('MainApp');
          }
        })
        .catch(error => {
          console.error(error);
        });
    }, 3000);
  });

  return (
    <View style={styles.page}>
      <ILLogo />
      <Text style={styles.title}>My Doctor</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 20,
  },
});
