import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {DummyUser} from '../../../assets';
import {colors, fonts} from '../../../utils';

const HomeProfile = ({onPress, nama, profesi, avatar}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={avatar} style={styles.avatar} />
      <View>
        <Text style={styles.name}>{nama}</Text>
        <Text style={styles.proffession}>{profesi}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default HomeProfile;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
  proffession: {
    fontSize: 12,
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
  },
});
