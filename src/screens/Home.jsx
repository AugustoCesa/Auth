import { View, Text, Image, ScrollView } from "react-native";
import { Paragraph } from "react-native-paper";
export default function HomeScreen() {
  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: "#000000",
          minHeight: "100%",
          minWidth: "100%",
        }}
      >
        <Paragraph style={{ color: "#fffafa", fontSize: 20, marginTop: 40 }}>
          Introdução:
        </Paragraph>
        <Text
          style={{
            color: "#ffffff",
            fontSize: 16,
            marginTop: 30,
          }}
        >
          Oi, aqui é a equipe da Auth Box
        </Text>

        <Text
          style={{
            color: "#ffffff",
            fontSize: 16,
            marginTop: 30,
          }}
        >
          Este app oferece soluções em gerenciamento de estoque, atualizando
          você e sua equipe em tempo real enquanto os pedidos são feitos e as
          vendas realizadas.{" "}
        </Text>

        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Image
            style={{
              width: 220,
              height: 220,
              borderRadius: 15,
              alignItems: "center",
            }}
            source={require("../../assets/apertoDeMaos.jpg")}
          ></Image>
        </View>

        <Paragraph style={{ color: "#fffafa", fontSize: 20, marginTop: 40 }}>
          O que fazer:
        </Paragraph>

        <Text
          style={{
            color: "#ffffff",
            fontSize: 16,
            marginTop: 30,
          }}
        >
          Na tela de empresas você poderá Cadastrar o seu estabelecimento do
          jeito que quiser.
        </Text>

        <Text
          style={{
            color: "#ffffff",
            fontSize: 16,
            marginTop: 10,
          }}
        >
          E uma vez dentro da empresa você vai estar na tela de gerenciamento, e
          irá escolher entre cadastrar seus produtos, ver funcionários que vêem o
          estoque da empresa e o poder de editar os seus produtos assim que quiser!
        </Text>
      </View>
    </ScrollView>
  );
}
