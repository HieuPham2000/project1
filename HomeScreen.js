import * as React from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, TextInput, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

const convertString = function(str) {
  if (str.length > 20) {
    return (str.slice(0,20) + '...');
  }
  return str;
}

class Note extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <View style={styles.note} >
        <Text>{convertString(this.props.title)}</Text>
        <Text>{convertString(this.props.content)}</Text>
      </View>
    )
  }
}
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      note: [
        {
          title: 'Test -10',
          content: 'blabla'
        },
        {
          title: 'Test -9',
          content: 'blabla'
        }
      ]
    }
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      /* console.log(this.props); // debug */
      if(this.props.route.params!==undefined) {
        const newNote = {
          title: this.props.route.params?.newNoteTitle??'error', // debug bằng cách in ra error nếu params undefined
          content: this.props.route.params?.newNoteContent??'error',
        }
        this.setState( (state) => ({
          note: [newNote, ...state.note]
        }))
    }
  })
}

  componentWillUnmount() {
    this._unsubscribe();
  }
  render() {    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View>
        <ScrollView
          contentContainerStyle = {{
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* {console.log("Hi " + this.state.note)} // debug */}
          {this.state.note.map( (item) => {
            return <Note id={item + 1} title={item.title} content={item.content}/>
          })}
          <Note id= {1} title='Test1' content='something' />
          <Note id= {2} title='Test2' content='something' />
          <Note id= {3} title='Test3' content='something' />
          <Note id= {4} title='Test4' content='something' />
          <Note id= {5} title='Test5' content='something' />
          <Note id= {6} title='Test6' content='something' />
          <Note id= {7} title='Test7' content='something' />
          <Note id= {8} title='Test8' content='something' />
        </ScrollView>
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
            onPress={() => this.props.navigation.navigate('NewNote')} 
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
  note: {
    height: 100,
    width: 340,
    backgroundColor: COLOR2,
    borderRadius: 10,
    elevation: 3,
    margin: 10,
  }
})