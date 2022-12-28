import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { auth } from '../../service/firebase';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../types";

type MyProps = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: MyProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // alert("User Logged In");
        navigation.replace('Chat');
      }
    });
    return unsubscribe;
  }, []);

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(
        (userCredential) => {
          // Register 
          alert(`Create User SUCCESS.`);
          const user = userCredential.user;
          return updateProfile(user, {
            displayName: name,
            photoURL: imageUrl ? imageUrl : "https://www.trackergps.com/canvas/images/icons/avatar.jpg"
          });
        },
        (err) => {
          alert(`Create User FAILED, ERR:- ${err.message}`);
        }
      ).then(
        () => {
          // alert(`Update User profile SUCCESS.`);
        },
        (err) => {
          alert(`Update User profile FAILED, ERR:- ${err.message}`);
        }
      );
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder='Enter your name'
        label='Name'
        leftIcon={{ type: 'material', name: 'badge' }}
        value={name}
        onChangeText={text => setName(text)}
      />
      <Input
        placeholder='Enter your email'
        label='Email'
        leftIcon={{ type: 'material', name: 'email' }}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Input
        placeholder='Enter your password'
        label='Password'
        leftIcon={{ type: 'material', name: 'lock' }}
        value={password} onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <Input
        placeholder='Enter your image url'
        label='Profile Picture'
        leftIcon={{ type: 'material', name: 'face' }}
        onChangeText={text => setImageUrl(text)}
      />
      <Button
        title="Register"
        buttonStyle={styles.button}
        onPress={register}
      />
      <Button
        title="Login"
        type="clear"
        buttonStyle={styles.button}
        onPress={() => navigation.replace('Login')}
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
