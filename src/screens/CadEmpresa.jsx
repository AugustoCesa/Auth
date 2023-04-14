import { View, Image } from "react-native";
import { Button, Paragraph, TextInput } from "react-native-paper";
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

export default function CadEmpresa({ navigation }) {
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
        UsuarioId: auth.currentUser.uid, // Adiciona o id do usuário autor
      }
    ).then((docRef) => {
      console.log("Id da empresa: ", docRef.id);
      storeData("empresaId", { idEmpresA: docRef.id });
      navigation.navigate("Home");
    });
  }

  return (
    <View
      style={{
        backgroundColor: "#5f1985",
        flex: 1,
        alignItems: "center",
      }}
    >
      <Image
        style={{
          marginTop: 100,
          marginBottom: 40,
          height: 100,
          width: 100,
        }}
        source={require("../../assets/caixa1.png")}
      />

      <View>
        <Paragraph
          style={{
            color: "#fffafa",
            fontSize: 16,
          }}
        >
          {" "}
          Nome Fantasia{" "}
        </Paragraph>
        <TextInput
          label="Nome Fantasia"
          value={nomeFantasia}
          onChangeText={(text) => setNomeFantasia(text)}
          style={{
            width: 300,
            height: 50,
          }}
        />
      </View>

      <View>
        <Paragraph
          style={{
            color: "#fffafa",
            fontSize: 16,
          }}
        >
          {" "}
          Razao Social{" "}
        </Paragraph>
        <TextInput
          label="Razão Social"
          value={RazaoSocial}
          onChangeText={(text) => setRazaoSocial(text)}
          style={{
            width: 300,
            height: 50,
          }}
        />
      </View>

      <View>
        <Paragraph
          style={{
            color: "#fffafa",
            fontSize: 16,
          }}
        >
          Logradouro{" "}
        </Paragraph>
        <TextInput
          label="Logradouro"
          value={logradouro}
          onChangeText={(text) => setLogradouro(text)}
          style={{
            width: 300,
            height: 50,
          }}
        />
      </View>

      <View>
        <Paragraph
          style={{
            color: "#fffafa",
            fontSize: 16,
          }}
        >
          {" "}
          CNPJ
        </Paragraph>
        <TextInput
          label="CNPJ"
          value={cnpj}
          onChangeText={(text) => setCnpj(text)}
          style={{
            width: 300,
            height: 50,
          }}
        />
      </View>

      <View style={{
        marginTop:15,
        backgroundColor:""
      }}>
        <Button
        mode="contained" onPress={handleRegister}>
          Cadastrar
        </Button>
      </View>
    </View>
  );
}
