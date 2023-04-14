import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import  { estilo } from "../utils/styles";
import { Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native-paper';



const HomeScreen = () => {
    
    const [searchValue, setSearchValue] = useState('');
        
        
return(
    <View style={estilo.container}>
        <Image
             style={estilo.imagem}
             source={require('../../assets/caixa2.png')
           }      
        />
        <Text style={estilo.titulo}>AuthBox</Text>

        <View style={estilo.barraPesquisa}>
            <TextInput
            style={estilo.pesquisa}
            placeholder="Pesquisar"
            value={searchValue}
            onChangeText={(value) => setSearchValue(value)}
            />
            <TouchableOpacity style={estilo.button} onPress={() => console.log(searchValue)}>
            <Icon name="search" size={25} color="#000" />
            </TouchableOpacity>
        </View>
  </View>       
    )
}

export default HomeScreen;