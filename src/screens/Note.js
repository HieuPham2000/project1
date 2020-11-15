import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import FuncButton from '../components/FuncButton';
import TestTable from '../components/TestTable';
import { db } from '../config';

export default class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      content: '',
      isChanged: false,

      past: [],
      future: [],
    }

    this.props.navigation.saveNote = this.saveNote.bind(this);
    this.props.navigation.deleteNote = this.deleteNote.bind(this);
    //test
    this.updateState = this.updateState.bind(this);
    this.redo = this.redo.bind(this);
    this.undo = this.undo.bind(this);
    // test
  }
  componentDidMount() {
    this.setState({
      id: this.props.route.params?.id ?? '', // tại sao trên web thì id: this.props.route.params.id không lỗi
      title: this.props.route.params?.title ?? '',
      content: this.props.route.params?.content ?? '',
    })
  }

  // test
  updateState(value) {
    this.setState((state) => ({
      past: [...state.past, state.content],
      content: value,
    })
    )
  };

  undo() {
    this.setState((state) => ({
      future: [...state.future, state.content],
      content: state.past.pop(),
    }))
  };

  redo() {
    this.setState((state) => ({
      past: [...state.past, state.content],
      content: state.future.pop(),
    }))
  };
  //



  handleChangeTitle(text) {
    this.setState({
      title: text,
      isChanged: true,
    })
  }

  // khả năng liên quan đến bất đồng bộ nên in ra không chính xác
  async handleChangeContent(text) {
    await this.updateState(text);
    await this.setState((state) => ({
      // test
      /* past: [...state.past, state.content],
      canUndo: this.state.past.length > 0,
      canRedo: this.state.future.length > 0, */
      // test
      content: text,
      isChanged: true,
    }))
    console.log('past: ' + this.state.past)
    console.log('present: ' + this.state.content)
    console.log('future: ' + this.state.future)
  }
  deleteNote() {
    db.ref('/notes').child(this.state.id).remove();
    Alert.alert('Thông báo!', 'Đã xóa ghi chú!');
    this.props.navigation.navigate('Home');
  }
  saveNote() {
    if (this.state.id === '') { // note mới
      if (this.state.title !== '' || this.state.content !== '') {
        db.ref('/notes').push({
          title: this.state.title,
          content: this.state.content,
          date: (new Date()).toISOString() // date: (new Date()).toString() có được?
        });
        Alert.alert('Thông báo!', 'Ghi chú mới đã được tạo!');
      } else {
        Alert.alert('Thông báo!', 'Ghi chú rỗng đã bị xóa!');
      }
    } else if (this.state.isChanged === true) { // note cũ không hề thay đổi
      // update xong vị trí note không được cập nhật
      /* db.ref('/notes').update({
        [this.state.id] : {
        title: this.state.title,
        content: this.state.content,
        date: (new Date()).toISOString()
      }}); */
      db.ref('/notes').child(this.state.id).remove();
      db.ref('/notes').push({
        title: this.state.title,
        content: this.state.content,
        date: (new Date()).toISOString()
      });
      Alert.alert('Thông báo!', 'Đã chỉnh sửa ghi chú!');
    }

    this.props.navigation.navigate('Home');
  }



  render() {
    return (
      <View style={styles.container}>
        {/* <StatusBar
          barStyle = "dark-content"
          // dark-content, light-content and default
          hidden = {false}
          //To hide statusBar
          backgroundColor = "#00BCD4"
          //Background color of statusBar only works for Android
          translucent = {false}
          //allowing light, but not detailed shapes
          networkActivityIndicatorVisible = {true}
        /> */}
        {/* <FuncButton canUndo={this.state.canUndo} canRedo={this.state.canRedo} undo={this.undo} redo={this.redo}/> */}
        <View style={styles.funcbutton}>
          <View style={{ flexDirection: 'row', flex: 6, justifyContent: 'space-around' }}>

            <Entypo name="text" size={24} color={COLOR5} />
            <TouchableOpacity>
              <Entypo name="image" size={24} color={COLOR5} />
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign name="table" size={24} color={COLOR5} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', flex: 2 }} />
          <View style={{
            flexDirection: 'row', flex: 4, justifyContent: 'space-around'
          }}>
              <TouchableOpacity 
                onPress={this.undo}
                disabled={this.state.past.length>0 ? false: true}
              >
                <MaterialIcons 
                  name="undo" 
                  size={24} 
                  color={COLOR5} 
                  style={{ opacity: this.state.past.length>0 ? 1 : 0.3 }}
                  />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={this.redo}
                disabled={this.state.future.length>0 ? false: true} 
              >
                <MaterialIcons 
                  name="redo" 
                  size={24} 
                  color={COLOR5} 
                  style={{ opacity: this.state.future.length>0 ? 1 : 0.3 }}
                />
              </TouchableOpacity>
          </View>
        </View>
        <View style={styles.line} />
        <View>
        <ScrollView style={styles.wrapper}>
          <View style={styles.titleWrapper}>
            <TextInput
              style={styles.title}
              placeholder='Tiêu đề'
              multiline={true}
              numberOfLines={1}
              autoFocus={true}
              onChangeText={this.handleChangeTitle.bind(this)}
              value={this.state.title}
            />
          </View>
          <View style={styles.line} />
          <View style={styles.contentWrapper}>
            <TextInput
              style={styles.content}
              placeholder='Ghi chú'
              multiline={true}
              numberOfLines={8}
              onChangeText={this.handleChangeContent.bind(this)}
              value={this.state.content}
            />

          </View>
          {/* test */}
          {/* <Text>{this.state.title}</Text>
          <Text>{this.state.content}</Text> */}
        </ScrollView>
        </View>
      </View>
    );
  }
}

const COLOR1 = '#28df99';
const COLOR2 = '#99f3bd';
const COLOR3 = '#d2f6c5';
const COLOR4 = '#f6f7d4';
const COLOR5 = 'white';
/* const COLOR4 = '#f8f1f1';
const COLOR3 = '#ffa62b';
const COLOR2 = '#db6400';
const COLOR1 = '#16697a'; */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR4,
  },
  funcbutton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLOR2,
    maxHeight: 50,
    alignItems: 'center'
  },
  line: {
    borderWidth: 2,
    opacity: 0.2,
    borderColor: COLOR1,
  },
  wrapper: {
  },
  titleWrapper: {
    backgroundColor: COLOR3,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    textAlignVertical: 'top',
    padding: 10,
  },
  contentWrapper: {
    backgroundColor: COLOR4,
  },
  content: {
    fontSize: 18,
    textAlignVertical: 'top',
    padding: 10,
  },
  buttonSave: {
    borderRadius: 50,
    color: 'white',
    backgroundColor: COLOR1,
    elevation: 8,
  },
});
