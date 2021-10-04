import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import css from '../Styles';

export default function Deck({ navigation, route }) {
  const { deckName } = route.params;
  return (
    <View style={css.container}>
      <View style={styles.deckItem}>
        <Text style={styles.deckItemTitle}>{deckName}</Text>
        <Text style={styles.deckItemText}>4 cards</Text>
      </View>

      <TouchableOpacity
        style={css.buttonSec}
        onPress={() => navigation.navigate('NewQuestion')}
      >
        <Text style={css.buttonSecText}>Add Card</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={css.button}
        onPress={() => navigation.navigate('Quiz')}
      >
        <Text style={css.buttonText}>Start Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  deckItem: {
    padding: 20,
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  deckItemTitle: {
    fontSize: 28,
  },
  deckItemText: {
    color: '#535353',
    fontSize: 18,
  },
});
