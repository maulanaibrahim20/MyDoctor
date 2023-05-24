import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ILLogo} from '../../assets';
import {Button, Gap, Input, Link} from '../../components';
import {colors, fonts, useForm} from '../../utils';

export default function Login({navigation}) {
  const [form, setForm] = useForm({email: '', password: ''});

  const login = () => {
    console.log('form: ', form);
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
