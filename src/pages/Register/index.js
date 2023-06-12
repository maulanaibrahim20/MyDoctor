import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, Gap, Header, Input, Loading} from '../../components';
import {colors, useForm} from '../../utils';
import axios from 'axios';
import {Fire} from '../../config';
import {showMessage} from 'react-native-flash-message';

export default function Register({navigation}) {
  const [form, setForm] = useState({
    fullName: '',
    profession: '',
    email: '',
    password: '',
  });
  const [errorFullName, setErrorFullName] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorProfession, setErrorProfession] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

  const resetForm = () => {
    setForm({
      fullName: '',
      profession: '',
      email: '',
      password: '',
    });
  };

  //start Form handle untuk Validasi
  const handleFullNameChange = value => {
    setForm({...form, fullName: value});
    if (value === '') {
      setErrorFullName('Full Name Tidak Boleh Kosong');
    } else {
      setErrorFullName('');
    }
  };

  const handleProfessionChange = value => {
    setForm({...form, profession: value});
    if (value === '') {
      setErrorProfession('Profession Tidak Boleh Kosong');
    } else {
      setErrorProfession('');
    }
  };

  const handleEmailChange = value => {
    setForm({...form, email: value});
    if (value === '') {
      setErrorEmail('Email Tidak Boleh Kosong');
    } else {
      setErrorEmail('');
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
  //End Form handle untuk Validasi

  const onContinue = async () => {
    console.log(form);

    //start Validation
    if (
      form.email.trim() === '' &&
      form.password.trim() === '' &&
      form.profession.trim() === '' &&
      form.fullName.trim() === ''
    ) {
      setErrorFullName('Full Name Tidak Boleh Kosong');
      setErrorProfession('Profession/Pekerjaan Tidak Boleh Kosong');
      setErrorEmail('Email Tidak Boleh Kosong');
      setErrorPassword('Password Tidak Boleh Kosong');
      return;
    } else {
      if (form.email.trim() === '') {
        setErrorEmail('Email Tidak Boleh Kosong');
        return;
      } else if (form.password.trim() === '') {
        setErrorPassword('Password Tidak Boleh Kosong');
        return;
      } else if (form.profession.trim() === '') {
        setErrorProfession('Profession Tidak Boleh Kosong');
        return;
      } else if (form.fullName.trim() === '') {
        setErrorFullName('Full Name Tidak Boleh Kosong');
        return;
      }
    }

    setErrorFullName('');
    setErrorProfession('');
    setErrorEmail('');
    setErrorPassword('');

    //end Validation

    await axios
      // .post('http://10.0.167.39:8000/api/user', {
      .post('http://192.168.43.123:8000/api/user', {
        name: form.fullName,
        profession: form.profession,
        email: form.email,
        password: form.password,
      })
      .then(result => {
        Fire.auth()
          .createUserWithEmailAndPassword(form.email, form.password)
          .then(success => {
            const data = {
              fullName: form.fullName,
              profession: form.profession,
              email: form.email,
              password: form.password,
            };
            Fire.database()
              .ref('users/' + success.user.uid + '/')
              .set(data);
            navigation.navigate('Login');
            resetForm();
          })
          .catch(error => {
            // console.log(error);
            showMessage({
              message: error,
              type: 'default',
              backgroundColor: colors.error,
              color: colors.white,
            });
          });
      });
    // .catch(error => {
    //   console.log(error);
    // });
  };
  return (
    <View style={styles.page}>
      <Header onPress={() => navigation.goBack()} title="Daftar Akun" />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Input
            label="Full Name"
            value={form.fullName}
            onChangeText={handleFullNameChange}
          />
          {errorFullName != '' && (
            <View style={{marginHorizontal: 10, marginBottom: 5}}>
              <Text
                style={{
                  color: 'red',
                  fontSize: 12,
                  fontWeight: 'bold',
                }}>
                * {errorFullName}
              </Text>
            </View>
          )}
          <Gap height={24} />
          <Input
            label="Pekerjaan"
            value={form.profession}
            onChangeText={handleProfessionChange}
          />
          {errorProfession != '' && (
            <View style={{marginHorizontal: 10, marginBottom: 5}}>
              <Text
                style={{
                  color: 'red',
                  fontSize: 12,
                  fontWeight: 'bold',
                }}>
                * {errorProfession}
              </Text>
            </View>
          )}
          <Gap height={24} />
          <Input
            label="Email"
            value={form.email}
            onChangeText={handleEmailChange}
          />
          {errorEmail != '' && (
            <View style={{marginHorizontal: 10, marginBottom: 5}}>
              <Text
                style={{
                  color: 'red',
                  fontSize: 12,
                  fontWeight: 'bold',
                }}>
                * {errorEmail}
              </Text>
            </View>
          )}
          <Gap height={24} />
          <Input
            label="Password"
            value={form.password}
            onChangeText={handleInputPassword}
            secureTextEntry
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
          <Gap height={40} />
          <Button title="Continue" onPress={onContinue} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {padding: 40, paddingTop: 0},
});
