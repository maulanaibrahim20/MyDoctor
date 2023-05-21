import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {DummyHospital1, DummyHospital4, DummyHospital5} from '../../assets';
import {ListHospital} from '../../components';
import {colors, fonts} from '../../utils';

export default function Hospitals() {
  const [hospitals, setHospitals] = useState(null);
  const [counts, setCounts] = useState(null);

  useEffect(() => {
    fetchHospitals();
    fetchCounts();
  }, []);

  const fetchHospitals = async () => {
    await axios({
      url: 'http://192.168.43.123:8000/api/hospital',
      method: 'GET',
    })
      .then(response => {
        setHospitals(response.data.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const fetchCounts = async () => {
    await axios({
      url: 'http://192.168.43.123:8000/api/counting',
      method: 'GET',
    })
      .then(response => {
        console.log(response.data.jumlah_data[0].hospital);
        setCounts(response.data.jumlah_data[0].hospital);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.page}>
      <ImageBackground source={DummyHospital4} style={styles.background}>
        <Text style={styles.title}> Rumah Sakit Yang Tersedia</Text>
        <Text style={styles.desc}> {counts} Tersedia</Text>
      </ImageBackground>
      <View style={styles.content}>
        <ScrollView>
          {hospitals == null ? (
            <ActivityIndicator />
          ) : (
            hospitals.map(item => {
              return (
                <ListHospital
                  key={item.id}
                  type={item.name}
                  address={item.address}
                  pic={DummyHospital1}
                />
              );
            })
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    height: 240,
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[900],
    color: '#E8AA42',
    textAlign: 'center',
  },
  desc: {
    fontSize: 12,
    fontFamily: fonts.primary[900],
    textAlign: 'center',
    color: '#D0F5BE',
    marginTop: 6,
  },
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    borderRadius: 20,
    flex: 1,
    marginTop: -30,
    paddingTop: 14,
  },
});
