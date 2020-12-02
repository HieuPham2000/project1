import * as React from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, TextInput, Button, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { db } from '../config';
import NoteItem from '../components/NoteItem';
import DeleteDialog from '../components/DeleteDialog'

function EmptyNote() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
      <Image
        source={require('../../assets/empty-state-img2.gif')}
        style={{
          flex: 0.6
        }}
        resizeMode="contain"
      />
      <Text style={{ fontSize: 22, color: COLOR1 }}>Bạn chưa tạo ghi chú nào!</Text>
    </View>
  )
}

export default function HomeScreen(props) {
  /* constructor(props) {
    super(props);
    this.state={
      notes: {}
    }
  } */
  const [notes, setNotes ] = React.useState({});
  const [notesKeys, setNotesKeys] = React.useState([]);

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

  /* componentDidMount() {
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
  } */
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      db.ref('/notes').on('value', querySnapShot => {
        //console.log("1");
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let noteItems = { ...data };
        setNotes(noteItems);
        setNotesKeys(Object.keys(noteItems).reverse());
      });
    });
    return unsubscribe;
  }, [props.navigation]);



  //const notesKeys = Object.keys(notes).reverse();
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
      <DeleteDialog />
      <View>
        {notesKeys.length > 0 ? (
          <ScrollView
            contentContainerStyle={{
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {notesKeys.map(key => (
              <NoteItem
                
                key={key}
                id={key}
                date={notes[key].date}
                title={notes[key].title}
                content={notes[key].content}
                navigation={props.navigation} 
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
          onPress={() => props.navigation.navigate('Note')}
        />
      </View>
    </View>
  );
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