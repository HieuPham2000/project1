import * as React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import {db} from './src/config';

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

export default class NoteItem extends React.Component {
  constructor(props) {
    super(props);
  }

  handlePressNoteItem() {
    /* this.props.navigation.navigate('Note', {
      title: this.props.title,
      content: this.props.content
    }) */
  }
  deleteNoteItem() {
    /* db.ref(`/notes/${this.props.id}`).remove(); */
    db.ref('/notes').child(this.props.id).remove();
  }
  editNoteItem() {
    this.props.navigation.navigate('Note', {
      id: this.props.id,
      title: this.props.title,
      content: this.props.content
    })
  }
  render() {
    /* console.log(this.props); */
    return (
      <View style={styles.noteItem} >
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center'}}>
          <Text style={styles.itemDate}>{convertDate(this.props.date)}</Text>
          <View  style={{ flex: 0.4, flexDirection: 'row', justifyContent:'space-around'}}>
            <MaterialIcons name="delete" size={24} color={COLOR1} onPress={this.deleteNoteItem.bind(this)} />
            <MaterialIcons name="edit" size={24} color={COLOR1} onPress={this.editNoteItem.bind(this)} />
          </View>
        </View>

        <Text style={styles.itemTitle}>{convertString(this.props.title)}</Text>
        <View style={styles.line} />
        <Text style={styles.itemContent}>{convertString(this.props.content)}</Text>
      </View>
    )
  }
}

const COLOR1 = '#28df99';
const COLOR2 = '#99f3bd';
const COLOR3 = '#d2f6c5';
const COLOR4 = '#f6f7d4';
const styles = StyleSheet.create({
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