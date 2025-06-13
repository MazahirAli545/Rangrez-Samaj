// src/fcm/foregroundHandler.js

import notifee, {AndroidImportance} from '@notifee/react-native';

export async function setupForegroundNotificationHandler(props) {
  // Create notification channel (Android only)
  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });
}

export const sendTestNotification = async props => {
  await notifee.displayNotification({
    title: props.title || '',
    body: props.body || '',
    android: {
      channelId: 'default',
      smallIcon: 'ic_launcher',
    },
  });
};
