import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';
import {getData, async_keys} from '../api/UserPreference';

export const sendFCMTokenToBackend = async PR_ID => {
  try {
    const fcmToken = await getData(async_keys.fcm_token);
    const deviceId = await DeviceInfo.getUniqueId();

    if (!PR_ID || !fcmToken || !deviceId) {
      console.log('Missing PR_ID / token / deviceId');
      return;
    }

    const statusResponse = await fetch(
      `https://node2-plum.vercel.app/api/fcm/device-status/${deviceId}/${PR_ID}`,
    );
    const statusResult = await statusResponse.json();

    if (statusResult.isRegisteredToOtherUser) {
      console.log(
        'Device is registered to another user:',
        statusResult.existingPR_ID,
      );
      // Handle conflict - show alert or force logout
      Alert.alert(
        'Device Conflict',
        'This device is already linked to another account. Please log out of the other account first.',
        [{text: 'OK'}],
      );
      return;
    }

    // Proceed with registration if no conflict

    const response = await fetch(
      `https://node2-plum.vercel.app/api/fcm/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          PR_ID,
          fcmToken,
          deviceId,
        }),
      },
    );

    const text = await response.text();

    try {
      const result = JSON.parse(text);
      console.log('✅ FCM token registered to backend:', result);
    } catch (parseError) {
      console.error('❌ Failed to parse backend response:', text);
    }
  } catch (error) {
    console.error('❌ Error sending FCM token:', error);
  }
};

export const clearDeviceAssociation = async () => {
  try {
    const fcmToken = await getData(async_keys.fcm_token);
    const deviceId = await DeviceInfo.getUniqueId();
    const PR_ID = await getData('PR_ID'); // Or your user ID storage key

    if (!fcmToken || !deviceId || !PR_ID) return;

    await fetch(`https://node2-plum.vercel.app/api/fcm/clear-association`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({PR_ID, deviceId}),
    });
  } catch (error) {
    console.error('Error clearing device association:', error);
  }
};
