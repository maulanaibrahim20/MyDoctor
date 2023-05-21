import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DummyDoctor1, DummyNews1, JSONCategoryDoctor} from '../../assets';
import {
  DoctorCategory,
  Gap,
  HomeProfile,
  NewsItem,
  RatedDoctor,
} from '../../components';
import {colors, fonts} from '../../utils';

export default function Doctor({navigation}) {
  const [doctors, setDoctors] = useState(null);
  const [artikel, setArtikel] = useState(null);

  useEffect(() => {
    fetchDoctors();
    fetchArtikel();
  }, []);

  const fetchDoctors = async () => {
    await axios
      .get('http://192.168.43.123:8000/api/doctor', {})
      .then(result => {
        setDoctors(result.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const fetchArtikel = async () => {
    await axios
      .get('http://192.168.43.123:8000/api/news', {})
      .then(result => {
        setArtikel(result.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <View style={styles.wrapperSection}>
          <Gap height={30} />
          <HomeProfile onPress={() => navigation.navigate('UserProfile')} />
        </View>
        <ScrollView style={{marginVertical: 10}}>
          <View style={styles.wrapperSection}>
            <Text style={styles.welcome}>
              Mau Konsultasi dengan siapa hari ini?
            </Text>
          </View>
          <View style={styles.wrapperScroll}>
            <ScrollView horizontal showHorizontalScrollIndicator={false}>
              <View style={styles.category}>
                <Gap width={32} />
                {JSONCategoryDoctor.data.map(item => {
                  return (
                    <DoctorCategory
                      key={item.id}
                      category={item.category}
                      onPress={() => navigation.navigate('ChooseDoctor')}
                    />
                  );
                })}
                <Gap width={22} />
              </View>
            </ScrollView>
          </View>
          <View style={[styles.wrapperSection]}>
            <Text style={[styles.sectionLabel, {marginTop: 30}]}>
              Top Rated Doctors
            </Text>
            {doctors == null ? (
              <ActivityIndicator />
            ) : (
              doctors.map(item => {
                return (
                  <RatedDoctor
                    key={item.id}
                    name={item.name}
                    desc={item.spesialis}
                    avatar={DummyDoctor1}
                    onPress={() =>
                      navigation.navigate('DoctorProfile', {
                        data: item,
                      })
                    }
                  />
                );
              })
            )}
            <Gap height={20} />
            <Text style={styles.sectionLabel}>Good News</Text>
          </View>
          <View style={[styles.wrapperSection, {flex: 1}]}>
            {artikel == null ? (
              <ActivityIndicator />
            ) : (
              artikel.map(item => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      navigation.navigate('NewsDetail', {
                        data: item,
                      });
                    }}>
                    <NewsItem
                      name={item.title}
                      description={item.description}
                      image={DummyNews1}
                    />
                  </TouchableOpacity>
                );
              })
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  wrapperSection: {
    paddingHorizontal: 16,
  },
  welcome: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
    maxWidth: 220,
  },
  category: {
    flexDirection: 'row',
  },
  wrapperScroll: {
    marginHorizontal: -16,
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    // marginTop: 20,
    marginBottom: 16,
  },
});
