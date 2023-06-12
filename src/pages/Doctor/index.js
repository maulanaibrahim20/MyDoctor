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
import {
  DummyDoctor1,
  DummyNews1,
  DummyUser,
  JSONCategoryDoctor,
  baseUrl,
} from '../../assets';
import {
  DoctorCategory,
  Gap,
  HomeProfile,
  NewsItem,
  RatedDoctor,
} from '../../components';
import {colors, fonts} from '../../utils';
import {getData} from '../../utils/localStorage';
import store from '../../redux/store';

export default function Doctor({navigation}) {
  const [doctors, setDoctors] = useState(null);
  const [artikel, setArtikel] = useState(null);
  const [spesialis, setSpesialis] = useState(null);
  const [profile, setProfile] = useState(null);
  const [user, setuser] = useState({});

  useEffect(() => {
    const debouncetimeout = setTimeout(() => {
      getdatauser();
      fetchDoctors();
      fetchArtikel();
      fetchProfile();
      fetchSpesialis();
    }, 300);

    return () => clearTimeout(debouncetimeout);
  }, [user.name, user.profession]);

  const getdatauser = () => {
    getData('userdata').then(response => {
      setuser(response);
    });
  };

  const fetchDoctors = async () => {
    await axios
      .get(`${baseUrl.url}doctor`, {
        params: {
          per_page: 3,
        },
      })
      // .get('http://10.0.167.39:8000/api/doctor', {})
      .then(result => {
        console.log(result.data.meta);
        setDoctors(result.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const fetchArtikel = async () => {
    console.log(baseUrl);
    await axios
      .get(`${baseUrl.url}news`, {})
      // .get('http://10.0.167.39:8000/api/news', {})
      .then(result => {
        setArtikel(result.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const fetchSpesialis = async () => {
    await axios
      .get(`${baseUrl.url}spesialis`, {})
      // .get('http://192.168.43.123:8000/api/spesialis', {})
      .then(result => {
        setSpesialis(result.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const fetchProfile = async () => {
    await axios
      .get('http://192.168.43.123:8000', {})
      .then(result => {
        setProfile(result.data.data);
      })
      .catch(err => {
        console.log(error);
      });
  };

  const formatDate = created_at => {
    const date = new Date(created_at);

    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('id-ID', options);
  };

  const created_at = '2023-06-12T09:15:30Z';
  const formattedDate = formatDate(created_at);

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <View style={styles.wrapperSection}>
          <Gap height={30} />
          <HomeProfile
            nama={user.name}
            profesi={user.profession}
            avatar={DummyUser}
            onPress={() =>
              navigation.navigate('UserProfile', {
                data: user,
              })
            }
          />
        </View>
        <ScrollView style={{marginVertical: 10}}>
          <View style={styles.wrapperSection}>
            <Text style={styles.welcome}>
              Mau Konsultasi dengan siapa hari ini?
            </Text>
          </View>
          {spesialis == null ? (
            <ActivityIndicator size={'large'} />
          ) : (
            <View style={styles.wrapperScroll}>
              <ScrollView horizontal showHorizontalScrollIndicator={false}>
                <View style={styles.category}>
                  <Gap width={32} />
                  {spesialis.map(item => {
                    return (
                      <DoctorCategory
                        key={item.id}
                        category={item.spesialis}
                        onPress={() =>
                          navigation.navigate('ChooseDoctor', {data: item})
                        }
                      />
                    );
                  })}
                  <Gap width={22} />
                </View>
              </ScrollView>
            </View>
          )}
          <View style={[styles.wrapperSection]}>
            <View
              style={{flexDirection: 'row', marginTop: 30, marginBottom: 25}}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={[styles.sectionLabel]}>Top Rated Doctors</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('AllDoctor')}
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      color: colors.black,
                      fontSize: 13,
                      fontFamily: fonts.primary[600],
                      color: colors.text.secondary,
                    }}>
                    All Doctor
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {doctors == null ? (
              <ActivityIndicator />
            ) : (
              doctors.map(item => {
                return (
                  <RatedDoctor
                    key={item.id}
                    name={item.name}
                    desc={item.id_spesialis}
                    avatar={`http://192.168.43.123:8000/images_doctor/${item.image}`}
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
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.sectionLabel}>Good News</Text>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('AllNews')}
                  style={{
                    paddingHorizontal: 15,
                    // paddingVertical: 5,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      color: colors.black,
                      fontSize: 13,
                      fontFamily: fonts.primary[600],
                      color: colors.text.secondary,
                    }}>
                    All News
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Gap height={10} />
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
                      tanggal={formattedDate}
                      avatar={`http://192.168.43.123:8000/images_news/${item.image}`}
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
  },
});
