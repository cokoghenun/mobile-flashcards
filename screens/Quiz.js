import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Quiz() {
  return (
    <View style={styles.container}>
      <Text>Quiz</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
