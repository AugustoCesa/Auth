import { Text, View } from "react-native";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

export default function Gerenciamento({ route, navigation }) {
  const [idEmpresa, setIdEmpresa] = useState("");

  const [visible, setVisible] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  useEffect(() => {
    console.log(route.params);
    setIdEmpresa(route.params.id);
  }, []);

  return (
    <View
      style={{
        backgroundColor: "#000000",
        minHeight: "100%",
        minWidth: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        style={{ marginBottom: 80 }}
        onPress={() => navigation.navigate("CadProduto", { id: idEmpresa })}
      >
        <Text style={{ color: "#fffafa", fontSize: 20 }}>
          Cadastrar produtos
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginBottom: 80 }}
        onPress={() =>
          navigation.navigate("Estoque", {
            id: produtos.id,
            empresaID: idEmpresa,
          })
        }
      >
        <Text style={{ color: "#fffafa", fontSize: 20 }}>
          Visualizar estoque
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginBottom: 80 }}
        onPress={() => navigation.navigate("Venda", { id: produtos.id })}
      >
        <Text style={{ color: "#fffafa", fontSize: 20 }}>Efetuar venda</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginBottom: 80 }}
        onPress={() => navigation.navigate("Funcionarios", { id: produtos.id })}
      >
        <Text style={{ color: "#fffafa", fontSize: 20 }}>
          Visualizar Pedidos
        </Text>
      </TouchableOpacity>
    </View>
  );
}
