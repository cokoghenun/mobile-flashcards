import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import css from '../styles';

export default function NewDeck({ navigation }) {
  const [name, setName] = useState('');

  const { getItem, setItem } = useAsyncStorage('decks');

  const saveDeck = useCallback(async () => {
    let decks = JSON.parse(await getItem());
    if (!decks) decks = {};

    if (decks[name]) return Alert.alert('Error', 'Deck already exists');

    decks[name] = { title: name, questions: [] };
    await setItem(JSON.stringify(decks));
    navigation.navigate('Decks');
  }, [name]);

  return (
    <View style={css.container}>
      <Text style={css.text}>What is the title of your new deck?</Text>
      <TextInput
        style={css.input}
        value={name}
        onChangeText={setName}
        placeholder='Deck Title'
      />
      <TouchableOpacity style={css.button} onPress={saveDeck}>
        <Text style={css.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
