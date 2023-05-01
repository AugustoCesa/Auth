import { collection, onSnapshot, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../config/firebase";
import { View, Text, Image, ScrollView, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { Paragraph } from "react-native-paper";

export default function HomeScreen() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");

  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Usuário não autenticado.");
  }
  console.log(user.uid);

  useEffect(() => {
    const q = query(collection(db, "Produtos"), where("usuarioId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const produtos = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        produtos.push({
          ...data,
          id: doc.id,
        });
      });
      setProdutos(produtos);
      console.log(produtos);
    });

    return () => unsubscribe();
  }, []);

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <ScrollView
      style={{
        backgroundColor: "#000000",
        display: "flex",
      }}
    >
      <View
        style={{
          backgroundColor: "#000000",
          display: "flex",
        }}
      >
        <TextInput
          placeholder="Buscar produto..."
          value={busca}
          onChangeText={(text) => setBusca(text)}
          style={{ backgroundColor: "#ffffff", margin: 30, borderRadius: 10, padding: 10 }}
        />

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {produtosFiltrados.length > 0 ? null : (
            <View style={{ backgroundColor: "#5f1985", width: 290, marginTop: 20, borderRadius: 20 }}>
              <Text
                style={{
                  color: "#fffafa",
                  fontSize: 16,
                  marginTop: 40,
                  marginBottom: 40,
                  backgroundColor: "#5f1985",
                  margin: 10,
                  borderRadius: 10,
                  textAlign: "center",
                }}
              >
                Quando você começar a cadastrar produtos eles irão aparecer aqui!
              </Text>
            </View>
          )}
          {produtosFiltrados.map((produto) => (
            <View
              style={{
                backgroundColor: "#5f1985",
                borderRadius: 20,
                width: "45%",
                marginTop: 20,
                height: 250,
                alignItems: "center",
                marginHorizontal: "2.5%",
                marginBottom: 10,
                alignItems: "center",
                textAlign: "center",
              }}
              key={produto.id}
            >
              <Image
                source={{ uri: produto.imagem }}
                style={{
                  width: 120,
                  height: 120,
                  marginTop: 15,
                  borderRadius: 10,
                  marginLeft: 35,
                  alignContent: "center",
                  marginRight: 35,
                }}
             

              />
              <View style={{backgroundColor:"black", width:160, marginTop:7, alignItems:"center", borderRadius:20}}>
              <Text style={{color:"white", fontSize:17, marginTop:12}}>{produto.nome}</Text>
              <Text style={{color:"white", fontSize:17}}>R${produto.preco}</Text>
              <Text style={{color:"white", fontSize:17, marginBottom:7}}>Quant.{produto.quantidade}</Text>
            </View></View>
          ))}
        </View>

        <Text
          style={{
            color: "#ffffff",
            fontSize: 20,
            marginTop: 80,
            marginLeft: 15,
            marginRight: 15,
            textAlign: "center",
          }}
        >
          Oi, aqui é a equipe da Auth Box
        </Text>

        <Text
          style={{
            color: "#ffffff",
            fontSize: 16,
            marginTop: 40,
            textAlign: "center",
            marginLeft: 15,
            marginRight: 15,
          }}
        >
          Este app oferece soluções em gerenciamento de estoque, atualizando
          você e sua equipe em tempo real enquanto os pedidos são feitos e as
          vendas realizadas, então esperamos que ajude!.
        </Text>

        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Image
            style={{
              width: 220,
              height: 220,
              borderRadius: 15,
              alignItems: "center",
              marginBottom: 60,
            }}
            source={require("../../assets/apertoDeMaos.jpg")}
          ></Image>
        </View>
      </View>
    </ScrollView>
  );
}
