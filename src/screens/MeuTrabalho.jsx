import { collection, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { ScrollView } from "react-native";
import { FlatList, Image } from "react-native";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { db } from "../config/firebase";

export default function MeuTrabalho({ route, navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [empresaId, setEmpresaId] = useState("");

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

  return (
    <ScrollView style={{ backgroundColor: "black" }} horizontal={true}>
      <View>
        <Text style={{color:"white"}}>Visualizando a empresa: {route?.params?.empresaId}</Text>
        <Text style={{color:"white"}}>Estes são os produtos pertencentes a esta empresa:</Text>

        <FlatList
          data={produtos}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "#5f1985",
                width: 150,
                alignItems: "center",
              }}
            >
              {item?.image && (
                <Image
                  source={{ uri: item.imagem }}
                  style={{
                    width: 120,
                    height: 120,
                  }}
                />
              )}
              <Text style={{color:"#fffafa", fontSize:20, }}>{item.nome}</Text>
              <Text style={{color:"#fffafa", fontSize:20, }}>{item.codigoDeBarras}</Text>
              <Text style={{color:"#fffafa", fontSize:20, }}>{item.descricao}</Text>
              <Text style={{color:"#fffafa", fontSize:20, }}>{item.quantidade}</Text>
            </View>
          )}
        ></FlatList>
      </View>
    </ScrollView>
  );
}
