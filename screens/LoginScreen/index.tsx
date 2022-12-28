import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from '../../service/firebase';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../types";

type MyProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: MyProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // alert("User Logged In");
        navigation.replace('Chat');
      }
    });
    return unsubscribe;
  }, []);

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(
        (userCredential) => {
          // Login 
          // alert(`Login User SUCCESS.`);
          // const user = userCredential.user;
        },
        (err) => {
          alert(`Login User FAILED, ERR:- ${err.message}`)
        }
      );
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder='Enter your email'
        label='Email'
        leftIcon={{ type: 'material', name: 'email' }}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        placeholder='Enter your password'
        label='Password'
        leftIcon={{ type: 'material', name: 'lock' }}
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <Button 
        title="Login"
        buttonStyle={styles.button}
        onPress={login}
      />
      <Button 
        title="Register"
        type="clear"
        buttonStyle={styles.button}
        onPress={() => navigation.replace('Register')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10
  },
  button: {
    width: 200,
    marginTop: 10
  }
});
