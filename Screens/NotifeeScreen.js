import React from 'react';
import { View, Button } from 'react-native';
import notifee from '@notifee/react-native';


const NotifeeScreen = () => {
    const onDisplayNotification = async() => {
        // Request permissions (required for ios)
        // Requesting permission is required for iOS as notifications are disabled by default. 
        // You need to ask the user to enable notifications by calling requestPermission before displaying any notifications.
        await notifee.requestPermission();

        // Create a channel (required from android)
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default channel'
        });

        // Display a notification
        const notificationId = await notifee.displayNotification({
            id: '123',
            title: 'Notification Title',
            body: 'Main body content of the notification',
            android: {
                channelId, 
                // pressAction is needed if you want the notification to open the app when pressed
                pressAction: {
                    id: 'default'
                },
            },
        });

        // Waiting for 5s 
        await (async () => { 
            return new Promise(resolve => {
                setTimeout(() => { 
                    console.log('hahahahahaha ', notificationId);
                    resolve();
                }, 8000); 
            })
        })();

        // Sometime later...
        await notifee.displayNotification({
            id: '123',
            title: 'Updated Notification Title',
            body: 'Updated main body content of the notification',
            android: {
            channelId,
            },
        });

        // Waiting for 5s
        await (async () => { 
            return new Promise(resolve => {
                setTimeout(() => { 
                    resolve();
                    console.log('Cancelled after 5s ', notificationId);
                }, 5000); 
            })
        })();

        await notifee.cancelNotification(notificationId);
    }

    return (
        <View>
          <Button title="Display Notification" onPress={() => onDisplayNotification()} />
        </View>
      );
}

export default NotifeeScreen;