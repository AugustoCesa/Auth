import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { useState, useEffect } from "react";
import { Button } from "react-native-paper";
import { ScrollView } from "react-native";

export default function Empresas({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [Empresas, setEmpresas] = useState([]);
  

  async function handleDeleteEmpresa(id) {
    try {
      await deleteDoc(doc(db, "Empresas", id));
      console.log("Empresa excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir a empresa:", error);
    }
  }

  function confirmDeleteEmpresa(id) {
    Alert.alert(
      "Excluir empresa",
      "Tem certeza que deseja excluir esta empresa?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          onPress: () => handleDeleteEmpresa(id),
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  }

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
    <ScrollView>
      <View
        style={{
          minHeight: 900,
          backgroundColor: "black",
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
              height: 334,
              alignItems: "center",
            }}
            key={empresa.id}
          >
            <View style={{ marginLeft: 10, alignItems: "center" }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Gerenciamento", { id: empresa.id })
                }
              >
                <Image
                  source={{ uri: empresa.imagem }}
                  style={{
                    width: 160,
                    height: 150,
                    marginTop: 10,
                    borderRadius: 10,
                    marginLeft: 58,
                    marginBottom: 5,
                  }}
                />
                <View
                  style={{
                    backgroundColor: "#000000",
                    width: 290,
                    borderRadius: 10,
                    alignItems: "center",
                    marginRight:10,
                  }}
                >
                  <Text
                    style={{
                      color: "#fffafa",
                      fontSize: 16,
                      marginTop: 10,
                    }}
                  >
                    Nome Fantasia: {empresa.NomeFantasia}
                  </Text>
                  <Text
                    style={{
                      color: "#fffafa",
                      fontSize: 16,
                      marginTop: 10,
                    }}
                  >
                    CNPJ: {empresa.CNPJ}
                  </Text>

                  <Text
                    style={{
                      color: "#fffafa",
                      fontSize: 16,
                      marginTop: 6,
                    }}
                  >
                    Logradouro: {empresa.Logradouro}
                  </Text>
                  <Button
                    onPress={() => confirmDeleteEmpresa(empresa.id)}
                    mode="contained"
                    style={{marginTop: 10, marginBottom:10}}
                  >
                    Apagar
                  </Button>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <Button
          mode="contained"
          onPress={() => navigation.navigate("CadEmpresa")}
          style={{
            marginTop: 100,
            marginBottom: 100,
          }}
        >
          adicionar + empresa
        </Button>
      </View>
    </ScrollView>
  );
}
