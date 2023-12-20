import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useUserContext } from '../components/UserContext';
import { apiURL } from '../services/api';
import CardActivity from '../components/CardActivity';
import CardChild from '../components/CardChild';

const Activities = () => {
    const { colors } = useTheme();

    const [botaoRegistar, setBotaoRegistar] = useState(true);
    const [emEdicao, setEmEdicao] = useState(false);
    const [nomeAtividade, setNomeAtividade] = useState('');
    const [duracao, setDuracao] = useState('');
    const [descricao, setDescricao] = useState('');
    const [objetivo, setObjetivo] = useState('');
    const [atividades, setAtividades] = useState(null);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [criancas, setCriancas] = useState(null);
    const [emAvalicao, setEmAvaliacao] = useState(null);
    const [selectedChild, setSelectedChild] = useState(null);
    const [emObservacao, setEmObservacao] = useState(false);
    
    const [avaliacao, setAvaliacao] = useState(0);
    const [observacoes, setObservacoes] = useState('');

    const { user } = useUserContext();
    const acessoRegisto = user.role === 'educador';

    useEffect(() => {
        fetchActivities();

    }, [botaoRegistar]);

    useEffect(() => {
        fetchCriancas();
    }, [])

    const handleBotaoRegistar = () => {
        setBotaoRegistar(false);
        setEmEdicao(false)
    };

    const handleBotaoVoltar = () => {
        setBotaoRegistar(true);
        setNomeAtividade('');
        setDuracao(0);
        setDescricao('');
        setObjetivo('');
        setSelectedActivity(null);
    };

    const handleEditActivity = async (activity) => {

        setSelectedActivity(activity);
        setBotaoRegistar(false);
        setEmObservacao(false);
        setEmEdicao(true);

        setNomeAtividade(activity.nome);
        setDuracao(activity.duracao.toString());
        setDescricao(activity.descricao);
        setObjetivo(activity.objetivo);
    };

    const handleWatchingActivity = async (activity) => {
        setSelectedActivity(activity);
        setBotaoRegistar(false);
        setEmEdicao(false);
        setEmObservacao(true);

        setNomeAtividade(activity.nome);
        setDuracao(activity.duracao.toString());
        setDescricao(activity.descricao);
        setObjetivo(activity.objetivo);

    }

    const handleDeleteActivity = async (activity) => {
        const requestOptions =
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idAtividade: activity.idAtividade }),
        };

        try {

            const response = await fetch(apiURL + '/activities/delete', requestOptions);

            if (response.ok) {
                console.log("Atividade removida!");
                setBotaoRegistar(false);
                setBotaoRegistar(true);
                setSelectedActivity(null);
            }

        } catch (error) {
            console.error('Erro ao buscar atividades:', error);
        }
    }

    const handleAvaliacao = async (child) => {
        setSelectedChild(child);

        setEmAvaliacao(child.avaliacao);
    }

    const handleRegistarAtividade = async () => {
        const requestOptions =
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idTurma: user.roleTraits.idTurma, nomeAtividade, duracao, descricao, objetivo, idAtividade: selectedActivity?.idAtividade }),
        };

        try {

            const response = await fetch(apiURL + '/activities/create', requestOptions);

            if (response.ok) {
                console.log("Atividade adicionada!");
                setBotaoRegistar(true);
                setEmEdicao(false);
            }

        } catch (error) {
            console.error('Erro ao buscar atividades:', error);
        }
    }

    const fetchActivities = async () => {
        try {
            const requestOptions =
                user.role === 'administrador'
                    ? {}
                    : {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ idTurma: (user.role !== "encarregadoeducacao") ? user.roleTraits.idTurma : user.roleTraits.idCriancas }),
                    };

            const response = await fetch(apiURL + '/activities', requestOptions);

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setAtividades(data.activities);
            }
        } catch (error) {
            console.error('Erro ao buscar atividades:', error);
        }
    };

    const fetchCriancas = async () => {
        try {
            const requestOptions =
                user.role === 'administrador' ? {} :
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ idTurma: user.roleTraits.idTurma }),
                    };

            const response = await fetch(apiURL + '/activities/showChildren', requestOptions);

            if (response.ok) {
                const data = await response.json();
                console.log(data.turma);
                setCriancas(data.turma);
            }
        } catch (error) {
            console.error('Erro ao buscar atividades:', error);
        }
    }

    const renderActivitiesItemClass = ({ item }) => (
        acessoRegisto ? (
            <CardActivity item={item} acesso={acessoRegisto} onEdit={handleEditActivity} onDelete={handleDeleteActivity} />
        ) : (
            <CardActivity item={item} acesso={acessoRegisto} onWatching={handleWatchingActivity} />
        )
    );


    const renderChildrenItemClass = ({ item }) => (
        <CardChild item={item} emAvalicao={handleAvaliacao} activity={selectedActivity} />
    )

    const Section = ({ color, content }) => (
        <View style={{ backgroundColor: color, borderRadius: 8, marginVertical: 12, padding: 16 }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{content}</Text>
        </View>
    );

    return (
        <ScrollView style={{ padding: 16, marginBottom: 60 }}>
            {botaoRegistar && acessoRegisto ? (
                <View style={styles.atividadesContainer}>
                    <Button title="Registar Atividade" color={colors.primary} onPress={handleBotaoRegistar} />
                </View>
            ) : (
                !botaoRegistar && !emEdicao && !emObservacao && (
                    <View style={styles.inputContainer}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }}>Registar Atividade</Text>
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
                                <Button title="Cancelar Registo" color={'red'} onPress={handleBotaoVoltar} />
                                <View style={{ marginLeft: 10 }}>
                                    <Button title="Inserir Atividade" color={colors.primary} onPress={handleRegistarAtividade} />
                                </View> 
                            </View>
                        </View>
                    </View>
                )
            )}

            {botaoRegistar && atividades && Object.entries(atividades).map(([idTurma, data]) => (
                <React.Fragment key={idTurma}>
                    <Section color={'red'} content={`Atividades Turma ` + idTurma} />
                    <FlatList
                        data={data}
                        keyExtractor={(item, subIndex) => subIndex.toString()}
                        renderItem={renderActivitiesItemClass}
                        style={{ width: '100%' }}
                    />
                </React.Fragment>
            ))}

            {!botaoRegistar && emEdicao && selectedActivity && !emObservacao && (
                <>
                    <View style={styles.inputContainer}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }}>Editar Atividade</Text>
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
                            keyboardType="numeric"
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
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Button title="Cancelar Edição" color={'red'} onPress={handleBotaoVoltar} />
                                <View style={{ marginLeft: 10 }}>
                                    <Button title="Salvar Edição" color={colors.primary} onPress={handleRegistarAtividade} />
                                </View>

                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', marginTop: 30 }}>Avaliação</Text>
                        {criancas && <>
                            <FlatList
                                data={criancas}
                                keyExtractor={(item, subIndex) => subIndex.toString()}
                                renderItem={renderChildrenItemClass}
                            />
                        </>}

                    </View>
                </>
            )}

            {!botaoRegistar && selectedActivity && emObservacao && !emEdicao && (
                <View style={styles.activityContainer}>
                    <Text style={styles.activityTitle}>Nome: {selectedActivity.nome}</Text>
                    <Text style={styles.activityText}>Duração: {selectedActivity.duracao}</Text>
                    <Text style={styles.activityText}>Descrição: {selectedActivity.descricao}</Text>
                    <Text style={styles.activityText}>Objetivos: {selectedActivity.objetivo}</Text>
                    <TouchableOpacity
                        onPress={handleBotaoVoltar}
                        style={styles.backButton}
                    ><Text>Voltar Atrás</Text></TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
};

export default Activities;

const styles = StyleSheet.create({
    atividadesContainer: {
        alignItems: 'center',
        padding: 16,
        marginTop: 20,
    },
    inputContainer: {
        width: '100%',
        paddingHorizontal: 15,
        marginTop: 30,
    },
    activityContainer: {
        padding: 16,
        borderRadius: 10,
        elevation: 3,
        marginBottom: 20,
    },
    activityText: {
        fontSize: 16,
        marginBottom: 10,
    },
    activityTitle: {
        fontSize: 20,
        marginBottom: 10,
    },
    backButton: {
        marginTop: 20,
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        height: 40,
        marginBottom: 10,
    },
    botoes: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
