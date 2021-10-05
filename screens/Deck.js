import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { clearNotification, setNotification } from '../notifications';
import css from '../styles';

export default function Deck({ navigation, route }) {
  const { deckName } = route?.params;
  const [deck, setDeck] = useState({});
  const { getItem, setItem } = useAsyncStorage('decks');

  const initData = useCallback(async () => {
    const storedDecks = JSON.parse(await getItem());

    setDeck(storedDecks[deckName]);
  }, []);

  const startQuiz = useCallback(async () => {
    await clearNotification();
    await setNotification();
    navigation.navigate('Quiz', { deckName, index: 0, correctCount: 0 });
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
      {deck?.questions?.length ? (
        <TouchableOpacity style={css.button} onPress={startQuiz}>
          <Text style={css.buttonText}>Start Quiz</Text>
        </TouchableOpacity>
      ) : null}
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
