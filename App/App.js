import React, {Component} from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
} from 'react-native';
import io from 'socket.io-client';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: '',
      chatMessages: [],
    };
  }

  componentDidMount() {
    this.socket = io('http://192.168.18.103:3000'); // REPLACE WITH YOUR IP!
    this.socket.on('chat message', msg => {
      this.setState({chatMessages: [...this.state.chatMessages, msg]});
    });
    console.log(this.state.chatMessages);
  }

  submitChatMessage() {
    this.socket.emit('chat message', {
      msg: this.state.chatMessage,
      sender: Platform.OS,
    });
    this.setState({chatMessage: ''});
  }

  render() {
    const chatMessages = this.state.chatMessages.map(chatMessage => (
      <View
        key={chatMessage.msg}
        style={{
          ...styles.textContainer,
          backgroundColor:
            chatMessage.sender === 'android' ? 'lightblue' : 'pink',
          alignSelf:
            chatMessage.sender === 'android' ? 'flex-start' : 'flex-end',
        }}>
        <Text style={{width: '90%'}}>{chatMessage.sender} user</Text>
        <Text style={styles.msgText} key={chatMessage.msg}>
          {chatMessage.msg}
        </Text>
      </View>
    ));

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.inputContainer}>Enter a Messege:</Text>
        <TextInput
          style={styles.input}
          autoCorrect={false}
          value={this.state.chatMessage}
          onSubmitEditing={() => this.submitChatMessage()}
          onChangeText={chatMessage => {
            this.setState({chatMessage});
          }}
        />
        <View style={styles.listContainer}>{chatMessages}</View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  textContainer: {
    height: 60,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    borderRadius: 20,
  },
  msgText: {
    color: '#000',
    fontSize: 18,
    width: '90%',
  },
  inputContainer: {
    height: 40,
    width: '90%',
    alignSelf: 'center',
    textAlignVertical: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    backgroundColor: '#fff',
    width: '90%',
    padding: 5,
    alignSelf: 'center',
  },
  listContainer: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
});
