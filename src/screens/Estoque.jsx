import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { useState, useEffect } from "react";
import { Button } from "react-native-paper";
import { log } from "react-native-reanimated";

export default function Produtos({ route, navigation }) {
  const [visible, setVisible] = useState(false);
  const [Produtos, setProdutos] = useState([]);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [Imagem, setImagem] = useState(null);
  const [empresaID, setEmpresaID] = useState("");

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
    // const unsubscribe = onSnapshot(
    //   collection(db, "Produtos"),
    //   (querySnapshot) => {
    //     const Produtos = [];
    //     querySnapshot.forEach((doc) => {
    //       const data = doc.data();

    //       if ((user.uid === data.usuarioId)(data.empresaId)) {
    //         Produtos.push({
    //           ...data,
    //           id: doc.id,
    //         });
    //       } else {
    //         console.log("Nao é igual mas achei:", { ...data, id: doc.id });
    //       }
    //     });
    //     setProdutos(Produtos);
    //     console.log("Achei estes produtos:", Produtos);
    //   }
    // );
    console.log("empresaID mudou: ", empresaID);
    queryAllEmpresasRelatedToUID();
    // return () => unsubscribe();
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
        {Produtos.map((produto) => (
          <View
            style={{
              backgroundColor: "#5f1985",
              borderRadius: 15,
              marginTop: 60,
              alignItems: "flex-start",
              minWidth: 190,
              display: "flex",
              minHeight: 260,
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
              }}
            />
            <View style={{marginLeft:10}}>
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
                }}
              >
                Preço: {produto.preco}
              </Text>
              
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
