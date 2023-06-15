import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {List} from '../../components';
import {colors, fonts} from '../../utils';
import {DummyDoctor4, DummyDoctor5, DummyDoctor6} from '../../assets';
import {Fire} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Messages({navigation}) {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      profile: DummyDoctor4,
      name: 'Alexander Jannie',
      desc: 'Baik ibu, terima kasih banyak atas wakt...',
    },
    {
      id: 2,
      profile: DummyDoctor5,
      name: 'Nairobi Putri Hayza',
      desc: 'Oh tentu saja tidak karena jeruk it...',
    },
    {
      id: 1,
      profile: DummyDoctor6,
      name: 'John McParker Steve',
      desc: 'Oke menurut pak dokter bagaimana unt...',
    },
  ]);

  const [user, setUser] = useState({});
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uuidUser = await AsyncStorage.getItem('uuidUser');
        const urlHistory = `messeges/${uuidUser}/`;

        Fire.database()
          .ref(urlHistory)
          .on('value', snapshot => {
            console.log('data histori:', snapshot.val());
            // if(snapShot.val()){

            // }
          });

        setData({uuid: uuidUser});
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Messages</Text>
        {doctors.map(doctor => {
          return (
            <List
              profile={doctor.profile}
              name={doctor.name}
              desc={doctor.desc}
              onPress={() => navigation.navigate('Chatting')}
            />
          );
        })}
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
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 39,
    marginLeft: 16,
  },
});
