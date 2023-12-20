import React, { useEffect, useState } from 'react';
import { Modal, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { apiURL } from '../services/api';
import { useTheme } from '@react-navigation/native';
import { useUserContext } from './UserContext';

export default function Room({ item }) {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const { user } = useUserContext();
    const { colors } = useTheme();
    const styles = useStyles(item, colors);
    const [lastSender, setLastSender] = useState('');
    

    useEffect(() => {
        let isActive = true;
        if (modalVisible) {
            fetchMessagesRoom().then(lastSenderName => {
                if (isActive) setLastSender(lastSenderName);
            });
        }
        return () => {
            isActive = false;
        };
    });

    const fetchMessagesRoom = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idSala: item.idSala }),
        };
        const response = await fetch(apiURL + '/getMessagesRoom', requestOptions);
        const data = await response.json();
        setMessages(data.messages);
        if (data.messages.length > 0) {
            return data.messages[data.messages.length - 1].nome;
        }
        return '';
    };

    const sendMessage = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idSala: item.idSala, ccPessoa: user.roleTraits.ccPessoa, descricao: inputMessage }),
        };
        const response = await fetch(apiURL + '/sendMessagesRoom', requestOptions);
        if (response.ok) {
            setInputMessage("");
            await fetchMessagesRoom();
        }
    };

    const openRoomModal = () => {
        setModalVisible(true);
    };

    const closeRoomModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            <TouchableOpacity onPress={openRoomModal} style={styles.roomButton}>
                <Text style={styles.roomButtonText}>{item.tituloSala}</Text>
            </TouchableOpacity>
            <Modal transparent onRequestClose={closeRoomModal} visible={modalVisible} animationType="slide">
                <SafeAreaView style={styles.modalContainer}>
                    <View style={styles.modalInnerContainer}>
                        <ScrollView>
                            {messages.map((message, index) => {
                                const isFirstMessageBySender = index === 0 || messages[index - 1].nome !== message.nome;
                                return (
                                    <View key={index} style={[
                                        styles.messageContainer,
                                        message.nome === user.userInfo.nome ? styles.messageRight : styles.messageLeft
                                    ]}>
                                        {isFirstMessageBySender && <Text>{message.nome}</Text>}
                                        <Text style={styles.messageText}>{message.descricao}</Text>
                                    </View>
                                );
                            })}
                        </ScrollView>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.textInput}
                                value={inputMessage}
                                onChangeText={setInputMessage}
                                placeholder="Type a message..."
                            />
                            <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                                <Text style={styles.sendButtonText}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity onPress={closeRoomModal} style={styles.modalCloseArea} />
                </SafeAreaView>
            </Modal>
        </>
    );
}

function useStyles(item, colors) {
    return StyleSheet.create({
        roomButton: {
            backgroundColor: item.idSala == 9 ? "red" : colors.primary,
            padding: 20,
            marginVertical: 8,
            borderRadius: 10,
            alignItems: 'center',
        },
        roomButtonText: {
            color: 'white',
            fontWeight: 'bold',
        },
        modalContainer: {
            flex: 1,
            justifyContent: 'flex-end',
        },
        modalInnerContainer: {
            flex: 1,
            backgroundColor: colors.background,
        },
        messageContainer: {
            padding: 16,
            marginVertical: 4,
            maxWidth: '80%',
            borderRadius: 10,
        },
        messageRight: {
            backgroundColor: colors.primary,
            marginLeft: '20%',
            alignSelf: 'flex-end',
            borderTopRightRadius: 0,
        },
        messageLeft: {
            backgroundColor: colors.card,
            alignSelf: 'flex-start',
            borderTopLeftRadius: 0,
        },
        messageText: {
            color: colors.text,
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            margin: 10,
        },
        textInput: {
            flex: 1,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 5,
            padding: 10,
            color: colors.text,
            backgroundColor: colors.card,
        },
        sendButton: {
            marginLeft: 10,
            padding: 10,
            backgroundColor: "blue",
            borderRadius: 5,
        },
        sendButtonText: {
            color: 'white',
        },
        modalCloseArea: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            flex: 0.2,
        },
    });
}