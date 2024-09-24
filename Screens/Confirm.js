import { StyleSheet, Text, Modal, View, Button } from "react-native";
import React from "react";
import { Gradient } from "../Components/Gradient";
import { Card } from "../Components/Card";
import { Container } from "../Components/Container";
import { CustomButton } from "../Components/CustomButton";
import Colors from "../Components/Colors";
import TextSize from "../Components/TextSize";

export default function Confirm({
  confirmVisible,
  name,
  email,
  phone,
  handleCancel,
  handleConfirm,
}) {
  return (
    <Modal transparent={true} visible={confirmVisible} animationType="slide">
      <Container>
        <Gradient
          colors={[Colors.lightBlueTransparent, Colors.purpleTransparent]}
        />
        <Card
          style={{
            height: 300,
            width: 360,
            justifyContent: "space-evenly",
          }}
        >
          <Text style={styles.text}>
            Hello {name}
            {"\n"}Here is the information you entered:{"\n"}
            {email}
            {"\n"}
            {phone}
            {"\n"}If it is not correct, please go back and edit them.
          </Text>
          <CustomButton>
            <Button
              title="Go back"
              onPress={handleCancel}
              color={Colors.mediumvioletred}
            />
            <Button
              title="Continue"
              onPress={handleConfirm}
              color={Colors.blue}
            />
          </CustomButton>
        </Card>
      </Container>
    </Modal>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: TextSize.title,
    color: Colors.rebeccapurple,
    paddingBottom: 10,
  },
});
