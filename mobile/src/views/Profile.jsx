import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';

import { useUserContext } from '../components/UserContext'; 
import { apiURL } from '../services/api';

export default function Profile() {
    const { user } = useUserContext(); 
    const [children, setChildren] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (user.role === 'encarregadoeducacao') { 
            fetchChildrenData();
        }
    }, []);

    const fetchChildrenData = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idCriancas: user.roleTraits.idCriancas })
        };
    
        try {
            const response = await fetch(apiURL + '/getChildrenData', requestOptions);
            
            
            console.log('Status Code:', response.status);
    
            if (!response.ok) {
                throw new Error(`Resposta de rede não foi ok, status: ${response.status}`);
            }
            const data = await response.json();
            
            if (data) {
                console.log(data.children["1"]);
                setChildren(data.children);
            } else {
                setErrorMessage('Não foi possível obter dados das crianças.');
            }
        } catch (error) {
            console.error('Erro ao buscar dados das crianças:', error);
            setErrorMessage(error.message || 'Erro desconhecido.');
        }
    };
    
//295313546
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.profileHeader}>
                    <View style={styles.profileImagePlaceholder} />
                    <Text style={styles.profileName}>{user?.userInfo.nome} | {user?.role}</Text>
                </View>
                {user.role === 'encarregadoeducacao' && ( 
                    <View style={styles.childrenSection}>
                        <Text style={styles.sectionTitle}>Crianças:</Text>
                        {children ? (
                            Object.entries(children).map(([index, child]) => (
                                <Text key={index} style={styles.childName}>
                                    {child.nome} - Turma: {child.idTurma}
                                </Text>
                            ))
                        ) : (
                            <Text style={styles.noChildrenText}>Não há crianças associadas.</Text>
                        )}
                    </View>
                )}
                {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000', // Fundo preto
    },
    contentContainer: {
        padding: 16,
        alignItems: 'center',
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImagePlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#e0e0e0', // Cor neutra para o placeholder da imagem
        marginBottom: 10,
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff', // Nome em branco
    },
    childrenSection: {
        width: '100%',
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff', // Título da seção em branco
        marginBottom: 10,
    },
    childName: {
        fontSize: 16,
        color: '#fff', // Nomes das crianças em branco
    },
    noChildrenText: {
        fontStyle: 'italic',
        color: '#999', // Texto informativo
    },
    errorText: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    }
});
