import React, { useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    input: {
        margin: 10,
        height: 40,
        borderColor: "black",
        borderWidth: 2.5,
        borderRadius: 4
    },
});

const Login = ({ navigation }) => {

    const [username, setUsername] = useState('');
    const [password, SetPassword] = useState('');

    const login = () => {
        if (username == 'Anand' && password == '1234') {
            navigation.navigate('Home');
        }
    }

    return (
        <View>
            <Text>Login Form</Text>
            <TextInput
                style={styles.input}
                value={username}
                placeholder="Enter your username"
                onChangeText={text => setUsername(text)}
            />
            <TextInput
                style={styles.input}
                value={password}
                placeholder="Enter your password"
                secureTextEntry={true}
                onChangeText={text => SetPassword(text)}
            />

            <Button title='Login' onPress={login} />
        </View>
    )
}

export default Login;
