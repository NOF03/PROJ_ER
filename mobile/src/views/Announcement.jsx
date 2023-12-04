// AnunciosScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import { apiURL } from '../services/api';

const AnunciosScreen = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch(apiURL+'/hello');
 
      const data = await response.json();
      
      console.log(data);

      setAnnouncements(data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const renderAnnouncementItem = () => (
    <View style={styles.announcementItem}>
      <Text>AHHHHHH</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <FlatList
        data={announcements}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderAnnouncementItem}
      /> */}
  {renderAnnouncementItem()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  announcementItem: {
    backgroundColor: '#bbb',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
});

export default AnunciosScreen;
