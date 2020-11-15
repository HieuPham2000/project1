import EditableTable from 'react-native-editable-table';
import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';

class Test extends Component{

  render(){
    return (
      <SafeAreaView style={styles.container}>
        <EditableTable
          columns={[
            {value: 'Col 1', input: 'c1', width: 20},
            {value: 'Col 2', input: 'c2', width: 20},
            {value: 'Col 3', input: 'c3', width: 30},
            {value: 'Col 4', input: 'c4', width: 30},
          ]}
          values={[
            [10, 'test', 23, ':)'],
            [20, {value: 'Edit Me', editable: true}, {value: 45}, 'haha'],
            [30, {value: 'Span Me', span: 2}, 'Dang'],
            [20, {value: 'Edit Me', editable: true}, {value: 45}, 'haha'],
            [20, {value: 'Edit Me', editable: true}, {value: 45}, 'haha'],
            [20, {value: 'Edit Me', editable: true}, {value: 45}, 'haha'],
            [20, {value: 'Edit Me', editable: true}, {value: 45}, 'haha'],
            [20, {value: 'Edit Me', editable: true}, {value: 45}, 'haha'],
            [10, 'test', 23, ':)'],
            [10, 'test', 23, ':)'],
            [10, 'test', 23, ':)'],
            [10, 'test', 23, ':)'],
            [10, 'test', 23, ':)'],
            [10, 'test', 23, ':)'],
            [10, 'test', 23, ':)'],
            [10, 'test', 23, ':)'],
            [10, 'test', 23, ':)']
          ]}
          emptyRows={2}
          onCellChange={(value, column, row, unique_id) => {
            console.log(`Cell Change on Column: ${column} Row: ${row}
                        and unique_id: ${unique_id}`);
          }}
          onColumnChange={(value, oldVal, newVal) => {
            console.log(`Column Change. Old Value: ${oldVal} New Value: ${newVal}`);
          }}
          customStyles={{

          }}
          style={styles.table}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  table: {
    flex: 1,
    marginBottom: 30
  }
});