import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Gap, Header, List, Profile} from '../../components';
import {colors} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DummyUser} from '../../assets';

const UserProfile = ({navigation, route}) => {
  const logout = () => {
    try {
      AsyncStorage.removeItem('userdata');
      AsyncStorage.removeItem('user');
      AsyncStorage.removeItem('loggin');

      navigation.replace('GetStarted');
    } catch (error) {
      console.log(error);
    }
  };
  const detail = route.params.data;

  return (
    <View style={styles.page}>
      <Header title="Profile" onPress={() => navigation.goBack()} />
      <Gap height={10} />
      <Profile name={detail.name} desc={detail.profession} image={DummyUser} />
      <Gap height={14} />
      <List
        name="Edit Profile"
        desc="Last Update Yesterday"
        type="next"
        icon="edit-profile"
        onPress={() => navigation.navigate('UpdateProfile')}
      />
      <List
        name="Language"
        desc="Last Update Yesterday"
        type="next"
        icon="language"
      />
      <List
        name="Give Us Rate"
        desc="Last Update Yesterday"
        type="next"
        icon="rate"
      />
      <List
        onPress={() => {
          logout();
        }}
        name="Logout"
        type="next"
        icon="logout"
      />
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
