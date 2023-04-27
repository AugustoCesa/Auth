import { View, Image, ImageBackground, TouchableOpacity  } from "react-native";
import { Button, Paragraph, TextInput } from "react-native-paper";
import { useState, useEffect } from "react";
import * as React from "react";
import {
  addDoc,
  collection,
  docRef,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
// importa a aplicação em Firebase
import { app, auth } from "../config/firebase";
import { storeData } from "../utils/asyncUtils";
import ImagePicker from "./ImagePicker";

export default function CadProduto({ route,navigation }) {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [codigoDeBarras, setCodigoDeBarras] = useState("");
  const [imagem, setImagem] = useState("");
  const [idEmpresa, setIdEmpresa] = React.useState(null);

  async function handleRegister() {
    // Checa se todos os campos estão preenchidos
    if (!nome || !preco || !descricao || !quantidade || !idEmpresa) {
      console.log("Por favor, preencha todos os campos");
      return;
    }
    // inicializa o banco de dados
    const db = getFirestore(app);

    // addDoc é responsável pela inserção do dado em uma coleção "Tabela"
    await addDoc(
      // Primeiro parâmetro é a coleção que é a origem dos dados
      collection(db, "Produtos"),
      // Segundo parâmetro é os dados que serão inseridos
      {
        nome,
        preco,
        codigoDeBarras,
        descricao,
        quantidade,
        imagem: imagem,
        empresaId: idEmpresa,
        usuarioId: auth.currentUser.uid, // Adiciona o id do usuário autor
      }
    ).then((docRef) => {
      console.log("Id do produto: ", docRef.id);
      storeData("produtoId", { idProduto: docRef.id });
      navigation.navigate("Home");
    });
  }

  useEffect(() => {
    async function fetchEmpresa() {
        console.log(route.params);
        setIdEmpresa(route.params.id);
    }
    fetchEmpresa();
  }, []);

const handleImgURLChange = (url) => {
    setImagem(url);
  };

  return (
    <View
      style={{
        backgroundColor: "#5f1985",
        flex: 1,
        alignItems: "center",
      }}
    >
  
 <View style={{ alignItems: "center" }}>
            <View style={{marginTop:30}}>
              {imagem ? (
                <TouchableOpacity onPress={setImagem}>
                  <ImageBackground
                    style={{ width: 130, height: 180 }}
                    source={{ uri: imagem }}
                  >
                    <ImagePicker onImgURLChange={handleImgURLChange}></ImagePicker>
                  </ImageBackground>
                </TouchableOpacity>
              ) : (
                <ImageBackground
                  source={require("../Imagem/camera.jpg")}
                  style={{ width: 90, height: 100 }}
                >
                  <ImagePicker onImgURLChange={handleImgURLChange}></ImagePicker>
                </ImageBackground>
              )}
            </View>
          </View>



  
      <View>
        <Paragraph
          style={{
            color: "#fffafa",
            fontSize: 20,
          }}
        >
          {" "}
          Nome{" "}
        </Paragraph>
        <TextInput
          label="Nome"
          value={nome}
          onChangeText={(text) => setNome(text)}
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
            fontSize: 20,
          }}
        >
          {" "}
          Preço{" "}
        </Paragraph>
        <TextInput
          label="Preço"
          value={preco}
          onChangeText={(text) => setPreco(text)}
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
            fontSize: 20,
          }}
        >
          {" "}
          Quantidade{" "}
        </Paragraph>
        <TextInput
          label="Quantidade"
          value={quantidade}
          onChangeText={(text) => setQuantidade(text)}
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
            fontSize: 20,
          }}
        >
          {" "}
          Código de barras{" "}
        </Paragraph>
        <TextInput
          label="Código de barras"
          value={codigoDeBarras}
          onChangeText={(text) => setCodigoDeBarras(text)}
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
            fontSize: 20,
          }}
        >
          Descrição{" "}
        </Paragraph>
        <TextInput
          label="Descrição"
          value={descricao}
          onChangeText={(text) => setDescricao(text)}
          style={{
            width: 300,
            height: 50,
          }}
        />
      </View>
  
      <View style={{ marginTop: 15 }}>
        <Button mode="contained" onPress={handleRegister}>
          Cadastrar
        </Button>
      </View>
    </View>
  )};