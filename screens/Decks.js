import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import css from '../Styles';

export default function Decks({ navigation, route }) {
  const { getItem, setItem } = useAsyncStorage('decks');
  const [decks, setDecks] = useState({});

  const initData = useCallback(async () => {
    let storedDecks = JSON.parse(await getItem());
    if (!storedDecks) storedDecks = {};

    setDecks(storedDecks);
  }, []);

  navigation.addListener('focus', () => {
    initData();
  });

  return (
    <View style={css.container}>
      <FlatList
        data={Object.keys(decks)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.deckItem}
            onPress={() => navigation.navigate('Deck', { deckName: item })}
          >
            <Text style={styles.deckItemTitle}>{item}</Text>
            <Text style={styles.deckItemText}>
              {decks[item]?.questions?.length} cards
            </Text>
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
