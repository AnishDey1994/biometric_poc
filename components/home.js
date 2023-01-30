import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const LoginView = ({ navigation }) => {
    return (
        <View style={styles.mainWrapper}>
           <Text>Hello</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    mainWrapper: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        width: '100%',
    },
    label: {
        width: '100%',
        textAlign: 'left'
    },
});

export default LoginView;
