import React, { useState } from 'react';
import { View, Image, Text, Button, StyleSheet, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { launchImageLibrary } from 'react-native-image-picker';

// Estilos
const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imagem: {
    width: 580,
    height: 480,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

// Telas para Swipes (3 módulos, cada um com 3 telas)
const SwipeScreen1 = () => (
  <View style={estilos.container}>
    <Text style={estilos.texto}>Avião a380</Text>
    <Image source={require('./imagens/a380.png')} style={estilos.imagem} />
          </View>
);
const SwipeScreen2 = () => (
  <View style={estilos.container}>
    <Text style={estilos.texto}>A320</Text>
    <Image source={require('./imagens/a320.png')} style={estilos.imagem} />
  </View>
);
const SwipeScreen3 = () => (
  <View style={estilos.container}>
    <Text style={estilos.texto}>E190</Text>
    <Image source={require('./imagens/E190.png')} style={estilos.imagem} />
  </View>
);

// Configuração do Top Tab Navigator para cada Módulo
const Tab = createMaterialTopTabNavigator();
const ModuloTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Tela 1" component={SwipeScreen1} />
    <Tab.Screen name="Tela 2" component={SwipeScreen2} />
    <Tab.Screen name="Tela 3" component={SwipeScreen3} />
  </Tab.Navigator>
);

// Configuração das Stacks (HomeStack)
const Pilha = createStackNavigator();
const HomeStack = () => (
  <Pilha.Navigator>
    <Pilha.Screen name="Módulo 1" component={ModuloTabs} />
    <Pilha.Screen name="Módulo 2" component={ModuloTabs} />
    <Pilha.Screen name="Módulo 3" component={ModuloTabs} />
    <Pilha.Screen name="Perfil" component={PerfilScreen} />
    <Pilha.Screen name="EditarPerfil" component={EditarPerfilScreen} />
  </Pilha.Navigator>
);

// Tela simples: Perfil
const PerfilScreen = ({ navigation, route }) => {
  const [nome, setNome] = useState(route.params?.nome || 'Usuário Teste');
  const [email, setEmail] = useState(route.params?.email || 'teste@email.com');
  const [imagem, setImagem] = useState(require('./imagens/nice.jpeg'));

  const selecionarImagem = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImagem({ uri: response.assets[0].uri });
      }
    });
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.texto}> Perfil do Usuário</Text>
      <Image source={imagem} style={estilos.imagem} />
      <Text>Nome: {nome}</Text>
      <Text>Email: {email}</Text>
      <Button title="Editar Perfil" onPress={() => navigation.navigate('EditarPerfil', { nome, email, imagem })} />
      <Button title="Alterar Imagem" onPress={selecionarImagem} />
    </View>
  );
};

// Tela de Edição de Perfil
const EditarPerfilScreen = ({ navigation, route }) => {
  const [nome, setNome] = useState(route.params.nome);
  const [email, setEmail] = useState(route.params.email);
  const [imagem, setImagem] = useState(route.params.imagem);

  const salvarPerfil = () => {
    navigation.navigate('Perfil', { nome, email, imagem });
  };

  const selecionarImagem = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImagem({ uri: response.assets[0].uri });
      }
    });
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.texto}>Editar Perfil</Text>
      <Image source={imagem} style={estilos.imagem} />
      <TextInput style={estilos.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={estilos.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <Button title="Salvar" onPress={salvarPerfil} />
      <Button title="Alterar Imagem" onPress={selecionarImagem} />
    </View>
  );
};

// Tela simples: Configurações
const ConfiguracoesScreen = () => {
  const [tema, setTema] = useState('Claro');
  const [notificacoes, setNotificacoes] = useState('Ligado');
  const [idioma, setIdioma] = useState('Português');

  const toggleTema = () => {
    setTema(tema === 'Claro' ? 'Escuro' : 'Claro');
  };

  const toggleNotificacoes = () => {
    setNotificacoes(notificacoes === 'Ligado' ? 'Desligado' : 'Ligado');
  };

  const toggleIdioma = () => {
    setIdioma(idioma === 'Português' ? 'Inglês' : 'Português');
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.texto}>⚙️ Configurações</Text>
      <Button title={`Tema: ${tema}`} onPress={toggleTema} />
      <Button title={`Notificações: ${notificacoes}`} onPress={toggleNotificacoes} />
      <Button title={`Idioma: ${idioma}`} onPress={toggleIdioma} />
    </View>
  );
};

// Drawer Navigation
const Gaveta = createDrawerNavigator();
const NavegacaoGaveta = () => (
  <Gaveta.Navigator initialRouteName=" Home">
    <Gaveta.Screen name=" Home" component={HomeStack} />
    <Gaveta.Screen name=" Perfil" component={PerfilScreen} />
    <Gaveta.Screen name="⚙️ Configurações" component={ConfiguracoesScreen} />
  </Gaveta.Navigator>
);

// Componente Principal
export default function App() {
  return (
    <NavigationContainer>
      <NavegacaoGaveta />
    </NavigationContainer>
  );
}