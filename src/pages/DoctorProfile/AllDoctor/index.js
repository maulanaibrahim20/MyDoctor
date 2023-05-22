import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Text,
} from 'react-native';
import {DummyDoctor1} from '../../../assets';
import {Gap, Header, RatedDoctor} from '../../../components';
import {colors} from '../../../utils';
import axios from 'axios';

const AllDoctor = ({navigation}) => {
  const [doctor, setdoctor] = useState(null);

  useEffect(() => {
    fetchDoctor();
  }, []);

  const fetchDoctor = async () => {
    await axios
      .get('http://192.168.43.123:8000/api/alldoctor', {})
      .then(result => {
        // console.log(result.data.data);
        setdoctor(result.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.page}>
      <Header title="All Doctor" onPress={() => navigation.goBack()} />
      <Gap height={10} />
      <ScrollView style={styles.content}>
        {doctor == null ? (
          <ActivityIndicator />
        ) : (
          doctor.map(doctor => {
            return (
              <View key={doctor.id}>
                <RatedDoctor
                  name={doctor.name}
                  desc={doctor.spesialis}
                  avatar={DummyDoctor1}
                  onPress={() =>
                    navigation.navigate('DoctorProfile', {data: doctor})
                  }
                />
                <View
                  style={{
                    borderColor: colors.border,
                    borderWidth: 1,
                    marginBottom: 10,
                  }}
                />
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};
export default AllDoctor;
const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    borderRadius: 20,
    // flex: 1,
    marginTop: -30,
    paddingTop: 14,
  },
});
