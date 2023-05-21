import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import Header from '../Header';
import {colors, fonts} from '../../../utils';
import {DummyDoctor1, DummyNews4, ILHospitalBG} from '../../../assets';
import {Gap} from '../../atoms';

const NewsDetail = ({route, navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title="News Detail" onPress={() => navigation.goBack()} />
      <ScrollView>
        <ImageBackground source={ILHospitalBG} style={styles.background}>
          <Text style={styles.text}>News</Text>
          <Text style={styles.desc}>Always Up to Date</Text>
        </ImageBackground>
        <View styles={styles.content}>
          <Text style={styles.news}>{route.params.data.title}</Text>
          <Text style={styles.description}>
            {route.params.data.description}
          </Text>
        </View>
        <Gap height={30} />
        <Image
          source={DummyNews4}
          style={{width: '100%', height: 300}}
          resizeMode="cover"
        />
        <Text style={{color: 'red', fontSize: 50}}>Hamdan</Text>
      </ScrollView>
    </View>
  );
};

export default NewsDetail;
const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
  },
  text: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.white,
    textAlign: 'center',
  },
  desc: {
    fontSize: 14,
    fontFamily: fonts.primary[300],
    color: colors.white,
    marginTop: 6,
    textAlign: 'center',
  },
  background: {
    height: 180,
    paddingTop: 30,
  },
  content: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flex: 1,
    fontFamily: fonts.primary,
  },
  news: {
    color: colors.black,
    fontSize: 27,
    textAlign: 'justify',
    paddingTop: 10,
    marginHorizontal: 20,
    fontFamily: fonts.primary[600],
  },
  description: {
    paddingTop: 20,
    color: colors.black,
    marginHorizontal: 20,
    textAlign: 'justify',
    fontFamily: fonts.primary[600],
  },
  image: {
    height: 240,
  },
});
