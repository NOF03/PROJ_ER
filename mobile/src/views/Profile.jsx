import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, Animated } from 'react-native';

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
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.profileHeader}>
                    <View style={styles.profileImagePlaceholder} />
                    <Text style={styles.profileName}>{user?.userInfo.nome} | {user?.role}</Text>
                    <Text style={styles.profileInfo}>Idade: {user?.userInfo.idade}</Text>
                    {user?.roleTraits.contacto && <Text style={styles.profileInfo}>Contacto: {user?.roleTraits.contacto}</Text>}
                    {user?.roleTraits.parentesco && <Text style={styles.profileInfo}>Parentesco: {user?.roleTraits.parentesco}</Text>}
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
        backgroundColor: '#f0f4f7',
    },
    contentContainer: {
        padding: 16,
        alignItems: 'center',
    },
    profileHeader: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
        padding: 15,
    },
    profileImagePlaceholder: {
        width: 130,
        height: 130,
        borderRadius: 65,
        backgroundColor: '#e0e0e0',
        marginBottom: 12,
        borderWidth: 3,
        borderColor: '#d4d4d4',
    },
    profileName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#364f6b',
    },
    profileInfo: {
        fontSize: 16,
        color: '#555',
        marginTop: 5,
        marginBottom: 3,
    },
    childrenSection: {
        width: '100%',
        marginTop: 25,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
        padding: 15,
    },
    sectionTitle: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#364f6b',
        marginBottom: 12,
    },
    childName: {
        fontSize: 16,
        color: '#555',
        marginTop: 6,
        marginBottom: 4,
    },
    noChildrenText: {
        fontStyle: 'italic',
        color: '#999',
        fontSize: 15,
    },
    errorText: {
        color: '#d9534f',
        marginTop: 10,
        textAlign: 'center',
        fontSize: 16,
    }
});
