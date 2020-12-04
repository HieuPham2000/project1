import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { db } from '../config';

const convertString = function (str) {
  if (str.length > 300) {
    return (str.slice(0, 300) + '...');
  }
  return str;
}

const convertDay = function (num) {
  if (num === 0) {
    return 'CN';
  } else {
    return `T${num + 1}`;
  }
}

const convertDate = function (newDateStr) {
  let newDate = new Date(newDateStr);
  let minute = (newDate.getMinutes() < 10) ? "0" + newDate.getMinutes() : newDate.getMinutes();
  // vì month tính từ 0 nên phải cộng thêm 1
  let str = `${convertDay(newDate.getDay())}, ${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}, ${newDate.getHours()}:${minute}`;
  return str;
}

export default function NoteItem(props) {
  const deleteNoteItem = async () => {
    /* db.ref(`/notes/${this.props.id}`).remove(); */
    await db.ref('/notes').child(props.id).remove();
  }
  const editNoteItem = () => {
    props.navigation.navigate('EditNoteScreen', {
      id: props.id,
      title: props.title,
      content: props.content
    })
  }

  return (
    <View style={styles.noteItem} >
      <TouchableOpacity 
        onPress={() => editNoteItem()} 
        delayPressIn={0} 
      >
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
          <Text style={styles.itemDate}>
            {convertDate(props.date)}
          </Text>
          <View style={{ flex: 0.4, flexDirection: 'row', justifyContent: 'space-around' }}>
            <MaterialIcons 
              name="delete" 
              size={24} 
              color={COLOR1} 
              onPress={() => deleteNoteItem()} 
            />
            <MaterialIcons 
              name="edit" 
              size={24} 
              color={COLOR1} 
              onPress={() => editNoteItem()} />
          </View>
        </View>

        <Text style={styles.itemTitle}>{convertString(props.title)}</Text>
        <View style={styles.line} />
        <Text style={styles.itemContent}>{convertString(props.content)}</Text>
      </TouchableOpacity>
    </View>
  )
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
    fontWeight: '600',
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