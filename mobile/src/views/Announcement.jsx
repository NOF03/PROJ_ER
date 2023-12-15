import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ScrollView, SafeAreaView, TextInput, Button } from 'react-native';

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
  const acessToAll = user.role === "administrador" || user.role === "auxiliareducativo";
  const acessToMultipleAnnonunces = user.role === "administrador" || user.role === "auxiliareducativo" || user.role === "encarregadoeducacao";
  const [newAnnouncementTitle, setNewAnnouncementTitle] = useState('');
  const [newAnnouncementDescription, setNewAnnouncementDescription] = useState('');

  useEffect(() => {
    fetchAnnouncements();
    console.log(user)
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const input = user.role === "encarregadoeducacao" ? { idTurma: user.roleTraits.idCriancas } : { idTurma: user.roleTraits.idTurma };
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

  const createAdminAnnouncement = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo: newAnnouncementTitle, descricao: newAnnouncementDescription, idAdmin: user.roleTraits.idAdministrador })

    };
    try {
      const response = await fetch(apiURL + "/announcements/createAdmin", requestOptions);
      console.log(response);

    } catch (networkError) {
      console.error('Network Error:', networkError);
    }
  }
  const createClassAnnouncement = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo: newAnnouncementTitle, descricao: newAnnouncementDescription, idTurma: user.roleTraits.idTurma })
    };
    try {
      const response = await fetch(apiURL + "/announcements/createClass", requestOptions);
      console.log(response);

    } catch (networkError) {
      console.error('Network Error:', networkError);
      setErrorMessage('Ocorreu um erro de rede ao verificar a identificação.');
    }
  }

  const renderAnnouncementItem = ({ item }) => (
    <CardAnnounce item={item} />
  );

  const renderAnnouncementItemClass = ({ item }) => (
    <CardAnnounceClass item={item} />
  );

  const Section = ({ color, content }) => (
    <View style={{ backgroundColor: color, borderRadius: 8, marginVertical: 12, padding: 16 }}>
      <Text style={{ color: colors.inverthard, fontSize: 20, fontWeight: 'bold' }}>{content}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ padding: 16, marginBottom: 60 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{ fontSize: 36, color: colors.inverthard, fontWeight: 600, textAlign: 'center' }}>Bem vindo, </Text>
        <Text style={{ fontSize: 21, color: colors.inverthard, fontWeight: 600, textAlign: 'center' }}>{user.userInfo.nome}</Text>
        <Text style={{ fontSize: 12, color: colors.inverthard, fontWeight: 600, textAlign: 'center', marginBottom: 10 }}>| {user.role} |</Text>

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

            {!acessToMultipleAnnonunces ? (
              <>
                <Section color={colors.primary} content={"Anúncios Turma " + user.roleTraits.idTurma} />
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
        {user.role === "administrador" && (<>
          <Text style={{ fontSize: 21, color: 'red', fontWeight: 600, textAlign: 'center', marginVertical: 10 }}>Adicionar Anúncio Geral</Text>
          <TextInput placeholder='Título do anúncio' style={{ borderWidth: 1, borderColor: colors.inverthard, padding: 12, marginVertical: 10 }} value={newAnnouncementTitle} onChangeText={text => setNewAnnouncementTitle(text)} />
          <TextInput placeholder='Descrição do anúncio' style={{ borderWidth: 1, borderColor: colors.inverthard, padding: 12, marginVertical: 10 }} value={newAnnouncementDescription} onChangeText={text => setNewAnnouncementDescription(text)} />
          <Button title="Inserir" color={"red"} onPress={createAdminAnnouncement} style={{ padding: 12 }} />
        </>)}
        {user.role === "educador" && (<>
          <Text style={{ fontSize: 21, color: colors.primary, fontWeight: 600, textAlign: 'center', marginVertical: 10 }}>Adicionar Anúncio Turma</Text>
          <TextInput placeholder='Título do anúncio' style={{ borderWidth: 1, borderColor: colors.inverthard, padding: 12, marginVertical: 10 }} value={newAnnouncementTitle} onChangeText={text => setNewAnnouncementTitle(text)} />
          <TextInput placeholder='Descrição do anúncio' style={{ borderWidth: 1, borderColor: colors.inverthard, padding: 12, marginVertical: 10 }} value={newAnnouncementDescription} onChangeText={text => setNewAnnouncementDescription(text)} />
          <Button title="Inserir" color={colors.primary} onPress={createClassAnnouncement} style={{ padding: 12 }} />
        </>)}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnunciosScreen;
