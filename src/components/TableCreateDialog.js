import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import Dialog from "react-native-dialog";

export default function App() {
  const [visible, setVisible] = useState(false);
  const [column, setColumn] = useState("");
  const [row, setRow] = useState("");

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    setVisible(false);
  };

  
  return (
    <View style={styles.container}>
      <Button title="Tạo bảng" onPress={showDialog} />
      <Dialog.Container visible={visible} onBackdropPress={handleCancel}>
        <Dialog.Title>Tạo bảng</Dialog.Title>
        {
        (!column||!row)&&<Dialog.Description style={styles.doing}>
          Mời bạn nhập kích thước bảng
        </Dialog.Description>
        }
        
        <Dialog.Input //label="Số hàng"
          placeholder = {"Nhập số hàng"}
          onChangeText={(text)=>{setRow(text)}}
          value={row}
          style = {styles.input}
        />
        <Dialog.Input //label="Số cột"
          placeholder = {"Nhập số cột"}
          onChangeText={(text)=>{setColumn(text)}}
          value={column}
          style = {styles.input}
        />
        
        {
        column&&row&&<Dialog.Description style={styles.done}>
          Tạo bảng {row}x{column}
        </Dialog.Description>
        }
        <Dialog.Button label="Hủy" onPress={handleCancel} />
        <Dialog.Button label="Xác nhận" onPress={handleDelete} />
      </Dialog.Container>
      <View>
        <View style={{flexDirection:'row'}}>
          <TextInput style={styles.cell}/>
          <TextInput style={styles.cell}/>
          <TextInput style={styles.cell}/>
        </View>
        <View style={{flexDirection:'row'}}>
          <TextInput style={styles.cell}/>
          <TextInput style={styles.cell}/>
          <TextInput style={styles.cell}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  done: {
    color: "green",
  },
  doing: {
    color: "red",
  },
  input: {
    borderBottomWidth: 1,
    //borderBottomColor: "black"
  },
  cell: {
    borderWidth: 1,
  }
});