import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CardActivity({ item, acesso, onEdit }) {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        cardActivity: {
            backgroundColor: colors.inverthard,
            marginBottom: 2,
            borderRadius: 8,
            width: '100%',
            paddingHorizontal: 16,
            paddingVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        activityText: {
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.hardBackground,
        },
        durationText: {
            fontSize: 14,
            color: colors.hardBackground,
        },
        icon: {
            fontSize: 22,
            color: colors.hardBackground,
        },
    });

    return (
        <View style={styles.cardActivity}>
            <View>
                <Text style={styles.activityText}>{item.nome}</Text>
                <Text style={styles.durationText}>Duração: {item.duracao} minutos</Text>
            </View>
            {acesso ? (
                <View style= {{flexDirection: 'row', gap: 20}}>
                    <TouchableOpacity onPress={() => onEdit(item)}>
                        <Icon name="pencil" style={styles.icon} />
                    </TouchableOpacity>
                    <Icon name="trash-o" style={{ fontSize: 22, color: 'red' }} /></View>
            ) : (
                <Icon name="eye" style={styles.icon} />
            )}
        </View>
    );
}
