import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { Button } from "react-native-paper";

export default function Produtos({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [Produtos, setProdutos] = useState([]);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const user = auth.currentUser;
  if (!user) {
    throw new Error("Usuário não autenticado.");
  }
  console.log(user.uid);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "Produtos"),
      (querySnapshot) => {
        const Produtos = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();

          if (user.uid === data.UsuarioId) {
            Produtos.push({
              ...data,
              id: doc.id,
            });
          }
        });
        setProdutos(Produtos);
        console.log(Produtos);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "black",
        display: "flex",
        alignItems: "center",
      }}
    >
      {Produtos.map((produto) => (
        <View
          style={{
            backgroundColor: "#5f1985",
            borderRadius: 20,
            width: 320,
            marginTop: 20,
            height: 130,
            alignItems: "center",
          }}
          key={produto.id}
        >
        
            <Text
              style={{
                color: "#fffafa",
                fontSize: 20,
                marginTop: 10,
              }}
            >
              Nome: {produto.nome}
            </Text>
            <Text
              style={{
                color: "#fffafa",
                fontSize: 20,
                marginTop: 10,
              }}
            >
              CNPJ: {produto.CNPJ}
            </Text>

            <Text
              style={{
                color: "#fffafa",
                fontSize: 20,
                marginTop: 6,
                marginLeft: 8,
              }}
            >
              Quantidade: {produto.quantidade}
            </Text>
        </View>
      ))}

    </View>
  );
}
