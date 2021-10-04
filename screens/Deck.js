import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Deck({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Deck</Text>
      <TouchableOpacity onPress={() => navigation.navigate('NewQuestion')}>
        <Text>Add Card</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Quiz')}>
        <Text>Start Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
