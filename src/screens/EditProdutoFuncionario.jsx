import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export default function EditProdutoFuncionario({ route, navigation }) {
  const [quantidade, setQuantidade] = useState("");
  const [produtoId, setProdutoId] = useState("");

  useEffect(() => {
    if (route.params?.produtoId) {
      setProdutoId(route.params.produtoId);
      setQuantidade(route.params.quantidade);
    }
  }, [route.params?.produtoId]);

  const handleUpdateProduto = async () => {
    try {
      const produtoRef = doc(collection(db, "Produtos"), produtoId);
      await updateDoc(produtoRef, {
        quantidade,
      });
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>

<Text style={{color:"#fffafa", fontSize:20,}}>Editando produto</Text>

     
      <TextInput
        placeholder="Nova Quantidade"
        value={quantidade}
        onChangeText={(value) => setQuantidade(value)}
        style={styles.input}
      />
  
      <TouchableOpacity onPress={handleUpdateProduto} style={styles.button}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
  },
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#5f1985",
    borderRadius: 20,
    width: "30%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

