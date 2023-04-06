import React, {Component, useState, useEffect} from 'react';
import {TextInput, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import io from 'socket.io-client';

export default App = () => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     chatMessage: '',
  //     chatMessages: [],
  //   };
  // }

  const [chatMessage, setChatMessage] = useState('');
  const [isRefresh, setIsRefresh] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
     socket = io('http://127.0.0.1:3000');
    socket.on('chat message', msg => {
      //[...chatMessages, msg];
      chatMessages.push(msg)
      setIsRefresh(!isRefresh)

    });
  }, []);

  const submitChatMessage = () => {
    socket.emit('chat message', chatMessage);
    setChatMessage('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          height: 40,
          width: '90%',
          alignSelf: 'center',
          textAlignVertical: 'center',
        }}>
        Enter a Messege:
      </Text>
      <TextInput
        style={{
          height: 40,
          borderWidth: 1,
          backgroundColor: '#fff',
          width: '90%',
          alignSelf: 'center',
        }}
        autoCorrect={false}
        value={chatMessage}
        onSubmitEditing={() => submitChatMessage()}
        onChangeText={text => setChatMessage(text)}
      />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {chatMessages.map(chatMessage => (
          <Text style={{color: '#000', fontSize: 20}} key={chatMessage}>
            {chatMessage}
          </Text>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
