import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ChatItem, Header, InputChat} from '../../components';
import {colors, fonts, getChatTime, setDateChat} from '../../utils';
import {Fire} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DummyUser} from '../../assets';

const Chatting = ({navigation, route}) => {
  const dataDoctor = route.params.data;
  const userId = '';
  const [chatContent, setChatContent] = useState('');

  const [chatData, setChatData] = useState([]);

  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uuidUser = await AsyncStorage.getItem('uuidUser');
        const userRef = Fire.database().ref('users/' + uuidUser);
        const snapshot = await userRef.once('value');
        const data = snapshot.val();
        // const data = uuidUser;
        data.uuid = uuidUser;
        setUser(data);
        // console.log('ada', data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    fetchData();
    getDataChatting();
    // chatSend();
  }, [userId]);

  const getDataChatting = () => {
    const chatID = `${user.uuid}_${dataDoctor.id}`;
    const urlFirebase = `chatting/${chatID}/allChat/`;

    Fire.database()
      .ref(urlFirebase)
      .on('value', snapshot => {
        // console.log('data chat', snapshot.val());
        if (snapshot.val()) {
          const dataSnapshot = snapshot.val();
          const allDataChat = [];
          Object.keys(dataSnapshot).map(key => {
            const dataChat = dataSnapshot[key];
            const newDataChat = [];

            Object.keys(dataChat).map(itemChat => {
              newDataChat.push({
                id: itemChat,
                data: dataChat[itemChat],
              });
            });
            // Object.keys()

            allDataChat.push({
              id: key,
              data: newDataChat,
            });
          });
          console.log('all data chat:', allDataChat);
          setChatData(allDataChat);
        }
      });
  };

  //memulai fungsi  untuk proses chatting dan mengirim ke database
  const chatSend = () => {
    const today = new Date();

    const data = {
      sendBy: user.uuid,
      chatDate: today.getTime(),
      chatTime: getChatTime(today),
      chatContent: chatContent,
    };

    const chatID = `${user.uuid}_${dataDoctor.id}`;

    const urlFirebase = `chatting/${chatID}/allChat/${setDateChat(today)}`;
    const urlMessegeUser = `messeges/${user.uuid}/${chatID}`;
    const urlMessegeDoctor = `messeges/${dataDoctor.id}/${chatID}`;
    const dataHistoryForUser = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uuidPartner: dataDoctor.id,
    };
    const dataHistoryForDoctor = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uuidPartner: user.uuid,
    };

    // console.log('data untuk di kirim', data);
    // console.log('url firebase', urlFirebase);
    //proses pengiriman data
    Fire.database()
      .ref(urlFirebase)
      .push(data)
      .then(() => {
        setChatContent('');

        //set history for user
        Fire.database().ref(urlMessegeUser).set(dataHistoryForUser);

        //set history for doctor
        Fire.database().ref(urlMessegeDoctor).set(dataHistoryForDoctor);
      })
      .catch(err => {
        console.log(err);
      });
  };
  //end proses chatting dan menyimpan data ke firebase

  return (
    <View style={styles.page}>
      <Header
        title={dataDoctor.name}
        desc={dataDoctor.id_spesialis}
        avatar={`http://192.168.43.123:8000/images_doctor/${dataDoctor.image}`}
        type="dark-profile"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <ScrollView showVerticalScrollIndicator={false}>
          {chatData.map(chat => {
            return (
              <View key={chat.id}>
                <Text style={styles.chatDate}>{chat.id}</Text>
                {chat.data.map(itemChat => {
                  const isMe = itemChat.data.sendBy === user.uuid;
                  return (
                    <ChatItem
                      key={itemChat.id}
                      isMe={isMe}
                      text={itemChat.data.chatContent}
                      date={itemChat.data.chatTime}
                      // avatar={`http://192.168.43.123:8000/images_doctor/${dataDoctor.image}`}
                      avatar={`http://192.168.43.123:8000/images_doctor/${route.params.data.image}`}
                    />
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </View>
      <InputChat
        value={chatContent}
        onChangeText={value => setChatContent(value)}
        onButtonPress={chatSend}
      />
    </View>
  );
};

export default Chatting;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  chatDate: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginVertical: 20,
    textAlign: 'center',
  },
});
