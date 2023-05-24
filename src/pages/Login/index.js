import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ILLogo} from '../../assets';
import {Button, Gap, Input, Link} from '../../components';
import {colors, fonts, useForm} from '../../utils';
import {storeData} from '../../redux/store';
import axios from 'axios';
import {Fire} from '../../config';

export default function Login({navigation}) {
  const [form, setForm] = useForm({email: '', password: ''});

  const login = async () => {
    try {
      const {data} = await axios.post('http://192.168.43.123:8000/api/auth', {
        email: form.email,
        password: form.password,
      });

      const dataUser = {
        id: data.data.id,
        name: data.data.name,
      };

      // Fire.auth()
      //   .signInWithEmailAndPassword(data.data.email, form.password)
      //   .then(response => {
      //     Fire.database()
      //       .ref(`users/${response.user.uid}/`)
      //       .once('value')
      //       .then(responseDatabase => {
      //         if (responseDatabase.val()) {
      //           storeData('user', responseDatabase.val());
      //         }
      //       });
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });

      navigation.navigate('MainApp');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.page}>
      <ILLogo />
      <Text style={styles.title}>Masuk dan mulai berkonsultasi</Text>
      <Input
        label="Email Address"
        value={form.email}
        onChangeText={value => setForm('email', value)}
      />
      <Gap height={24} />
      <Input
        label="Password"
        value={form.password}
        onChangeText={value => setForm('password', value)}
        secureTextEntry
      />
      <Gap height={10} />
      <Link title="Forgot My Password" size={12} />
      <Gap height={40} />
      <Button title="Sign In" onPress={login} />
      <Gap height={30} />
      <Link
        title="Create New Account"
        size={16}
        align="center"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {padding: 40, flex: 1, backgroundColor: colors.white},
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 40,
    marginBottom: 40,
    maxWidth: 180,
  },
});
