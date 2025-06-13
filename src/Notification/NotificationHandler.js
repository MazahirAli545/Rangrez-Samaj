import React, {useEffect, useState} from 'react';
import {AppState, Platform, Alert} from 'react-native';
import PushNotification from 'react-native-push-notification';
import BackgroundService from 'react-native-background-actions';
import {getData, async_keys} from '../api/UserPreference';

export const NotificationHandler = () => {
  const [deviceToken, setDeviceToken] = useState(null);
  console.log('App in FOREGROUND. Token:', deviceToken);

  // Get the stored FCM token on component mount
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getData(async_keys.fcm_token);
        if (token) {
          setDeviceToken(token);
          console.log('Retrieved FCM token from storage:', token);
        } else {
          console.log('No FCM token found in storage');
        }
      } catch (error) {
        console.error('Error retrieving FCM token:', error);
      }
    };

    fetchToken();
  }, []);

  // Configure Push Notifications with foreground handling
  const configurePushNotifications = () => {
    PushNotification.configure({
      onRegister: token => {
        console.log('New token registered:', token);
      },
      onNotification: notification => {
        console.log('NOTIFICATION:', notification);

        // Required for foreground notifications on Android
        if (Platform.OS === 'android') {
          PushNotification.localNotification({
            channelId: 'foreground-channel', // Must match channel created in Android
            title: notification.title || 'Notification',
            message: notification.message,
            playSound: true,
            soundName: 'default',
          });
        }

        if (notification.userInteraction) {
          Alert.alert(
            'App Launched',
            `Notification tapped with token: ${deviceToken}`,
          );
        }
      },
      // Required for foreground notifications on iOS
      requestPermissions: true,
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
    });
  };

  // Background Task
  const backgroundTask = async taskData => {
    await new Promise(async resolve => {
      // For infinite loop
      while (BackgroundService.isRunning()) {
        console.log('Background service running with token:', deviceToken);
        // Perform your background work here

        // Important: Add delay to prevent battery drain
        await new Promise(res => setTimeout(res, 5000));
      }
    });
  };

  // Handle foreground/background states
  useEffect(() => {
    if (!deviceToken) return;

    const handleAppStateChange = async nextAppState => {
      if (nextAppState === 'active') {
        console.log('App in FOREGROUND. Token:', deviceToken);
        // Stop background service when in foreground
        try {
          await BackgroundService.stop();
        } catch (error) {
          console.log('Background service not running or already stopped');
        }
      } else if (nextAppState === 'background') {
        console.log('App in BACKGROUND. Token:', deviceToken);
        if (Platform.OS === 'android') {
          try {
            await BackgroundService.start(backgroundTask, {
              taskName: 'MyBackgroundTask',
              taskTitle: 'My App Background Service',
              taskDesc: 'Keeping your app alive',
              taskIcon: {
                name: 'ic_notification',
                type: 'drawable',
              },
              color: '#ff00ff',
              linkingURI: 'yourScheme://chat/jane', // Deep link URL
              parameters: {
                token: deviceToken,
              },
            });
          } catch (error) {
            console.error('Error starting background service:', error);
          }
        }
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
      BackgroundService.stop();
    };
  }, [deviceToken]);

  // Check if app was opened from killed state
  useEffect(() => {
    if (!deviceToken) return;

    PushNotification.getInitialNotification().then(notification => {
      if (notification) {
        Alert.alert(
          'App Launched',
          `Killed state opened with token: ${deviceToken}`,
        );
      }
    });
  }, [deviceToken]);

  // Set up push notifications
  useEffect(() => {
    configurePushNotifications();

    // Create notification channel for Android (required for foreground)
    if (Platform.OS === 'android') {
      PushNotification.createChannel(
        {
          channelId: 'foreground-channel',
          channelName: 'Foreground Notifications',
          channelDescription: 'Notifications for when app is in foreground',
          playSound: true,
          soundName: 'default',
          importance: 4, // IMPORTANCE_HIGH
          vibrate: true,
        },
        created => console.log(`Channel created: ${created}`),
      );
    }
  }, []);

  return null;
};
