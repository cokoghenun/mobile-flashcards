import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import React, { useCallback, useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import css from '../Styles';

export default function NewQuestion({ navigation, route }) {
  const { deckName } = route?.params;
  const [answer, setAnswer] = useState('');
  const [question, setQuestion] = useState('');
  const { getItem, setItem } = useAsyncStorage('decks');

  const saveQuestion = useCallback(async () => {
    const storedDecks = JSON.parse(await getItem());
    storedDecks[deckName].questions.push({ question, answer });

    await setItem(JSON.stringify(storedDecks));
    navigation.navigate('Deck', { deckName, shouldUpdate: Math.random() });
  }, [question, answer]);

  return (
    <View style={css.container}>
      <Text style={css.text}>Enter question</Text>
      <TextInput
        style={css.input}
        value={question}
        onChangeText={setQuestion}
        placeholder='Question'
      />
      <Text style={css.text}>Enter the answer to the question</Text>
      <TextInput
        style={css.input}
        value={answer}
        onChangeText={setAnswer}
        placeholder='Question'
      />
      <TouchableOpacity style={css.button} onPress={saveQuestion}>
        <Text style={css.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

