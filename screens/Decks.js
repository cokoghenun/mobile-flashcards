import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import css from '../Styles';

export default function Decks({ navigation }) {
  const { getItem, setItem } = useAsyncStorage('decks');
  const [decks, setDecks] = useState([]);

  const initData = useCallback(async () => {
    let storedDecks = JSON.parse(await getItem());
    if (!storedDecks) storedDecks = [];

    setDecks(storedDecks);
  }, []);

  useEffect(() => {
    initData();
  }, []);
  return (
    <View style={css.container}>
      <FlatList
        data={decks}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.deckItem}
            onPress={() => navigation.navigate('Deck', { deckName: item })}
          >
            <Text style={styles.deckItemTitle}>{item}</Text>
            <Text style={styles.deckItemText}>4 cards</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />
      <TouchableOpacity
        style={css.button}
        onPress={() => navigation.navigate('NewDeck')}
      >
        <Text style={css.buttonText}>New Deck</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  deckItem: {
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    borderColor: 'black',
  },
  deckItemTitle: {
    fontSize: 24,
  },
  deckItemText: {
    color: '#535353',
  },
});
