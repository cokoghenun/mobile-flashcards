import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import css from '../Styles';

export default function Deck({ navigation, route }) {
  const { deckName } = route?.params;
  const { getItem, setItem } = useAsyncStorage('decks');
  const [deck, setDeck] = useState({});
  const initData = useCallback(async () => {
    const storedDecks = JSON.parse(await getItem());

    setDeck(storedDecks[deckName]);
  }, []);

  useEffect(() => {
    initData();
  }, [route?.params?.shouldUpdate]);

  return (
    <View style={css.container}>
      <View style={styles.deckItem}>
        <Text style={styles.deckItemTitle}>{deck.title}</Text>
        <Text style={styles.deckItemText}>{deck?.questions?.length} cards</Text>
      </View>

      <TouchableOpacity
        style={css.buttonSec}
        onPress={() => navigation.navigate('NewQuestion', { deckName })}
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
