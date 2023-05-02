import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { View, Text, Image } from "react-native";
import { useState, useEffect } from "react";
import { Button, TextInput } from "react-native-paper";

export default function Perfil({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [Usuario, setUsuario] = useState([]);
  const [empresaId, setEmpresaId] = useState("");

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const user = auth.currentUser;
  if (!user) {
    throw new Error("Usuário não autenticado.");
  }
  console.log(user.uid);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "usuarios"),
      (querySnapshot) => {
        const Usuario = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();

          if (user.uid === data.UsuarioId) {
            Usuario.push({
              ...data,
              id: doc.id,
            });
          }
        });
        setUsuario(Usuario);
        console.log(Usuario);
      }
    );

    return () => unsubscribe();
  }, []);

  function handleEditEmpresa() {
    navigation.navigate("EditEmpresa", {
      empresaId: empresaId,
    });
  }

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
      <View>
        <Image
          source={require("../../assets/perfil-vazio.png")}
          style={{ width: 100, height: 100, marginTop: 20, borderRadius: 50 }}
        />
      </View>

      {Usuario.map((usuario) => (
        <View
          style={{
            display: "flex",
            alignItems: "center",
          }}
          key={usuario.id}
        >
          <Text style={{ color: "white", fontSize: 20, marginTop: 20 }}>
            {usuario.nome}
          </Text>

          <Text style={{ color: "white", fontSize: 20, marginTop: 20 }}>
            {usuario.email}
          </Text>
        </View>
      ))}
      <Text
        style={{
          color: "#fffafa",
          display: "flex",
          alignItems: "center",
          marginTop: 70,
          fontSize: 20,
        }}
      >
        Entrar em uma empresa:{" "}
      </Text>
      <TextInput
        style={{
          backgroundColor: "#fffafa",
          width: 300,
          marginTop: 10,
          height: 60,
          borderRadius: 10,
        }}
        value={empresaId}
        onChangeText={setEmpresaId}
        label="insira o código da empresa"
      ></TextInput>

      <Button
        style={{ marginTop: 15 }}
        mode="contained"
        onPress={handleEditEmpresa}
      >
        entrar
      </Button>
    </View>
  );
}
