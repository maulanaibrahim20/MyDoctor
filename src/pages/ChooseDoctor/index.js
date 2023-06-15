import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Header, List} from '../../components';
import {DummyDoctor1, baseUrl} from '../../assets';
import {colors} from '../../utils';
import axios from 'axios';

const ChooseDoctor = ({navigation, route}) => {
  const [spesialis, setSpesialis] = useState(null);

  useEffect(() => {
    const fetchSpesialis = async () => {
      try {
        const response = await axios.get(`${baseUrl.url}doctor`, {
          params: {id_spesialis: route.params.data.id},
        });
        setSpesialis(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    const debouncetimeout = setTimeout(() => {
      fetchSpesialis();
    }, 300);

    return () => clearTimeout(debouncetimeout);
  }, [route.params.data.id]);

  return (
    <View style={styles.page}>
      {spesialis == null ? (
        <ActivityIndicator />
      ) : (
        <View>
          {spesialis.length > 0 ? (
            <Header
              type="dark"
              title={'Pilih Dokter ' + spesialis[0].id_spesialis}
              onPress={() => navigation.goBack()}
            />
          ) : (
            <Header
              type="dark"
              title="Data Tidak Ada Silahkan Kembali"
              onPress={() => navigation.goBack()}
            />
          )}
        </View>
      )}
      {spesialis == null ? (
        <ActivityIndicator />
      ) : (
        <View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.listContainer}>
              {spesialis.map(item => {
                console.log(item);
                return (
                  <List
                    key={item.id}
                    type="next"
                    profile={{
                      uri: `http://192.168.43.123:8000/images_doctor/${item.image}`,
                    }}
                    name={item.name}
                    desc={item.jenis_kelamin}
                    onPress={() =>
                      navigation.navigate('DoctorProfile', {
                        data: item,
                      })
                    }
                    style={styles.listItem}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default ChooseDoctor;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  listContainer: {
    flexDirection: 'column',
  },
  listItem: {
    marginRight: 16,
  },
});
