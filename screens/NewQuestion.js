import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function NewQuestion() {
  return (
    <View style={styles.container}>
      <Text>NewQuestion</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});