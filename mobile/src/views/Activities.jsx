import React, { useState } from 'react';

import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

import { useTheme } from '@react-navigation/native';

import { useUserContext } from '../components/UserContext';

import { apiURL } from '../services/api';

const Activities = () => {
    const { colors } = useTheme();

    const [botaoRegistar, setBotaoRegistar] = useState(true);

    const [nomeAtividade, setNomeAtividade] = useState('');
    const [duracao, setDuracao] = useState('');
    const [descricao, setDescricao] = useState('');
    const [objetivo, setObjetivo] = useState('');


    const { user } = useUserContext();
    const acessoRegisto = user.role === "educador"

    const handleBotaoRegistar = () => {
        setBotaoRegistar(false);
    };

    const handleBotaoVoltar = () => {
        setBotaoRegistar(true);
        setNomeAtividade('');
        setDuracao('');
        setDescricao('');
        setObjetivo('');
    }

    const handleBotaoInserir = () => {

    }

    const Section = ({ color, content }) => (
        <View style={{ backgroundColor: color, borderRadius: 8, marginVertical: 12, padding: 16 }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{content}</Text>
        </View>
    );

    return (
        <View style={{ padding: 16, marginBottom: 60 }}>
            {botaoRegistar && acessoRegisto ? (
                <View style={styles.atividadesContainer}>
                    <Button
                        title="Registar Atividade"
                        color={colors.primary}
                        onPress={handleBotaoRegistar}
                    />
                </View>
            ) : (
                acessoRegisto && (
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome da Atividade"
                            value={nomeAtividade}
                            onChangeText={(text) => setNomeAtividade(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Duração (em minutos)"
                            value={duracao}
                            onChangeText={(text) => setDuracao(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Descrição"
                            value={descricao}
                            onChangeText={(text) => setDescricao(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Objetivo"
                            value={objetivo}
                            onChangeText={(text) => setObjetivo(text)}
                        />
                        <View style={styles.botoes}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                                <Button
                                    title="Voltar"
                                    color={colors.red}
                                    onPress={handleBotaoVoltar}
                                />
                                <View style={{ marginLeft: 10 }}>
                                    <Button
                                        title="Inserir Atividade"
                                        color={colors.primary}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                )
            )}

            {botaoRegistar && (
                <View>
                    <Section color="red" content={`Atividades Turma ${user.roleTraits[0].idTurma}`} />
                </View>
            )}

        </View>
    );
};

export default Activities;

const styles = StyleSheet.create({
    atividadesContainer: {
        alignItems: 'center',
        padding: 16,
        marginTop: 20
    },
    inputContainer: {
        width: '100%',
        paddingHorizontal: 15,
        marginTop: 30
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        height: 40,
        marginBottom: 10
    },
    botoes: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'center',
    }
});
