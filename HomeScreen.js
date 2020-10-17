import * as React from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, TextInput, Button, Image} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { FlatList } from 'react-native-gesture-handler';
import {db} from './src/config';
import { color } from 'react-native-reanimated';

const convertString = function(str) {
  if (str.length > 300) {
    return (str.slice(0,300) + '...');
  }
  return str;
}

const convertDay = function(num) {
  if(num===0) {
    return 'CN';
  } else {
    return `T${num+1}`;
  }
}

const convertDate = function(newDateStr) {
  let newDate = new Date(newDateStr);
  let minute = (newDate.getMinutes() < 10) ? "0" + newDate.getMinutes() : newDate.getMinutes();
  let str = `${convertDay(newDate.getDay())}, ${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()}, ${newDate.getHours()}:${minute}`;
  return str;
}

class NoteItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <View style={styles.noteItem} >
        <Text style={styles.itemDate}>{convertDate(this.props.date)}</Text>
        <Text style={styles.itemTitle}>{convertString(this.props.title)}</Text>
        <View style={styles.line} />
        <Text style={styles.itemContent}>{convertString(this.props.content)}</Text>
      </View>
    )
  }
}

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

  componentWillUnmount() {
    this._unsubscribe();
  } */

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      db.ref('/notes').on('value', querySnapShot => {
        let data = querySnapShot.val() ? querySnapShot.val() : [];
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
        {/* <View>
          <FlatList 
            keyExtractor={ item => item+1}
            data={this.state.notes} 
            renderItem={({item}) => (
              <Note 
                title={item.title}
                content={item.content}
              />
            )}
          />
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
                />
              ))}
              </ScrollView>
            ) : (
              <EmptyNote />
            )}
        </View>
        {/* <View>
          {notesKeys.length > 0 ? (
            <FlatList 
            keyExtractor={key => key}
            data={notesKeys} 
            renderItem={({key}) => (
              <Note 
                key={key}
                id={key}
                title={this.state.notes[key].title}
                content={this.state.notes[key].content}
              />
            )}
            />
          ) : (
                <Text>No note item</Text>
          )}
        </View> */}

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
  noteItem: {
    width: 340,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    margin: 10,
  },
  itemTitle: {
    fontWeight:'600',
    fontSize: 22,
    color: COLOR1,
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 2,
  },
  line: {
    borderWidth: 1,
    /* opacity: 0.8, */
    borderColor: COLOR3,
    marginHorizontal: 10,
  },
  itemContent: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  itemDate: {
    fontSize: 12,
    paddingHorizontal: 10,
    color: COLOR1,
  }
})