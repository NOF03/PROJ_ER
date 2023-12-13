import React, { useState } from 'react';

import { View, Image, TextInput, Button, Text, StyleSheet } from 'react-native';

import { useTheme } from '@react-navigation/native';

import { apiURL } from '../services/api';

import { useUserContext } from '../components/UserContext';

export default function MenuLogin({navigation}) {

    const [ccPessoa, setCcPessoa] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { colors } = useTheme();
    const { setUserContext } = useUserContext();

    const verifyIdentification = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ccPessoa })
        };
        try {

            const response = await fetch(apiURL + '/verifyIdentification', requestOptions);
  
            const data = await response.json();
            if (data.userExists) {
                setUserContext(data.user);
                navigation.navigate('InAppNavigator');
            } else {
                setErrorMessage('Número não consta na base de dados');
            }
           
        
        } catch (networkError) {
            console.error('Network Error:', networkError);
            setErrorMessage('Ocorreu um erro de rede ao verificar a identificação.');
        }
    };
    
    



    return (
        <View style={styles.container}>
            <Image source={require('../assets/linkgov.png')} style={{resizeMode: 'center'}}/>
            <TextInput
                style={styles.input}
                onChangeText={text => setCcPessoa(text)}
                value={ccPessoa}
                placeholder="Digite o número do CC"
                keyboardType="numeric"
            />
            <Button
                title="Entrar"
                color={colors.primary}
                onPress={verifyIdentification}
            />
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: 200,
        marginBottom: 12,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    }
});
