import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Decks({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Decks</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Deck')}>
        <Text>Go to Deck</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('NewDeck')}>
        <Text>New Deck</Text>
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
