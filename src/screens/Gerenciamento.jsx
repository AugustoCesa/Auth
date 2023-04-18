import { Text, View } from "react-native";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Button } from "react-native-paper";

export default function Gerenciamento({ route, navigation }) {
  const [idEmpresa, setIdEmpresa] = useState("");

  useEffect(() => {
    console.log(route.params);
    setIdEmpresa(route.params.id);
  }, []);

  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
    tabBarOptions={{
        activeTintColor: "#fffafa",
        inactiveTintColor: "#B3B3B3",
        style: { backgroundColor: "#5f1985" },
        indicatorStyle: { backgroundColor: "#F5F5F5" },
        labelStyle: {
          fontSize: 16,
          fontWeight: "bold",
          textTransform: "capitalize",
        },
      }}
    >
      <Tab.Screen name="Estoque" component={Estoque} />
      <Tab.Screen name="Funcionarios" component={Funcionarios} />
    </Tab.Navigator>
  );
}

function Estoque() {
  return (
    <View style={{ backgroundColor: "#000000", width: "100%", height: "100%", display:"flex", alignItems:"center" }}>
      <Text
        style={{
          color: "#fffafa",
          fontSize: 20,
          textAlign: "center",
          marginTop: 15,
        }}
      >
        Estoque
      </Text>
      <Button style={{ 
        marginTop: 15,
        width: 200,
      }} mode="contained">adicionar produtos</Button>
    </View>
  );
}

function Funcionarios() {
  return (
    <View style={{ backgroundColor: "#000000", width: "100%", height: "100%" }}>
      <Text style={{ color: "#fffafa", fontSize: 16, textAlign: "center" }}>
        Funcionarios
      </Text>
    </View>
  );
}
