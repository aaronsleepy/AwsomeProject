import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import GeneIcon from '../assets/gene-icon.svg';
import { createUser, validateUser } from '../db/memoryDb';
import { login } from '../redux/slices/authSlice';
import { Platform } from 'react-native';
import Toast from 'react-native-toast-message';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('알림', '이메일과 비밀번호를 입력해주세요.');
      return;
    }
    try {
      const user = validateUser(email, password);
      dispatch(login({ id: user.id, email: user.email }));
      navigation.replace('Main');
    } catch (error) {
      Alert.alert('로그인 실패', error.message, { cancelable: true });
    }
  };

  const handleSignup = async () => {
    if (!email || !password) {
      Alert.alert('알림', '이메일과 비밀번호를 입력해주세요.');
      return;
    }
    try {
      const user = createUser(email, password);
      
      Toast.show({
        type: 'success',
        text1: '회원가입 성공',
        text2: '로그인 후 사용해주세요.',
      });
    } catch (error) {
      Alert.alert('회원가입 실패', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={[styles.container, styles.inputForm]}>
        <GeneIcon width={45} height={45} />
        <View style={styles.inputContainer}>
            <TextInput placeholder='이메일' value={email} onChangeText={setEmail} style={styles.input}/>
            <TextInput placeholder='패스워드' value={password} onChangeText={setPassword} style={styles.input} secureTextEntry/>
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>로그인</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonOutline]} onPress={handleSignup}>
                <Text style={[styles.buttonOutlineText]}>회원가입</Text>
            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f8fa'
  },
  inputForm: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    marginTop: 15,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  button: {
    backgroundColor: 'black',
    width: '50%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: 'black',
    borderWidth: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: 500,
    fontSize: 16,
  },
  buttonOutlineText: {
    color: 'black',
    fontWeight: 500,
    fontSize: 16,
  }
})
