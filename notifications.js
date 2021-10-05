import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
const NOTIFICATION_KEY = 'mf:notifications';

export async function setNotification() {
  if (Device.brand) {
    const isNotificationSet = JSON.parse(
      await AsyncStorage.getItem(NOTIFICATION_KEY)
    );
    if (!isNotificationSet) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Do some practice!',
          body: "Dont't forget to do some practice today!",
        },
        trigger: {
          seconds: 60 * 60 * 24,
          // repeats: true,
        },
      });
      await AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
    }
  }
}
export async function clearNotification() {
  if (Device.brand) {
    await AsyncStorage.removeItem(NOTIFICATION_KEY);
    await Notifications.cancelAllScheduledNotificationsAsync();
  }
}
