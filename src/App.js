import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import Dialog from "react-native-dialog";
import { AntDesign } from '@expo/vector-icons';

export default function App() {
  const [visible, setVisible] = useState(false);
  const [column, setColumn] = useState("");
  const [row, setRow] = useState("");

  const showDialog = () => {
    setRow("");
    setColumn("");
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleConfirm = () => {
    setVisible(false);
  };

  
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <AntDesign name="table" size={40} color={"black"} onPress={showDialog}/>
      </TouchableOpacity>
      {/* <Button title="Tạo bảng" onPress={showDialog} /> */}

      <Dialog.Container visible={visible} onBackdropPress={handleCancel}>
        <Dialog.Title style={styles.title}>Tạo bảng</Dialog.Title>
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
          keyboardType={"numeric"}
          maxLength={2}
        />
        <Dialog.Input //label="Số cột"
          placeholder = {"Nhập số cột"}
          onChangeText={(text)=>{setColumn(text)}}
          value={column}
          style = {styles.input}
          keyboardType={"numeric"}
          maxLength={2}
        />
        
        {
        column&&row&&<Dialog.Input 
          style={styles.done}
          editable={false}
        > 
          Tạo bảng {row}x{column}
        </Dialog.Input>
        }

        <Dialog.Button label="Hủy" onPress={handleCancel} />
        <Dialog.Button label="Xác nhận" onPress={handleConfirm} />
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
  title: {
    fontWeight: '700',
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