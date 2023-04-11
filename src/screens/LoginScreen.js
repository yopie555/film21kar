import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ToastAndroid
} from 'react-native'
import React from 'react'
import Logo from '../assets/movie.png'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [nip, setNip] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleLogin = async (value) => {
        console.log('value', value);
        try {
            const response = await
                axios.post('http://10.10.10.9:3200/users/login', {
                    nip: value.nip,
                    password: value.password
                })
            if (response.data.status == 200) {
                console.log('response', response.data)
                navigation.navigate('Homepage')
                ToastAndroid.show(response.data.metadata, ToastAndroid.SHORT)
                // AsyncStorage.setItem
                await AsyncStorage.setItem('password', value.password)
                await AsyncStorage.setItem('nip', value.nip)
                await AsyncStorage.setItem('nama', response.data.data.nama)
            }
        } catch (error) {
            console.log(error.message)
            ToastAndroid.show("Cek kembali nip dan password", ToastAndroid.SHORT)
        }
    }

    return (
        <View style={styles.container}>
            <Image
                source={Logo}
                style={styles.logo}
            />
            <Text
                style={{
                    color: '#fff',
                    fontSize: 30,
                    fontWeight: 'bold'
                }}
            >
                Movie App
            </Text>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Nip"
                    placeholderTextColor="white"
                    onChangeText={(nip) => setNip(nip)}
                    value={nip}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="white"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                    value={password}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={async () => {
                        await handleLogin({ nip, password });
                    }}>
                    <Text style={styles.textButton}>Login</Text>
                </TouchableOpacity>
                <Text style={styles.text}>Don't have an account?
                    <Text
                        style={{ fontWeight: 'bold' }}
                        onPress={() => navigation.navigate('RegisterScreen')}
                    >
                        Sign Up
                    </Text>
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 150,
        height: 150
    },
    input: {
        width: 300,
        height: 50,
        backgroundColor: '#333',
        borderRadius: 10,
        color: '#fff',
        paddingHorizontal: 20,
        marginBottom: 10
    },
    buttonLogin: {
        width: 300,
        height: 50,
        backgroundColor: '#f2ed46',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textLogin: {
        color: '#000',
        fontSize: 20,
    },
    text: {
        color: 'white',
        marginTop: 20,
        textAlign: 'center',
        fontSize: 16,
    },
    button: {
        width: 300,
        height: 50,
        backgroundColor: '#f2ed46',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold'
    },
})

export default LoginScreen