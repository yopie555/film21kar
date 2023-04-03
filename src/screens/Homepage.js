import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    Dimensions,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    ToastAndroid,
} from 'react-native';
import axios from 'axios';
import Search from './Search';

export default function ({ navigation }) {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const getMovies = async () => {
        await fetch(
            'https://api.themoviedb.org/3/trending/movie/day?api_key=3e20a7c466ac2ae7ed3b5caafa316c1b',
        )
            .then((response) => response.json())
            .then((json) => {
                console.log('json', json);
                setMovies(json.results);
            }
            )
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        console.log('useEffectss');

        getMovies();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <TextInput
                placeholder="Search movie"
                value={search}
                onChangeText={(e) => setSearch(e)}
            />
            <TouchableOpacity
                onPress={async () => {
                    setLoading(true);
                    await axios
                        .get(
                            `https://api.themoviedb.org/3/search/movie?api_key=570c36d75740509c00d865a804d826a5&language=en-US&page=1&query=${search}&include_adult=false`,
                        )
                        .then((e) => {
                            console.log('e', e);

                            setMovies(e.data.results);
                            setLoading(false);
                            setSearch('');
                            navigation.navigate('Search', {
                                movie: movies,
                            });
                        });
                }}>
                <Text>Submit</Text>
            </TouchableOpacity>
            <FlatList
                data={movies}
                numColumns={2}
                keyExtractor={(item) => item.id}
                renderItem={(e) => {
                    return (
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: 5,
                                borderWidth: 2,
                                borderColor: '#20cb9d',
                                borderRadius: 10,
                                backgroundColor: '#fff',
                                padding: 5,
                                elevation: 10,
                            }}
                            onPress={() => {
                                navigation.navigate('Details', { movie_id: e.item.id });
                            }}>
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Text
                                    style={{
                                        color: '#4A90E2',
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                    }}>
                                    {e.item.title}
                                </Text>
                            </View>
                            <Image
                                style={{
                                    height: Dimensions.get('screen').height * 0.15,
                                    width: Dimensions.get('screen').height * 0.15,
                                    borderRadius: 10,
                                }}
                                source={{
                                    uri: `https://image.tmdb.org/t/p/w500${e.item.poster_path}`,
                                }}
                            />
                            <Text>Movie id:{e.item.id}</Text>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
}