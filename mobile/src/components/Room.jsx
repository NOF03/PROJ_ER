import React, { useEffect, useState } from 'react';

import { Modal, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { apiURL } from '../services/api';
import { useTheme } from '@react-navigation/native';
import { useUserContext } from './UserContext';

export default function Room({ item }) {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const { user } = useUserContext();
    const { colors } = useTheme();

    const openRoomModal = () => {
        setModalVisible(true);
    };

    const closeRoomModal = () => {
        setModalVisible(false);
    };
    useEffect(() => {
        console.log(item);
        fetchMessagesRoom();
    }, [modalVisible]);

    const fetchMessagesRoom = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idSala: item.idSala }),
        };

        try {
            const response = await fetch(apiURL + '/getMessagesRoom', requestOptions);

            if (response.ok) {
                const data = await response.json();
                console.log(data.messages);
                setMessages(data.messages); // Assuming your API returns a 'messages' array
            }
        } catch (error) {
            console.error(error);
        }
    };


    const sendMessage = async () => {
        console.log({ idSala: item.idSala, ccPessoa: user.roleTraits.ccPessoa, descricao: inputMessage });
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idSala: item.idSala, ccPessoa: user.roleTraits.ccPessoa, descricao: inputMessage }),
        };

        try {
            const response = await fetch(apiURL + '/sendMessagesRoom', requestOptions);

            if (response.ok) {
                console.log("Mensagem enviada!");
            } else {
                console.log("erro");
            }

        } catch (error) {
            console.error(error);
        }

    };

    return (
        <>

            <TouchableOpacity key={item.idSala} onPress={() => openRoomModal()} style={{ backgroundColor: 'red' }}>
                <Text>{item.tituloSala}</Text>
            </TouchableOpacity>

            <Modal
                transparent
                onRequestClose={closeRoomModal}
                visible={modalVisible}
                animationType="slide"
            >
                <SafeAreaView style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <View style={{ flex: 1, backgroundColor: colors.background }}>
                        <ScrollView>
                            {/* Render chat messages */}
                            {messages && messages.map((message, index) => (
                                <Text key={index}>{message.ccPessoa}: {message.descricao}</Text>
                            ))}
                        </ScrollView>
                        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                            <TextInput
                                style={{ flex: 1, borderWidth: 1, borderRadius: 5, padding: 10 }}
                                placeholder="Type a message..."
                                value={inputMessage}
                                onChangeText={(text) => setInputMessage(text)}
                            />
                            <TouchableOpacity onPress={sendMessage} style={{ marginLeft: 10, padding: 10, backgroundColor: colors.primary, borderRadius: 5 }}>
                                <Text style={{ color: 'white' }}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={closeRoomModal}
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 0.2 }}
                    />
                </SafeAreaView>
            </Modal>

        </>
    );
};