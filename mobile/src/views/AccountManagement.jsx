import React, { useState } from "react";
import { Button, TextInput, View, SafeAreaView, ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from '@react-navigation/native';
import { apiURL } from "../services/api";

export default function AccountManagement() {
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState(0);
    const [ccPessoa, setCcPessoa] = useState('');
    const [salario, setSalario] = useState('');
    const [contacto, setContacto] = useState('');
    const [turma, setTurma] = useState('');
    const [parentesco, setParentesco] = useState('');
    const [numeroCriancas, setNumeroCriancas] = useState('');
    const [nomeCriancas, setNomeCriancas] = useState([]);
    const [idadeCriancas, setIdadeCriancas] = useState([]);
    const [ccCriancas, setCcCriancas] = useState([]);
    const [turmaCriancas, setTurmaCriancas] = useState([]);
    const [role, setRole] = useState(null);
    const { colors } = useTheme();
    const styles = useStyles(colors);

    const renderCriancasInputs = () => {
        let inputs = [];
        for (let i = 0; i < parseInt(numeroCriancas, 10); i++) {
            inputs.push(
                <View key={i} style={styles.inputGroup}>
                    <Text style={{ textAlign: 'center', fontSize: 17, padding: 10 }}>CRIANÇA NUMERO {i + 1}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={`Nome Criança ${i + 1}`}
                        value={nomeCriancas[i] || ''}
                        onChangeText={(text) => handleNomeCriancasChange(text, i)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={`Idade Criança ${i + 1}`}
                        value={idadeCriancas[i] || ''}
                        onChangeText={(text) => handleIdadeCriancasChange(text, i)}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={`CC Criança ${i + 1}`}
                        value={ccCriancas[i] || ''}
                        onChangeText={(text) => handleCcCriancasChange(text, i)}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={`Turma Criança ${i + 1}`}
                        value={turmaCriancas[i] || ''}
                        onChangeText={(text) => handleTurmaCriancasChange(text, i)}
                        keyboardType="numeric"
                    />
                </View>
            );
        }
        return inputs;
    };

    const handleNomeCriancasChange = (text, index) => {
        let updatedNomeCriancas = [...nomeCriancas];
        updatedNomeCriancas[index] = text;
        setNomeCriancas(updatedNomeCriancas);
    };

    const handleIdadeCriancasChange = (text, index) => {
        let updatedIdadeCriancas = [...idadeCriancas];
        updatedIdadeCriancas[index] = text;
        setIdadeCriancas(updatedIdadeCriancas);
    };

    const handleCcCriancasChange = (text, index) => {
        let updatedCcCriancas = [...ccCriancas];
        updatedCcCriancas[index] = text;
        setCcCriancas(updatedCcCriancas);
    };

    const handleTurmaCriancasChange = (text, index) => {
        let updatedTurmaCriancas = [...turmaCriancas];
        updatedTurmaCriancas[index] = text;
        setTurmaCriancas(updatedTurmaCriancas);
    };

    const handleCreatePerson = async () => {
        console.log(nomeCriancas, idadeCriancas, ccCriancas)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, idade, ccPessoa, parentesco, salario, contacto, turma, numeroCriancas, nomeCriancas, idadeCriancas, ccCriancas, turmaCriancas, role }),
        };
        try {
            const response = await fetch(apiURL + "/createPersonOnRole", requestOptions);

            if (response.ok) {
                setNome('');
                setIdade('');
                setCcPessoa('');
                setCcCriancas([]);
                setContacto('');
                setIdadeCriancas([]);
                setNomeCriancas([]);
                setParentesco('');
                setRole(null);
                setSalario('');
                setTurma('');
                setTurmaCriancas([]);
                setNumeroCriancas('');
                console.log({ role } + "Adicionado");
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
                {!role ? (
                    <>
                        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={() => setRole("encarregadoeducacao")}>
                            <Text style={styles.buttonText}>Criar Encarregado e Criança(s)</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={() => setRole("educador")}>
                            <Text style={styles.buttonText}>Criar Educador</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={() => setRole("auxiliareducativo")}>
                            <Text style={styles.buttonText}>Criar Auxiliar</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome"
                            value={nome}
                            onChangeText={setNome}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Idade"
                            value={idade}
                            onChangeText={setIdade}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Cartão de Cidadão"
                            value={ccPessoa}
                            onChangeText={setCcPessoa}
                            keyboardType="numeric"
                        />
                        <TextInput
                                    style={styles.input}
                                    placeholder="Contacto"
                                    value={contacto}
                                    onChangeText={setContacto}
                                    keyboardType="numeric"
                                />
                        {role === "educador" || role === "auxiliareducativo" ? (
                            <>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Salario"
                                    value={salario}
                                    onChangeText={setSalario}
                                    keyboardType="numeric"
                                />
                                
                                {role === "educador" && (
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Turma"
                                        value={turma}
                                        onChangeText={setTurma}
                                        keyboardType="numeric"
                                    />
                                )}
                            </>
                        ) : (
                            <>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Parentesco"
                                    value={parentesco}
                                    onChangeText={setParentesco}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Numero de Crianças"
                                    value={numeroCriancas.toString()}
                                    onChangeText={setNumeroCriancas}
                                    keyboardType="numeric"
                                />
                                {renderCriancasInputs()}
                            </>
                        )}
                        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleCreatePerson}>
                            <Text style={styles.buttonText}>Criar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, { backgroundColor: "red" }]} onPress={() => setRole(null)}>
                            <Text style={styles.buttonText}>Voltar</Text>
                        </TouchableOpacity>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

function useStyles(colors) {
    return StyleSheet.create({
        safeArea: {
            flex: 1,
            backgroundColor: colors.background, // ou use '#000' se for um tema escuro
            paddingBottom: 70
        },
        scrollView: {
            flex: 1,
        },
        contentContainer: {
            padding: 20,
            paddingBottom: 50
        },
        input: {
            backgroundColor: colors.card, // ou use '#1e1e1e' para um fundo de entrada escuro
            color: colors.text, // ou use '#fff' para texto branco
            borderBottomColor: '#303030', // cor da borda inferior para as entradas
            borderBottomWidth: 1,
            padding: 10,
            marginBottom: 10,
        },
        button: {
            borderRadius: 8,
            marginVertical: 12,
            padding: 16,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 3,
            shadowOpacity: 0.3,
            shadowRadius: 4,
            shadowOffset: { height: 2, width: 0 },
        },
        buttonText: {
            color: colors.inverthard,
            fontSize: 20,
            fontWeight: 'bold',
        },
        listItem: {
            backgroundColor: colors.card, // ou '#1e1e1e' para itens de lista escuros
            padding: 10,
            marginVertical: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 5,
            borderColor: colors.primary, // ou uma cor do seu tema
            borderWidth: 1,
        },
        listItemText: {
            color: colors.text, // ou '#fff' para texto branco
        },
        // Outros estilos necessários
    });
}