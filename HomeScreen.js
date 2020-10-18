import * as React from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, TextInput, Button, Image} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import {db} from './src/config';
import NoteItem from './NoteItem';

const EmptyNote = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white', alignItems:'center'}}>
      <Image
            source={require('./assets/empty-state-img2.gif')}
            style={{
              flex: 0.6
            }}
            resizeMode="contain"
      />
      <Text style={{fontSize: 22, color: COLOR1 }}>Bạn chưa tạo ghi chú nào!</Text>
    </View>
  )
}

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      notes: {}
    }
  }

 /*  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      console.log(this.props); // debug 
      if(this.props.route.params!==undefined) {
        const newNote = {
          title: this.props.route.params?.newNoteTitle??'error', // debug bằng cách in ra error nếu params undefined
          content: this.props.route.params?.newNoteContent??'error',
        }
        this.setState( (state) => ({
          note: [newNote, ...state.note] // lúc này notes trong state là []
        }))
    }
  })
}
*/

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      db.ref('/notes').on('value', querySnapShot => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let noteItems = {...data};
        this.setState({
          notes: noteItems,
        });
      });
    })
  }

  componentWillUnmount() {
    this._unsubscribe();
  }
  

  render() {  
    let notesKeys = Object.keys(this.state.notes).reverse();
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: COLOR3 }}>
        {/* <View>
        <ScrollView
          contentContainerStyle = {{
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {console.log("Hi " + this.state.note)} // debug 
          {this.state.note.map( (item) => {
            return <Note id={item + 1} title={item.title} content={item.content}/>
          })}
        </ScrollView>
        </View> */}
        <View>
            {notesKeys.length > 0 ? (
              <ScrollView
              contentContainerStyle = {{
                flexDirection: 'column',
                justifyContent: 'center',
              }}
              >
              {notesKeys.map(key => (
                <NoteItem
                  key={key}
                  id={key}
                  date={this.state.notes[key].date}
                  title={this.state.notes[key].title}
                  content={this.state.notes[key].content}
                  navigation={this.props.navigation} // test
                />
              ))}
              </ScrollView>
            ) : (
              <EmptyNote />
            )}
        </View>
        <View style={{
          position: 'absolute',
          bottom: 60,
          right: 40,
        }}>
          <MaterialIcons 
            name="add"
            size={60} 
            style={styles.buttonAdd}
            onPress={() => this.props.navigation.navigate('Note')} 
          />
        </View>
      </View>
    );
  }
}

const COLOR1 = '#28df99';
const COLOR2 = '#99f3bd';
const COLOR3 = '#d2f6c5';
const COLOR4 = '#f6f7d4';
const styles = StyleSheet.create({
  buttonAdd: {
    borderRadius: 50,
    color: 'white',
    backgroundColor: COLOR1,
    elevation: 8,
  },
})