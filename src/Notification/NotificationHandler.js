import React, {useEffect, useState} from 'react';
import {AppState, Platform, Alert} from 'react-native';
import PushNotification from 'react-native-push-notification';
import BackgroundService from 'react-native-background-actions';
import {getData, async_keys} from '../api/UserPreference'; // Import from UserPreference

const NotificationHandler = () => {
  const [deviceToken, setDeviceToken] = useState(null);

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

  // Configure Push Notifications
  const configurePushNotifications = () => {
    PushNotification.configure({
      onRegister: token => {
        console.log('New token registered:', token);
        // You might want to compare/store this with your existing token
      },
      onNotification: notification => {
        console.log('NOTIFICATION:', notification);
        if (notification.userInteraction) {
          Alert.alert(
            'App Launched',
            `Notification tapped with token: ${deviceToken}`,
          );
        } else if (AppState.currentState === 'background') {
          PushNotification.localNotification({
            title: 'Background Notification',
            message: notification.message,
          });
        }
      },
      permissions: {alert: true, badge: true, sound: true},
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });
  };

  // Background Task
  const backgroundTask = async () => {
    await new Promise(async resolve => {
      while (BackgroundService.isRunning()) {
        console.log('Background task active. Token:', deviceToken);
        await new Promise(res => setTimeout(res, 10000));
      }
    });
  };

  // Handle foreground/background states
  useEffect(() => {
    if (!deviceToken) return; // Don't proceed without token

    const handleAppStateChange = nextAppState => {
      if (nextAppState === 'active') {
        console.log('App in FOREGROUND. Token:', deviceToken);
        fetch('https://api.example.com/app-state', {
          method: 'POST',
          body: JSON.stringify({token: deviceToken, state: 'foreground'}),
        });
      } else if (nextAppState === 'background') {
        console.log('App in BACKGROUND. Token:', deviceToken);
        if (Platform.OS === 'android') {
          BackgroundService.start(backgroundTask, {
            taskName: 'MyBackgroundTask',
            taskTitle: 'Running in background',
            taskDesc: 'Using token: ' + deviceToken,
          });
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
  }, [deviceToken]); // Re-run when token changes

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
  }, []);

  return null;
};

export default NotificationHandler;
