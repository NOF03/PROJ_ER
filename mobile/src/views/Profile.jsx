import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useUserContext } from '../components/UserContext';
import { apiURL } from '../services/api';


export default function Profile() {
    const { colors } = useTheme();
    const { user } = useUserContext();
    const [children, setChildren] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const fadeAnim = useRef(new Animated.Value(0)).current; // Inicializa a animação de opacidade

    useEffect(() => {
        if (user.role === 'encarregadoeducacao') {
            fetchChildrenData();
        }

        // Animação de entrada para o perfil
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

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

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background, // Cor de fundo conforme o tema
        },
        contentContainer: {
            padding: 16,
            alignItems: 'center',
        },
        profileHeader: {
            width: '100%',
            alignItems: 'center',
            marginBottom: 20,
            padding: 20,
            borderRadius: 10,
            backgroundColor: colors.card, // Cor de fundo do card conforme o tema
        },
        profileImagePlaceholder: {
            width: 140,
            height: 140,
            borderRadius: 70,
            backgroundColor: '#cccccc', // Um cinza neutro
            marginBottom: 15,
            justifyContent: 'center', // Centraliza o ícone da câmera se estiver usando um
            alignItems: 'center', // Cor de fundo do placeholder conforme o tema
        },
        profileName: {
            fontSize: 19,
            fontWeight: 'bold',
            color: colors.text, // Cor do texto conforme o tema
        },
        profileInfo: {
            fontSize: 18,
            color: colors.text, // Cor do texto conforme o tema
            marginTop: 8,
            marginBottom: 5,
        },
        childrenSection: {
            width: '100%',
            marginTop: 30,
            padding: 20,
            borderRadius: 10,
            backgroundColor: colors.card, // Cor de fundo do card conforme o tema
        },
        sectionTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.text, // Cor do texto conforme o tema
            marginBottom: 15,
        },
        childName: {
            fontSize: 18,
            color: colors.text, // Cor do texto conforme o tema
            marginTop: 8,
            marginBottom: 6,
        },
        noChildrenText: {
            fontStyle: 'italic',
            fontSize: 16,
            color: colors.text, // Cor do texto conforme o tema
        },
        errorText: {
            color: colors.error, // Assumindo que você tem uma cor 'error' definida no tema
            marginTop: 15,
            textAlign: 'center',
            fontSize: 17,
        }
    });

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