import React from 'react';
import { StyleSheet, TextInput, Button, View } from 'react-native';

const InputForm = ({ item1, setItem1, item2, setItem2, handleSearch }) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Item 1"
        value={item1}
        onChangeText={setItem1}
      />
      <TextInput
        style={styles.input}
        placeholder="Item 2"
        value={item2}
        onChangeText={setItem2}
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '100%',
  },
});

export default InputForm;
