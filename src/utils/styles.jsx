import { StyleSheet } from "react-native";


export const estilo = StyleSheet.create({
    container:{
        backgroundColor: "black",
        width: "100%",
        height:"100%",
        alignItems:"center",
    },
    imagem:{
        width: 100,
        height: 100,
    },
    titulo:{
        color:"white",
        fontSize: 25,
    },
    barraPesquisa:{
        flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 10,
    marginTop: 10,
    },
    pesquisa:{
        flex: 1,
        paddingVertical: 0,
        paddingHorizontal: 10,
        fontSize: 18,
    },
    button: {
        padding: 10,
    },
  
});