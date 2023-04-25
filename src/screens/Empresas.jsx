import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { Button } from "react-native-paper";

export default function Empresas({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [Empresas, setEmpresas] = useState([]);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const user = auth.currentUser;
  if (!user) {
    throw new Error("Usuário não autenticado.");
  }
  console.log(user.uid);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "Empresas"),
      (querySnapshot) => {
        const Empresas = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();

          if (user.uid === data.UsuarioId) {
            Empresas.push({
              ...data,
              id: doc.id,
            });
          }
        });
        setEmpresas(Empresas);
        console.log(Empresas);
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
      {Empresas.map((empresa) => (
        <View
          style={{
            backgroundColor: "#5f1985",
            borderRadius: 20,
            width: 320,
            marginTop: 20,
            height: 130,
            alignItems: "center",
          }}
          key={empresa.id}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Gerenciamento", { id: empresa.id })
            }
          >
            <Text
              style={{
                color: "#fffafa",
                fontSize: 20,
                marginTop: 10,
              }}
            >
              Nome Fantasia: {empresa.NomeFantasia}
            </Text>
            <Text
              style={{
                color: "#fffafa",
                fontSize: 20,
                marginTop: 10,
              }}
            >
              CNPJ: {empresa.CNPJ}
            </Text>

            <Text
              style={{
                color: "#fffafa",
                fontSize: 20,
                marginTop: 6,
              }}
            >
              Logradouro: {empresa.Logradouro}
            </Text>
          </TouchableOpacity>
        </View>
      ))}

      <Button
        mode="contained"
        onPress={() => navigation.navigate("CadEmpresa")}
        style={{
          marginTop: 20,
        }}
      >
        adicionar + empresa
      </Button>
    </View>
  );
}
