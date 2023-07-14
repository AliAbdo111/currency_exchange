import * as Notifications from 'expo-notifications';
async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Cashing  Forex and cryptocurrency rates and VAT rates',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    });
  }
  export default schedulePushNotification;