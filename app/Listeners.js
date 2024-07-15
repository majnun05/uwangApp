import {AppState, Linking, Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import FCM, {
  FCMEvent,
  RemoteNotificationResult,
  WillPresentNotificationResult,
  NotificationType,
  NotificationActionType,
  NotificationActionOption,
  NotificationCategoryOption,
} from 'react-native-fcm';

AsyncStorage.getItem('lastNotification').then((data) => {
  if (data) {
    // if notification arrives when app is killed, it should still be logged here
    AsyncStorage.removeItem('lastNotification');
  }
});

AsyncStorage.getItem('lastMessage').then((data) => {
  if (data) {
    // if notification arrives when app is killed, it should still be logged here
    AsyncStorage.removeItem('lastMessage');
  }
});

export function registerKilledListener() {
  // these callback will be triggered even when app is killed
  FCM.on(FCMEvent.Notification, (notif) => {
    console.log(notif)
    AsyncStorage.setItem('lastNotification', JSON.stringify(notif));
    if (notif.opened_from_tray) {
      setTimeout(() => {
        if (notif._actionIdentifier === 'reply') {
          if (AppState.currentState !== 'background') {
            //alert('User replied ' + JSON.stringify(notif._userText));
          } else {
            AsyncStorage.setItem(
              'lastMessage',
              JSON.stringify(notif._userText),
            );
            AsyncStorage.setItem('verify', '');
          }
        }
        if (notif._actionIdentifier === 'view') {
          //alert('User clicked View in App');
        }
        if (notif._actionIdentifier === 'dismiss') {
          //alert('User clicked Dismiss');
        }
      }, 1000);
    }
  });
}

// these callback will be triggered only when app is foreground or background
export const registerAppListener = (navigation) => {
  FCM.on(FCMEvent.Notification, async (notif) => {
    if (
      Platform.OS === 'ios' &&
      notif._notificationType === NotificationType.WillPresent &&
      !notif.local_notification
    ) {
      notif.finish(WillPresentNotificationResult.All);
      return;
    }

    if (Platform.OS === 'ios') {
      switch (notif._notificationType) {
        case NotificationType.Remote:
          notif.finish(RemoteNotificationResult.NewData);
          break;
        case NotificationType.NotificationResponse:
          notif.finish();
          break;
        case NotificationType.WillPresent:
          notif.finish(WillPresentNotificationResult.All);
          break;
      }
    }
  });

  FCM.on(FCMEvent.RefreshToken, (token) => {
    // console.log('TOKEN (refreshUnsubscribe)', token);
  });

  FCM.enableDirectChannel();
  FCM.on(FCMEvent.DirectChannelConnectionChanged, (data) => {
    // console.log('direct channel connected' + data);
  });
  setTimeout(function () {
    FCM.isDirectChannelEstablished().then((d) => {
      //
    });
  }, 1000);
};

FCM.setNotificationCategories([
  {
    id: 'com.myidentifi.fcm.text',
    actions: [
      {
        type: NotificationActionType.TextInput,
        id: 'reply',
        title: 'Quick Reply',
        textInputButtonTitle: 'Send',
        textInputPlaceholder: 'Say something',
        intentIdentifiers: [],
        options: NotificationActionOption.AuthenticationRequired,
      },
      {
        type: NotificationActionType.Default,
        id: 'view',
        title: 'View in App',
        intentIdentifiers: [],
        options: NotificationActionOption.Foreground,
      },
      {
        type: NotificationActionType.Default,
        id: 'dismiss',
        title: 'Dismiss',
        intentIdentifiers: [],
        options: NotificationActionOption.Destructive,
      },
    ],
    options: [
      NotificationCategoryOption.CustomDismissAction,
      NotificationCategoryOption.PreviewsShowTitle,
    ],
  },
]);
