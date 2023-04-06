import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
// importa a aplicação em Firebase
import { app, auth } from "../config/firebase";
import { storeData } from "../utils/asyncUtils";

export default function UsuarioCadastro({ navigation }) {
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [RazaoSocial, setRazaoSocial] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [cnpj, setCnpj] = useState("");

  async function handleRegister() {
    // Checa se todos os campos estão preenchidos
    if (!nomeFantasia || !RazaoSocial || !logradouro || !cnpj) {
      console.log("Por favor, preencha todos os campos");
      return;
    }
    // inicializa o banco de dados
    const db = getFirestore(app);

    // addDoc é responsável pela inserção do dado em uma coleção "Tabela"
    const docRef = await addDoc(
      // Primeiro parâmetro é a coleção que é a origem dos dados
      collection(db, "Empresas"),
      // Segundo parâmetro é os dados que serão inseridos
      {
        NomeFantasia: nomeFantasia,
        RazaoSocial: RazaoSocial,
        Logradouro: logradouro,
        CNPJ: cnpj,
        UsuaruoId: auth.currentUser.uid, // Adiciona o id do usuário autor
      }
    ).then((docRef) => {
      console.log("Id da empresa: ", docRef.id);
      storeData("empresaId", { idEmpresA: docRef.id });
      navigation.navigate("Home");
    });
  }

  return (
    <View>
      <TextInput
        label="Nome Fantasia"
        value={nomeFantasia}
        onChangeText={(text) => setNomeFantasia(text)}
      />
      <TextInput
        label="Razão Social"
        value={RazaoSocial}
        onChangeText={(text) => setRazaoSocial(text)}
      />
      <TextInput
        label="Logradouro"
        value={logradouro}
        onChangeText={(text) => setLogradouro(text)}
      />
      <TextInput
        label="CNPJ"
        value={cnpj}
        onChangeText={(text) => setCnpj(text)}
      />
      <Button onPress={handleRegister}>Cadastrar</Button>
    </View>
  );
}
