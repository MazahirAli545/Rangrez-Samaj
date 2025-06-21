// src/fcm/foregroundHandler.js

import notifee, {AndroidImportance} from '@notifee/react-native';
import axios from 'axios';
import {getData, async_keys} from '../api/UserPreference';

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
      largeIcon: 'ic_launcher',
    },
  });
};

export const sendAdminNotification = async (title, body) => {
  try {
    const response = await axios.post(
      'https://node2-plum.vercel.app/api/fcm/send-notification-to-admins',
      {
        title,
        body,
      },
    );
    if (response.data.success) {
      console.log('Admin notification sent successfully:', response.data);
    } else {
      console.error('Failed to send admin notification:', response.data);
    }
  } catch (error) {
    console.error('Error sending admin notification:', error);
  }
};
