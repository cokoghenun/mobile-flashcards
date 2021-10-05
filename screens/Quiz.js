import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import css from '../styles';

export default function Quiz({ navigation, route }) {
  const { deckName, index, correctCount } = route?.params;
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

  const goToNextQuestion = useCallback(
    (isCorrect) => {
      const nextIndex = index + 1;

      if (nextIndex - 1 < questionsCount) {
        navigation.navigate('Quiz', {
          deckName,
          index: nextIndex,
          correctCount: isCorrect ? correctCount + 1 : correctCount,
        });
      } else {
        navigation.navigate('Deck', { deckName, shouldUpdate: Math.random() });
      }
    },
    [index, correctCount, questionsCount]
  );

  useEffect(() => {
    setUserAnswer('');
    setShowAnswer(false);
    initData();
  }, [route?.params?.index]);

  return (
    <View style={css.container}>
      {index + 1 > questionsCount ? (
        <View>
          <Text style={styles.helperText}>Your score:</Text>
          <Text style={css.text}>
            {correctCount}/{questionsCount}
          </Text>
          <View style={styles.separator}></View>
          <TouchableOpacity style={css.buttonSec} onPress={goToNextQuestion}>
            <Text style={css.buttonSecText}>Back to deck</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={css.button}
            onPress={() =>
              navigation.navigate('Quiz', {
                deckName,
                index: 0,
                correctCount: 0,
              })
            }
          >
            <Text style={css.buttonText}>Restart quiz</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={[styles.helperText, styles.centeredText]}>
            {index + 1}/{questionsCount}
          </Text>
          {!showAnswer ? (
            <View>
              <Text style={styles.helperText}>Question:</Text>
              <Text style={css.text}>{question?.question}</Text>
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
                <Text style={css.buttonText}>Show answer</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <Text style={styles.helperText}>Your answer:</Text>
              <Text style={css.text}>{userAnswer}</Text>
              <View style={styles.separator}></View>
              <Text style={styles.helperText}>Original answer:</Text>
              <Text style={css.text}>{question?.answer}</Text>
              <TouchableOpacity
                style={css.buttonSec}
                onPress={() => goToNextQuestion(true)}
              >
                <Text style={css.buttonSecText}>Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={css.buttonSec}
                onPress={goToNextQuestion}
              >
                <Text style={css.buttonSecText}>Incorrect </Text>
              </TouchableOpacity>
            </View>
          )}
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
