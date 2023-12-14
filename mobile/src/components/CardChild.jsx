import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView, Image, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Foundation';
import { apiURL } from '../services/api';

export default function CardChild({ item, onPress, activity }) {
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [avaliacao, setAvaliacao] = useState(0);
    const [observacoes, setObservacoes] = useState('');
    const [existsEval, setExistsEval] = useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    useEffect(() => {
        fetchEvaluatedActivityChild()
        console.log(item);
    }, [modalVisible])

    const fetchEvaluatedActivityChild = async () => {
        const requestOptions =
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idCrianca: item.Id, idAtividade: activity?.idAtividade }),
        };

        try {
            const response = await fetch(apiURL + "/evaluation/verify", requestOptions);

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                if (data.existingEvaluation) {
                    setExistsEval(true);
                }
            }
        } catch (error) {

        }
    }

    const styles = StyleSheet.create({
        cardChild: {
            backgroundColor: (existsEval) ? colors.primary : colors.inverthard,
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
            backgroundColor: colors.background,
            flex: 1,
            alignItems: 'center',
            alignSelf: 'center',
            width: '100%'
        }
    });

    const handleRegisterEvaluation = async () => {
        const requestOptions =
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idCrianca: item.Id, idAtividade: activity.idAtividade, avaliacao, observacoes }),
        };

        try {
            const response = await fetch(apiURL + '/evaluation/create', requestOptions);

            if (response.ok){
                toggleModal();
                console.log("Avaliação Inserida com sucesso!")
            }
        } catch (error) {

        }
    }

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
                    <ScrollView>
                        <View style={{ paddingHorizontal: 15, paddingVertical: 30 }}>
                            <Text>Avaliação da criança [1-5]:</Text>
                            <TextInput placeholder='' value={avaliacao} onChangeText={(text) => setAvaliacao(text)} keyboardType='numeric'  style={{
                                borderColor: 'gray',
                                borderWidth: 1,
                                height: 40,
                                marginBottom: 10,
                            }} />
                            <Text>Observações:</Text>
                            <TextInput placeholder='' value={observacoes} onChangeText={(text) => setObservacoes(text)} style={{
                                borderColor: 'gray',
                                borderWidth: 1,
                                height: 40,
                                marginBottom: 10,
                            }} />
                            <TouchableOpacity onPress={handleRegisterEvaluation}><Text>Inserir avaliação</Text></TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => toggleModal()}><Text>Close</Text></TouchableOpacity>
                    </ScrollView>
                </View>
            </Modal>
        </View>

    );
}
