import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 26,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#5f1985",
  },

  row: {
    flexDirection: "row",
    marginTop: 4,
    textAlign: "center",
  },

  inputEmail: {
    alignSelf: "stretch",
    backgroundColor: "black",
    marginTop: 50,
  },

  input: {
    alignSelf: "stretch",
    backgroundColor: "white",
    marginTop:20,
    marginBottom:20,
  },

  label: {
    color: "white",
    marginTop: 70,
    fontSize: 20,
    marginBottom: 100,
  },

  labelCadastro: {
    color: "black",
    fontSize: 20,
    marginBottom: 150,
  },

  link: {
    fontWeight: "bold",
    color: "black",
    marginTop: 70,
    marginBottom: 100,
    fontSize: 20,
  },

  

  botao: {
    marginTop: 20,
    backgroundColor: "black",
    width: 300,
  },

  botaoCadastro: {
    marginTop: 20,
    backgroundColor: "black",
    width: 300,
  },


  titulo: {
    color: "white",
    fontSize: 40,
  },
  imagem: {
    marginTop:10,
    width: 100,
    height: 100,
    
  },
  tela: {
    color: "white",
    fontSize: 30,
  },

  tituloR:{
    marginBottom:50,
    color: "white",
    fontSize: 40,
  },

  imagemR: {
    marginTop:180,
    width: 100,
    height: 100,
    
  },
});