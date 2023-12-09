import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

import { apiURL } from '../services/api';

import { useTheme } from '@react-navigation/native';

import CardAnnounce from '../components/CardAnnounce';

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
      setAnnouncements(data.adminAnnouncements);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const renderAnnouncementItem = ({ item }) => (
    <CardAnnounce item={item} />
  );

  const Section = ({ color, content }) => (
    <View style={{ backgroundColor: color, borderRadius: 8, marginVertical: 12, padding: 16 }}>
      <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{content}</Text>
    </View>
  );

  return (
    <View style={{ padding: 16 }}>
      <Section color={"red"} content={"Anúncios Gerais"} />
      <FlatList
        data={announcements}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        renderItem={renderAnnouncementItem}
        showsHorizontalScrollIndicator={false}
      />
      <Section color={colors.primary} content={"Anúncios Turma"} />
      <FlatList
        data={announcements}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        renderItem={renderAnnouncementItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default AnunciosScreen;
