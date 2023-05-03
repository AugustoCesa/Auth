import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";

export default function Estoque({ route, navigation }) {
  const [visible, setVisible] = useState(false);
  const [Produtos, setProdutos] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [Imagem, setImagem] = useState(null);
  const [empresaID, setEmpresaID] = useState("");
  const [selectedProduto, setSelectedProduto] = useState();

  const user = auth.currentUser;
  if (!user) {
    throw new Error("Usuário não autenticado.");
  }
  console.log(user.uid);

  useEffect(() => {
    if (route.params?.empresaID) {
      setEmpresaID(route.params?.empresaID);
    }
  }, [route.params?.empresaID]);

  useEffect(() => {
    console.log("empresaID mudou: ", empresaID);
    queryAllEmpresasRelatedToUID();
  }, [empresaID]);

  async function queryAllEmpresasRelatedToUID() {
    const q = query(
      collection(db, "Produtos"),
      where("empresaId", "==", empresaID)
    );

    const querySnapshot = await getDocs(q)
      .then((querySnapshot) => {
        const Produtos = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          Produtos.push({
            ...data,
            id: doc.id,
          });
        });
        setProdutos(Produtos);
        console.log("Achei estes produtos:", Produtos);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  async function handleDeleteProduto(produtoId) {
    try {
      console.log(produtoId);
      await deleteDoc(doc(db, "Produtos", produtoId));
      console.log("Produto deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar produto: ", error);
    }
  }

  const filteredProducts = Produtos.filter((produto) => {
    return produto.nome.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: "black",
          display: "flex",
          alignItems: "center",
          minHeight: 800,
        }}
      >
        <View style={{ marginTop: 20 }}>
          <TextInput
            style={{
              height: 40,
              width: 300,
              borderColor: "gray",
              borderWidth: 1,
              paddingLeft: 10,
              borderRadius: 5,
              backgroundColor: "#fffafa",
            }}
            onChangeText={(text) => setSearchValue(text)}
            value={searchValue}
            placeholder="Buscar produto"
          />
        </View>

        {filteredProducts.map((produto) => (
          <View
            style={{
              backgroundColor: "#5f1985",
              borderRadius: 15,
              marginTop: 60,
              minWidth: 320,
              display: "flex",
              minHeight: 260,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
            key={produto.id}
          >
            <View style={{display:"flex", flexDirection:"column", }}>
            <Image
              source={{ uri: produto.imagem }}
              style={{
                width: 120,
                height: 120,
                marginTop: 60,
                borderRadius: 10,
                marginLeft: 6,
              }}
            />

            <TouchableOpacity style={{backgroundColor:"black", borderRadius:10, marginTop:10}}
              onPress={() =>
                navigation.navigate("Venda", { id: produto.id })
              }
            >
            <Button>Vender</Button>
            </TouchableOpacity></View>
            <View
              style={{
                marginLeft: 5,
                marginTop: 20,
                backgroundColor: "black",
                width: 180,
                borderRadius: 10,
                alignItems: "center",
                height: 220,
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  color: "#fffafa",
                  fontSize: 16,
                  marginTop: 10,
                }}
              >
                Nome: {produto.nome}
              </Text>
              <Text
                style={{
                  color: "#fffafa",
                  fontSize: 16,
                  marginTop: 6,
                }}
              >
                Quantidade: {produto.quantidade}
              </Text>

              <Text
                style={{
                  color: "#fffafa",
                  fontSize: 16,
                  marginTop: 6,
                  marginBottom: 6,
                }}
              >
                Preço: R${produto.preco}
              </Text>
              <View style={{ marginTop: 5, backgroundColor: "black" }}>
                <TouchableOpacity>
                  <Button
                    style={{ backgroundColor: "#5f1985" }}
                    onPress={() =>
                      navigation.navigate("EditProduto", {
                        produtoId: produto.id,
                      })
                    }
                    mode="contained"
                  >
                    Editar
                  </Button>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Button
                    style={{ backgroundColor: "#5f1985", marginTop: 10 }}
                    onPress={() =>
                      Alert.alert(
                        "Excluir Produto",
                        "Tem certeza que deseja excluir este produto?",
                        [
                          {
                            text: "Cancelar",
                            onPress: () => console.log("Cancelado"),
                            style: "cancel",
                          },
                          {
                            text: "Excluir",
                            onPress: () =>
                              handleDeleteProduto(produto.id).then(() =>
                                Alert.alert("Produto deletado com sucesso!")
                              ),
                          },
                        ]
                      )
                    }
                    mode="contained"
                  >
                    Excluir
                  </Button>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
        <Text
          style={{
            color: "white",
            alignItems: "baseline",
            marginTop: 80,
            display: "flex",
            fontSize: 16,
          }}
        >
          Make by: AuthBox
        </Text>
      </View>
    </ScrollView>
  );
}
