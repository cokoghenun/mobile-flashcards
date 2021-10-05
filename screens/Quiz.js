import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import css from '../Styles';

export default function Quiz({ navigation, route }) {
  const { deckName, index } = route?.params;
  const [question, setQuestion] = useState({});
  const [questionsCount, setQuestionsCount] = useState(0);
  const { getItem, setItem } = useAsyncStorage('decks');
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  const initData = useCallback(async () => {
    const storedDecks = JSON.parse(await getItem());
    setQuestionsCount(storedDecks[deckName].questions.length);
    setQuestion(storedDecks[deckName].questions[index]);
  }, [index]);

  const goToNextQuestion = useCallback(() => {
    const nextIndex = index + 1;
    if (nextIndex < questionsCount) {
      navigation.navigate('Quiz', { deckName, index: nextIndex });
    } else {
      navigation.navigate('Deck', { deckName, shouldUpdate: Math.random() });
    }
  }, [index, questionsCount]);

  useEffect(() => {
    setUserAnswer('');
    setShowAnswer(false);
    initData();
  }, [route?.params?.index]);

  return (
    <View style={css.container}>
      <Text style={[styles.helperText, styles.centeredText]}>
        {index + 1}/{questionsCount}
      </Text>
      {!showAnswer ? (
        <View>
          <Text style={styles.helperText}>Question:</Text>
          <Text style={css.text}>{question.question}</Text>
          <View style={styles.separator}></View>
          <Text style={styles.helperText}>Your answer:</Text>
          <TextInput
            style={css.input}
            value={userAnswer}
            onChangeText={setUserAnswer}
            placeholder='Answer'
          />
          <TouchableOpacity
            style={css.button}
            onPress={() => setShowAnswer((a) => !a)}
          >
            <Text style={css.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={styles.helperText}>Your answer:</Text>
          <Text style={css.text}>{userAnswer}</Text>
          <View style={styles.separator}></View>
          <Text style={styles.helperText}>Original answer:</Text>
          <Text style={css.text}>{question?.answer}</Text>
          <TouchableOpacity style={css.button} onPress={goToNextQuestion}>
            <Text style={css.buttonText}>
              {index === questionsCount - 1 ? 'End' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    marginBottom: 20,
  },
  helperText: {
    color: '#535353',
    marginBottom: 5,
  },
  centeredText: { textAlign: 'center', marginBottom: 10 },
});
