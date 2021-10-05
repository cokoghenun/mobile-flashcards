import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Decks from './screens/Decks';
import Deck from './screens/Deck';
import Quiz from './screens/Quiz';
import NewDeck from './screens/NewDeck';
import NewQuestion from './screens/NewQuestion';
import { setNotification } from './notifications';

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

const MainStackScreen = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name='Decks' component={Decks} />
      <MainStack.Screen
        name='Deck'
        component={Deck}
        options={({ route }) => ({ title: route.params.deckName })}
      />
      <MainStack.Screen name='Quiz' component={Quiz} />
    </MainStack.Navigator>
  );
};

export default function App() {
  useEffect(() => {
    setNotification();
  }, []);
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name='main'
          component={MainStackScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name='NewDeck'
          component={NewDeck}
          options={{ presentation: 'modal' }}
        />
        <RootStack.Screen
          name='NewQuestion'
          component={NewQuestion}
          options={{ presentation: 'modal' }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
