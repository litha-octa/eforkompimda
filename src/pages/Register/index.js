import React, {useState} from 'react';

import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  CheckBox,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {SplashImg} from '../../assets/img';
import {auth} from '../../firebase/config';

const Register = ({navigation}) => {
  const [isSelected, setSelection] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPass, setShowPass] = useState(false);
  const [confirmPass, setConfirmPass] = useState(false);
  const shownHandler = () => {
    if (showPass === false) {
      setShowPass(true);
    } else {
      setShowPass(false);
    }
  }
  const shownHandler2 =()=>{ 
    if (confirmPass === false){
      setConfirmPass(true)
    }else{
      setConfirmPass(false)
    }
  };

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }else{
      auth
        .createUserWithEmailAndPassword(`${email}@email.com`, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log('Registered with:', user.email);
          alert('Pendaftaran berhasil !')
          setEmail('');
          setPassword('');
          navigation.navigate('Login');
        })
        .catch((error) => alert(error.message));
    };
  };
  return (
    <View style={styles.background}>
      <View style={styles.form}>
        <Image source={SplashImg} style={styles.logo} />
        {/* <TextInput
          style={styles.input}
          placeholder={'Nama Lengkap'}
          onChangeText={(text) => setFullName(text)}
          value={fullName}
        /> */}
        <KeyboardAvoidingView>
          <ScrollView>
            <View
              style={{
                flexDirection: 'row',
                width: '82%',
                alignItems: 'center',
                marginLeft: 30,
                borderBottomColor: 'black',
                borderBottomWidth: 2,
              }}>
              <TextInput
                style={styles.input}
                placeholder={'NIK'}
                onChangeText={(text) => setEmail(text)}
                value={email}
                keyboardType={'numeric'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '82%',
                alignItems: 'center',
                marginLeft: 30,
                borderBottomColor: 'black',
                borderBottomWidth: 2,
              }}>
              <TextInput
                style={styles.input}
                placeholder={'Password'}
                secureTextEntry={showPass == false ? true : false}
                onChangeText={(text) => setPassword(text)}
                value={password}
              />
              <Icon
                name={showPass === false ? 'eye' : 'eye-slash'}
                onPress={shownHandler}
                size={25}
                color="grey"
                style={{marginTop: 10, marginLeft: 20}}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '82%',
                alignItems: 'center',
                marginLeft: 30,
                borderBottomColor: 'black',
                borderBottomWidth: 2,
              }}>
              <TextInput
                style={styles.input}
                placeholder={'Konfirmasi Password'}
                secureTextEntry={confirmPass == false ? true : false}
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPassword}
              />
              <Icon
                name={confirmPass === false ? 'eye' : 'eye-slash'}
                onPress={shownHandler2}
                size={25}
                color="grey"
                style={{marginTop: 10, marginLeft: 20}}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <View style={styles.checkbox}>
          <CheckBox value={isSelected} onValueChange={setSelection} />
          <Text style={styles.label}>
            Saya Menyetujui Syarat Ketentua dan Kebijakan Privasi
          </Text>
        </View>
        <TouchableOpacity style={styles.btn} onPress={onRegisterPress}>
          <Text style={styles.btnText}>Daftar</Text>
        </TouchableOpacity>
        <Text
          style={styles.help}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          Sudah Punya Akun ? Login Disini !
        </Text>
        <Text style={styles.help}>Bantuan</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    padding: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#a10b3a',
  },
  form: {
    backgroundColor: 'white',
    width: '94%',
    height: '10%',
    padding: 5,
    marginTop: '6%',
    flex: 1,
  },
  logo: {
    width: 200,
    height: 90,
    alignSelf: 'center',
    marginTop: 20,
    resizeMode: 'contain',
  },
  input: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 15,
    fontSize: 20,
  },
  btn: {
    width: '80%',
    height: '10%',
    borderRadius: 10,
    backgroundColor: 'maroon',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  checkbox: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 40,
    marginLeft: '8%',
  },
  label: {
    color: 'grey',
    fontSize: 15,
  },
  label2: {
    color: 'grey',
    fontSize: 15,
    marginLeft: '25%',
  },
  help: {
    color: 'grey',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 5,
  },
});
export default Register;
