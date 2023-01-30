import React from 'react';
import * as Keychain from 'react-native-keychain';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

const LoginView = ({navigation}) => {
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');

    const saveBiometry = async() => {
         try {
         await Keychain.setGenericPassword(
             userName,
             password,
             {
               accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
               securityLevel: Keychain.SECURITY_LEVEL.SECURE_HARDWARE,
               storage: null,
             }
           );
           console.log('setGenericPassword success');
            setUserName('');
            setPassword('');
            navigation.navigate('Home');
         } catch (err) {
           console.log('setGenericPassword failed..', err);
         }
       }

    const resetBiometry = async() => {
         try {
           await Keychain.resetGenericPassword();
           console.log('successfully reset');
         } catch (err) {
           console.log('reset failed');
         }
       }

    const loadBiometryChallenge = async() => {
        try {
            const options = {
                authenticationPrompt: {
                title: 'Authentication needed',
                subtitle: 'Subtitle',
                description: 'Please login',
                cancel: 'Cancel',
              },
            };
            const credentials = await Keychain.getGenericPassword(options);
            if (credentials) {
                console.log('biometry login success..', credentials);
                navigation.navigate('Home');
            } else {
                console.log('biometry login failed!', credentials);
            }
        } catch (err) {
            console.log('Could not load credentials', err);
        }
    }

    const getBio = async () => {
       try {
          const credentials = await Keychain.getSupportedBiometryType();
          console.log('credentials', credentials);
          credentials && loadBiometryChallenge();
       } catch (error) {
          console.log('Keychain could not be accessed!', error);
       }
    }

    React.useEffect(() => {
        getBio();
    }, []);
    return (
        <View style={styles.mainWrapper}>
            <View style={styles.loginWrapper}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setUserName}
                    value={userName}
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                />
                <Button
                    onPress={() => saveBiometry()}
                    style={styles.loginButton}
                    title="Login"
                    accessibilityLabel="Press tp login"
                />
                <Text style={styles.label}></Text>
                <Button
                   onPress={() => resetBiometry()}
                    style={styles.loginButton}
                    title="Reset"
                    accessibilityLabel="Press to disable biometric"
               />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    loginWrapper: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F6F6F6',
        borderWidth: 1,
        marginLeft: '5%',
        marginRight: '5%',
        padding: 15
    },
    label: {
        width: '100%',
        textAlign: 'left'
    },
    input: {
        height: 40,
        width: '100%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white'
    }
});

export default LoginView;
