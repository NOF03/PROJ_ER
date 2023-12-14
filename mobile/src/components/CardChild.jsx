import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView, Image, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Foundation';

export default function CardChild({ item }) {
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    useEffect(() => {
        console.log(item);
    }, [])

    const styles = StyleSheet.create({
        cardChild: {
            backgroundColor: colors.inverthard,
            marginBottom: 2,
            borderRadius: 8,
            width: '100%',
            paddingHorizontal: 16,
            paddingVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        text: {
            fontSize: 15, 
            color: colors.hardBackground,
        },
        icon: {
            fontSize: 22,
            color: colors.hardBackground,
        },
        modalContainer: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            flex: 1,
            alignItems: 'center',
            alignSelf: 'center',
        }
    });

    return (
        <View>
            <View style={styles.cardChild}>
                <Text style={styles.text}>{item.CartaoCidadao} - {item.Nome} </Text>
                <TouchableOpacity onPress={() => toggleModal()}>
                    <Icon name="clipboard-notes" style={styles.icon} />
                </TouchableOpacity>
            </View>
            <Modal
                transparent
                animationType="slide"
                visible={modalVisible}
                onRequestClose={toggleModal}
                style={{ width: '100%', height: '100%' }}
            >
                <View style={styles.modalContainer}>
                    <ScrollView contentContainerStyle={styles.modalContent}>
                        <View style={{ paddingHorizontal: 20, paddingVertical: 8 }}>
                            <Text>Avaliação da criança:</Text>
                            <TextInput placeholder=''/>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </View>

    );
}
