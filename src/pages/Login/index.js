import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {ILLogo} from '../../assets';
import {Button, Gap, Input, Link, Loading} from '../../components';
import {colors, fonts, showError, showSuccess, useForm} from '../../utils';
import {storeData} from '../../utils/localStorage';
import axios from 'axios';
import {Fire} from '../../config';

export default function Login({navigation}) {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const resetForm = () => {
    setForm({
      email: '',
      password: '',
    });
  };

  const handleInputChange = value => {
    setForm({...form, email: value});
    if (value === '') {
      setError('Email Tidak Boleh Kosong');
    } else {
      setError('');
    }
  };

  const handleInputPassword = value => {
    setForm({...form, password: value});
    if (value === '') {
      setErrorPassword('Password Tidak Boleh Kosong');
    } else {
      setErrorPassword('');
    }
  };

  const login = async () => {
    if (form.email.trim() === '' && form.password.trim() === '') {
      setError('Email Tidak Boleh Kosong');
      setErrorPassword('Password Tidak Boleh Kosong');
      return;
    } else {
      if (form.email.trim() === '') {
        setError('Email Tidak Boleh Kosong');
        return;
      } else if (form.password.trim() === '') {
        setErrorPassword('Password Tidak Boleh Kosong');
        return;
      }
    }

    setError('');
    setErrorPassword('');

    try {
      const {data} = await axios.post('http://192.168.43.123:8000/api/auth', {
        email: form.email,
        password: form.password,
      });
      const datauser = {
        id: data.data.id,
        name: data.data.name,
        profession: data.data.profession,
      };
      Fire.auth()
        .signInWithEmailAndPassword(data.data.email, form.password)
        .then(response => {
          Fire.database()
            .ref(`users/${response.user.uid}`)
            .once('value')
            .then(resfirebase => {
              if (resfirebase.val()) {
                storeData('user', resfirebase.val());
              }
            });
          setForm('reset');
        })
        .catch(error => {
          showError('gagal');
          // console.error(error);
        });
      storeData('userdata', datauser);
      storeData('loggin', 'true');
      navigation.replace('MainApp');
      resetForm();
      showSuccess('Good Job, Login Success');
    } catch (error) {
      showError('Email atau Password anda Salah atau Tidak Terdaftar');
      // console.error(error);
    }
    try {
      const {data} = await axios.post('http://192.168.43.123:8000/api/auth', {
        email: form.email,
        password: form.password,
      });
      // console.log(data);
    } catch (error) {
      // showError('gagal');
      // console.error(error);
    }
  };
  return (
    <View style={styles.page}>
      <ILLogo />
      <Text style={styles.title}>Masuk dan mulai berkonsultasi</Text>
      <Input
        label="Email Address"
        value={form.email}
        onChangeText={handleInputChange}
      />
      {error != '' && (
        <View style={{marginHorizontal: 10, marginBottom: 5}}>
          <Text
            style={{
              color: 'red',
              fontSize: 12,
              fontWeight: 'bold',
            }}>
            * {error}
          </Text>
        </View>
      )}
      <Gap height={24} />
      <Input
        label="Password"
        value={form.password}
        secureTextEntry
        onChangeText={handleInputPassword}
      />
      {errorPassword != '' && (
        <View style={{marginHorizontal: 10, marginBottom: 5}}>
          <Text
            style={{
              color: 'red',
              fontSize: 12,
              fontWeight: 'bold',
            }}>
            * {errorPassword}
          </Text>
        </View>
      )}
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
