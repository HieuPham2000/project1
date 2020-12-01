import React, { useEffect, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import Dialog from "react-native-dialog";
import {db} from '../config';

export default function DeleteDialog(props) {
  const [visible, setVisible] = useState(false);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = async () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    await db.ref('/notes').child(props.id).remove();
    setVisible(false);
  };

  useEffect(() => setVisible(props.viableDeleteDialog))

  return (
    //<View style={styles.container}>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Bạn có muốn xóa ghi chú?</Dialog.Title>
        <Dialog.Description>
           Bạn không thể hoàn tác, bạn vẫn muốn thực hiện?
        </Dialog.Description>
        <Dialog.Button label="Hủy" onPress={handleCancel} />
        <Dialog.Button label="Xóa" onPress={handleDelete} />
      </Dialog.Container>
    //</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});