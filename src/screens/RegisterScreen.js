import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
} from 'react-native'
import React, { useState } from 'react'
import Logo from '../assets/movie.png'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

const RegisterScreen = () => {
    const navigation = useNavigation();
    const [nip, setNip] = useState('');
    const [nama, setNama] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async (value) => {
        console.log('value', value);
        try {
            const response = await
                axios.post('http://10.10.10.9:3200/users', {
                    nip: value.nip,
                    nama: value.nama,
                    password: value.password
                })
            if (response.data.status == 200) {
                console.log('response', response.data)
            }
        } catch (error) {
            console.log(error.message)
            ToastAndroid.show(error.message, ToastAndroid.SHORT)
        }
    }

    return (
        <View style={styles.container}>
            <Image source={Logo} style={styles.logo} />
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
                    placeholder="Nama"
                    placeholderTextColor="white"
                    onChangeText={(nama) => setNama(nama)}
                    value={nama}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="white"
                    onChangeText={(password) => setPassword(password)}
                    value={password}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor="white"
                    onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                    value={confirmPassword}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleRegister({ nip, nama, password })}
                >
                    <Text style={styles.textButton}>Register</Text>
                </TouchableOpacity>
                <Text style={styles.text}>Already have an account?
                    <Text
                        style={{ fontWeight: 'bold' }}
                        onPress={() => navigation.goBack()}
                    > Sign in</Text>
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
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
    },
    input: {
        width: 300,
        height: 50,
        backgroundColor: '#333',
        borderRadius: 10,
        color: 'white',
        paddingHorizontal: 20,
        marginBottom: 20,
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
    },
    text: {
        color: 'white',
        marginTop: 20,
        textAlign: 'center',
        fontSize: 16,
    },
})

export default RegisterScreen