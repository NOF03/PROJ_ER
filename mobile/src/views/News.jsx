import React, { useEffect, useState } from 'react';

import { FlatList, SafeAreaView } from 'react-native';
import { useUserContext } from '../components/UserContext';
import { apiURL } from '../services/api';

import Room from '../components/Room';

export default function News() {

    const [rooms, setRooms] = useState(null)
    const { user } = useUserContext();

    useEffect(() => {
        fetchRooms();
    }, [])

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
                console.log(roomsArray);
                setRooms(roomsArray);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const RenderNewsItemClass = ({ item }) => (
        <Room item={item} />
    );


    return (
        <SafeAreaView style={{ flex: 1 }}>
            {rooms != null && <FlatList
                data={rooms}
                renderItem={RenderNewsItemClass}
                keyExtractor={(item) => item.idSala.toString()}
            />}
        </SafeAreaView>

    );
};
