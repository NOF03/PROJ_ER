import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';

import { apiURL } from '../services/api';

import { useTheme } from '@react-navigation/native';

import CardAnnounce from '../components/CardAnnounce';
import CardAnnounceClass from '../components/CardAnnounceClass';

import { useUserContext } from '../components/UserContext';

// ... (imports and component setup)

const AnunciosScreen = () => {
  const [announcements, setAnnouncements] = useState(null);
  const { colors } = useTheme();
  const { user } = useUserContext();
  const acessToAll = user.role === "administrador" || user.role === "auxiliareducativo"

  useEffect(() => {
    fetchAnnouncements();
    console.log(user)
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const input = (user.role === "encarregadoeducacao") ? {idEncarregado: user.roleTraits[0].idEncarregado} : { idTurma: user.roleTraits[0].idTurma };
      const requestOptions = acessToAll ? {} : {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      }

      const response = await fetch(apiURL + '/announcements', requestOptions);
      const data = await response.json();
      setAnnouncements(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const renderAnnouncementItem = ({ item }) => (
    <CardAnnounce item={item} />
  );

  const renderAnnouncementItemClass = ({ item }) => (
    <CardAnnounceClass item={item} />
  );

  const Section = ({ color, content }) => (
    <View style={{ backgroundColor: color, borderRadius: 8, marginVertical: 12, padding: 16 }}>
      <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{content}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ padding: 16, marginBottom: 60 }}>
      <ScrollView >
        <Text>Bem vindo, {user.userInfo[0].nome} | {user.role}</Text>

        {announcements && (
          <>
            <Section color={"red"} content={"Anúncios Gerais"} />
            <FlatList
              data={announcements.adminAnnouncements}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              renderItem={renderAnnouncementItem}
              showsHorizontalScrollIndicator={false}
            />

            {!acessToAll ? (
              <>
                <Section color={colors.primary} content={ (user.roleTraits[0].idTurma) ? "Anúncios Turma " + user.roleTraits[0].idTurma : "Anúncios Turma" } />
                <FlatList
                  data={announcements.classAnnouncements}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal
                  renderItem={renderAnnouncementItemClass}
                  showsHorizontalScrollIndicator={false}
                />
              </>
            ) : (
              Object.entries(announcements.classAnnouncements).map(([idTurma, data]) => (
                <React.Fragment key={idTurma}>
                  <Section color={colors.primary} content={`Anúncios Turma ` + idTurma} />
                  <FlatList
                    data={data}
                    keyExtractor={(item, subIndex) => subIndex.toString()}
                    horizontal
                    renderItem={renderAnnouncementItemClass}
                    showsHorizontalScrollIndicator={false}
                  />
                </React.Fragment>
              ))

            )
            }
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnunciosScreen;
