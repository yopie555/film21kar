import React, { useState } from 'react';
import { View, Text } from 'react-native';

export default function Search({ route }) {
    const [movies, setMovies] = useState(route.params.movie);
    return (
        <View>
            <Text>Search</Text>
            {movies.map((e) => (
                <Text key={e.id}>{e.title}</Text>
            ))}
        </View>
    );
}