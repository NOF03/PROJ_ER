// AnunciosScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

import { apiURL } from '../services/api';

import { useTheme } from '@react-navigation/native';

import CardModal from '../components/CardModal';

const AnunciosScreen = () => {
  const [announcements, setAnnouncements] = useState(null);
  const { colors } = useTheme();
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch(apiURL + '/announcements');
      const data = await response.json();
      setAnnouncements(data.announcements);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const renderAnnouncementItem = () => {
    if (announcements) {
      return announcements.map((announce, index) => (
        <View key={index} style={styles.announcementItem}>
          <Image source={require('../assets/megafone.jpg')} style={styles.announcementImage} />
          <View style={{paddingHorizontal: 20, paddingVertical: 8}}>
            
            <Text style={styles.announcementText}>{announce.Anuncio}</Text>
            <Text style={styles.authorText}>{announce.Autor} | Admin</Text>
          </View>

        </View>
      ));
    }
    return null;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    announcementItem: {
      backgroundColor: colors.hardBackground,

      marginBottom: 6,
      borderRadius: 8,
    },
    announcementImage: {
      width: '100%', // or specify a fixed width if needed
      height: 120, // or specify a fixed height if needed
      marginBottom: 8,
      borderRadius: 8,
    },
    authorText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: 'red',
      marginVertical: 8,
    },
    announcementText: {
      fontSize: 16,
      textAlign: 'justify',
      lineHeight: 20,
      color: colors.text,
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
      paddingBottom: 8
    },
  });

  return (
    <View style={styles.container}>
      {renderAnnouncementItem()}
    </View>
  );
};




export default AnunciosScreen;
