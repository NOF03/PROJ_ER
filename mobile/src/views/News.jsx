import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useUserContext } from '../components/UserContext';
import { apiURL } from '../services/api';
import Room from '../components/Room';

export default function News() {
    const [rooms, setRooms] = useState([]);
    const { user } = useUserContext();
    const { colors } = useTheme();
    const styles = useStyles(colors);

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ccPessoa: user.roleTraits.ccPessoa }),
        };

        try {
            const response = await fetch(apiURL + '/getRooms', requestOptions);
            if (response.ok) {
                const data = await response.json();
                const roomsArray = Object.entries(data.rooms).map(([idSala, roomData]) => ({
                    idSala,
                    ...roomData,
                }));
                console.log(roomsArray)
                setRooms(roomsArray);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const RenderNewsItem = ({ item }) => (
        <Room item={item} />
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={rooms}
                renderItem={RenderNewsItem}
                keyExtractor={(item) => item.idSala.toString()}
                contentContainerStyle={styles.contentContainer}
            />
        </SafeAreaView>
    );
}

function useStyles(colors) {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        contentContainer: {
            padding: 16,
        },
        roomItem: {
            width: '100%',
            alignItems: 'center',
            marginBottom: 20,
            padding: 20,
            borderRadius: 10,
            backgroundColor: colors.card,
        },
        roomHeader: {
            width: '100%',
            alignItems: 'center',
            marginBottom: 10,
        },
        roomTitle: {
            fontSize: 19,
            fontWeight: 'bold',
            color: colors.text,
        },
        roomDetails: {
            fontSize: 18,
            color: colors.text,
            marginTop: 8,
            marginBottom: 5,
        },
        separator: {
            height: 1,
            backgroundColor: colors.border,
        },
        roomInfo: {
            fontSize: 16,
            color: colors.text,
            fontStyle: 'italic',
        },
        errorText: {
            color: colors.error,
            marginTop: 15,
            textAlign: 'center',
            fontSize: 17,
        },
    });
}
