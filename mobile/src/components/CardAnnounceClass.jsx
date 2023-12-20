import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function CardAnnounceClass({ item }) {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const styles = StyleSheet.create({
    announcementItem: {
      backgroundColor: colors.text,
      marginBottom: 6,
      borderRadius: 8,
      width: 300,
      marginRight: 16,
      height: 240
    },
    announcementImage: {
      width: '60%',
      alignSelf: 'center',
      height: 120,
      marginBottom: 8,
      borderRadius: 8,
    },
    titleText: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.hardBackground,
    },
    titleTextModal: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.inverthard,
    },
    authorText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.primary,
      marginVertical: 8,
    },
    announcementText: {
      fontSize: 16,
      textAlign: 'justify',
      lineHeight: 20,
      color: colors.text,
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
      paddingVertical: 8,
    },
    line: {
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
      marginVertical: 8,
    },
    modalContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
      backgroundColor: colors.background,
      borderRadius: 8,
      padding: 16,
      width: '90%',
      maxHeight: '80%',
    },
    closeButton: {
      marginTop: 16,
      backgroundColor: colors.primary,
      padding: 8,
      borderRadius: 8,
      alignSelf: 'flex-start',
    },
    closeButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });

  return (
    <>
      <TouchableOpacity activeOpacity={0.4} onPress={toggleModal}>
        <View style={styles.announcementItem}>
          <Image source={require('../assets/green-info.png')} style={styles.announcementImage} />
          <View style={{ paddingHorizontal: 20, paddingVertical: 8 }}>
            <Text style={styles.titleText}>{item.Titulo}</Text>
            <View style={styles.line} />
            <Text style={styles.authorText}>{item.Autor} | Educador</Text>
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        transparent
        animationType="slide"
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Image source={require('../assets/megafone.jpg')} style={styles.announcementImage} />
            <View style={{ paddingHorizontal: 20, paddingVertical: 8 }}>
              <Text style={styles.titleTextModal}>{item.Titulo}</Text>
              <Text style={styles.announcementText}>{item.Anuncio}</Text>
              <Text style={styles.authorText}>{item.Autor} | Educador</Text>
              <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            </View>
            
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}
