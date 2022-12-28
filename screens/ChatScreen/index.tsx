import _ from "lodash";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import AntDesign from "@expo/vector-icons/build/AntDesign";
import { Avatar } from "react-native-elements";
import { GiftedChat } from 'react-native-gifted-chat';

import { db, auth } from '../../service/firebase';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../types";

type Message = {
  _id: number,
  text: string,
  createdAt: Date,
  user: {
    _id: number,
    name: string,
    avatar: string,
  },
}

type MyProps = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export default function ChatScreen({ navigation }: MyProps) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, []);

  useLayoutEffect(() => {
    const chatsCollectionRef = collection(db, 'chats');
    const q = query(chatsCollectionRef, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot( q, (querySnapshot) => {
      const firestoreMessages: Message[] = [];
      querySnapshot.forEach((doc) => {
        firestoreMessages.push({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        });
      });
      setMessages(firestoreMessages);
    });
    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        const uri = _.get(auth, 'currentUser.photoURL', null);
        return (
          <View style={{ marginLeft: 20 }}>
            <Avatar
              rounded
              source={uri ? { uri } : {}}
            />
          </View>
        );
      },
      headerRight: () => {
        return (
          <TouchableOpacity
            style={{
              marginRight: 10
            }}
            onPress={logout}
          >
            <AntDesign name="logout" size={24} color="black" />
          </TouchableOpacity>
        );
      }
    });
  }, [navigation]);

  const logout = () => {
    auth.signOut()
      .then(
        () => {
          // Sign-out successful.
          // alert(`Sign Out User SUCCESS.`);
          navigation.replace("Login");
        },
        (err) => {
          alert(`Sign Out User FAILED, ERR:- ${err.message}`);
        }
      );
  }

  const onSend = useCallback((newMessages: Message[] = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    const {
      _id,
      createdAt,
      text,
      user,
    } = newMessages[0];

    const chatsCollectionRef = collection(db, 'chats');
    addDoc(chatsCollectionRef, {
      _id,
      createdAt,
      text,
      user
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={newMessages => onSend(newMessages)}
      user={{
        _id: _.get(auth, "currentUser.email", -1),
        name: _.get(auth, "currentUser.displayName", ""),
        avatar: _.get(auth, "currentUser.photoURL", "https://www.trackergps.com/canvas/images/icons/avatar.jpg"),
      }}
    />
  );
}

