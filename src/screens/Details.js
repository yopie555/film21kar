import Axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, Animated } from 'react-native';

export default function Details({ route, navigation }) {
    const [details, setDetails] = useState({});
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

    useEffect(() => {
        Animated.loop(
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
        ).start();
    }, []);

    useEffect(() => {
        Axios.get(
            'https://api.themoviedb.org/3/movie/' +
            route.params.movie_id +
            '?api_key=3e20a7c466ac2ae7ed3b5caafa316c1b&language=en-US',
        ).then((e) => setDetails(e.data));
    }, []);

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <Animated.Text
                style={{
                    position: 'absolute',
                    top: 20,
                    right: 0,
                    transform: [{ rotateZ: '45deg' }],
                    opacity: fadeAnim,
                }}>
                {details.status}
            </Animated.Text>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{details.title}</Text>
                <Image
                    source={{
                        uri: 'https://image.tmdb.org/t/p/w500' + details.poster_path,
                    }}
                    style={{ height: 300, width: 300 }}
                />
            </View>
            <View
                style={{
                    backgroundColor: '#dedede',
                    padding: 10,
                    margin: 10,
                }}>
                <Text style={{ textAlign: 'justify' }}>{details.overview}</Text>
            </View>
        {
                details.genres && details.genres.map((e) => (
                    <Text key={e.id}>{e.name}</Text>
                ))
            }
        </View>
    );
}