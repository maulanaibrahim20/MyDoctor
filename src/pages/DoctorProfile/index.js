import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Gap, Header, Profile, ProfileItem} from '../../components';
import {colors} from '../../utils';
import {DummyUser} from '../../assets';

const DoctorProfile = ({navigation, route}) => {
  const detail = route.params.data;
  console.log(detail);
  // console.log(route.params.data);
  return (
    <View style={styles.page}>
      <Header title="Doctor Profile" onPress={() => navigation.goBack()} />
      <ScrollView>
        <Profile
          name={detail.name}
          desc={detail.id_spesialis}
          avatar={`http://192.168.43.123:8000/images_doctor/${detail.image}`}
        />
        <Gap height={10} />
        <ProfileItem label="Alumnus" value={detail.lulusan} />
        <ProfileItem label="Tempat Praktik" value={detail.id_hospital} />
        <ProfileItem label="No. STR" value={detail.no_str} />
        <View style={styles.action}>
          <Button
            title="Start Consultation"
            onPress={() => navigation.navigate('Chatting')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default DoctorProfile;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  action: {
    paddingHorizontal: 40,
    paddingTop: 23,
  },
});
