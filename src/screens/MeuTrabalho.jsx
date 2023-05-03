import { collection, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { ScrollView } from "react-native";
import { FlatList, Image } from "react-native";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { db } from "../config/firebase";
import { Button } from "react-native-paper";
import { TouchableOpacity, TextInput } from "react-native";

export default function MeuTrabalho({ route, navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [empresaId, setEmpresaId] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (empresaId === "") return;
    const unsubscribe = onSnapshot(
      collection(db, "Produtos"),
      (querySnapshot) => {
        const produtos = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();

          if (empresaId === data.empresaId) {
            produtos.push({
              ...data,
              id: doc.id,
            });
          }
        });
        setProdutos(produtos);
        console.log("Produtos que encontrei:", produtos);
      }
    );

    return () => unsubscribe();
  }, [empresaId]);

  useEffect(() => {
    setEmpresaId(route?.params?.empresaId);
  }, [route?.params?.empresaId]);

  const filteredProducts = produtos.filter((produto) => {
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
            <View style={{ display: "flex", flexDirection: "column" }}>
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
            </View>
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
              <View style={{ marginTop: 30, backgroundColor: "black" }}>
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
