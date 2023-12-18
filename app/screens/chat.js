import React, { useContext, useState, useEffect } from 'react';
import { Stack, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  ActivityIndicator,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import { COLORS, SIZES, icons } from '../../constants';
import { ScreenHeaderBtn } from '../../components';
import { styles } from '../../components/common/header/screenheader.style';

const stylesChat = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  messageContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    paddingLeft: 10,
  },
  sendButton: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

const Chat = () => {
  const { userInfo, isLoading, logout } = useContext(AuthContext);
  // console.log({ userInfo });
  const [username, setUsername] = useState('');
  const [chat, setChat] = useState({});

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [chatExists, setChatExists] = useState(false);

  const getUsername = async () => {
    try {
      const response = await axios.get(
        'https://answers-ccff058443b8.herokuapp.com/api/v1',
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.jwt_token,
          },
        }
      );

      setUsername(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const createChat = async () => {
    try {
      const response = await axios.put(
        `https://answers-ccff058443b8.herokuapp.com/api/v1/chats?user_id=${userInfo.id}`,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.jwt_token,
          },
        }
      );

      let chatInfo = response.data;
      setChat(chatInfo);
      console.log(chatInfo);

      // Save chatInfo to AsyncStorage
      await AsyncStorage.setItem('chatInfo', JSON.stringify(chatInfo));

      return chatInfo;
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const isChatExists = async () => {
    try {
      let chatInfo = await AsyncStorage.getItem('chatInfo');

      if (chatInfo) {
        chatInfo = JSON.parse(chatInfo);
        setChat(chatInfo);
        console.log(chatInfo);
        //console.log(chat);

        return chatInfo;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  };

  const sendMessage = async () => {
    try {
      const response = await axios.post(
        `https://answers-ccff058443b8.herokuapp.com/api/v1/${chat.id}/chat_messages?user_question=${newMessage}`,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.jwt_token,
          },
        }
      );

      // Add new message to the state
      setMessages([
        ...messages,
        {
          id: response.data.id,
          userQuestion: newMessage,
          aiResponse: response.data.aiResponse,
        },
      ]);
      // Clear the input field
      setNewMessage('');
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const fetchMessages = async (chat) => {
    const response = await axios.get(
      `https://answers-ccff058443b8.herokuapp.com/api/v1/${chat.id}/chat_messages`,
      {
        headers: {
          Authorization: 'Bearer ' + userInfo.jwt_token,
        },
      }
    );

    setMessages(response.data.chat_messages);
    console.log(response.data);
  };

  useEffect(() => {
    console.log('in chat');
    getUsername();

    const fetchData = async () => {
      try {
        // Retrieve chat information from AsyncStorage
        let chat = await isChatExists();

        // If chat exists, setMessages
        if (chat !== null) {
          fetchMessages(chat);
        } else {
          // If chat doesn't exist, create a new chat
          console.log('1');
          chat = await createChat();
          fetchMessages(chat);
        }
      } catch (error) {
        console.error(error.response.data);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={stylesChat.container}>
      <Spinner visible={isLoading} />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.red2 },
          headerShadowVisible: false,
          statusBarColor: COLORS.darkBlue,
          // headerLeft: () => (
          //   <ScreenHeaderBtn
          //     iconUrl={icons.left}
          //     dimension="60%"
          //     handlePress={() => {
          //       router.replace('./logreg');
          //     }}
          //   />
          // ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="100%" />
          ),
          headerTitle: '',
        }}
      />

      <Text>{username}</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={stylesChat.messageContainer}>
            <View style={{ /*flexDirection: 'row',*/ marginTop: 20 }}>
              <Text style={[stylesChat.messageText, { color: COLORS.red2 }]}>
                You{' '}
              </Text>
              <Text style={stylesChat.messageText}>{item.userQuestion}</Text>
            </View>

            <View style={{ /*flexDirection: 'row',*/ marginTop: 20 }}>
              <Text style={[stylesChat.messageText, { color: COLORS.blue }]}>
                Chat{' '}
              </Text>
              <Text style={stylesChat.messageText}>{item.aiResponse}</Text>
            </View>
          </View>
        )}
      />
      <View style={stylesChat.inputContainer}>
        <TextInput
          style={stylesChat.input}
          placeholder="Type your message"
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
        />
        <TouchableOpacity style={stylesChat.sendButton} onPress={sendMessage}>
          <Text style={stylesChat.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;
