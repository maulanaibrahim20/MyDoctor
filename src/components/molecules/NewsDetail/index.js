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
  const formatDate = dateString => {
    const date = new Date(dateString);
    const options = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    return date.toLocaleDateString('id-ID', options);
  };
  const formattedDate = formatDate(route.params.data.created_at);
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
        <Gap height={230} />
        <Text
          style={{
            color: 'black',
            textAlign: 'left',
            marginLeft: 20,
            fontFamily: fonts.primary[400],
            fontSize: 15,
          }}>
          dipublish pada tanggal : {formattedDate}
        </Text>
        <Text
          style={{
            color: 'black',
            textAlign: 'left',
            marginLeft: 20,
            fontFamily: fonts.primary[600],
            fontSize: 15,
          }}>
          Oleh: Admin
        </Text>
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
    height: 260,
    paddingTop: 30,
  },
  content: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flex: 1,
  },
  news: {
    color: colors.black,
    fontSize: 27,
    textAlign: 'left',
    paddingTop: 10,
    marginHorizontal: 20,
    fontFamily: fonts.primary[700],
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
