import { Image, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import styles from "../utils/styles";
import { useFocusEffect } from "@react-navigation/native";

/**
 * Componente para verificar se o usuário está logado ou não
 * ou até mesmo se já usou o app antes
 *
 * @param {*} param0
 * @returns
 */
export function SplashScreen({ navigation }) {
  useFocusEffect(() => {
    // verifica junto ao Firebase se o usuário está logado no servidor
    // esta validação é realizada pela variável auth que vem do arquivo firebase.js
    onAuthStateChanged(auth, (user) => {
      // caso ele esteja logado, o usuário é redirecionado para a tela do App
      // neste caso estamos usando uma tela já com Material Bottom Tabs, similar ao Instragram
      if (user) {
        // note que navigation é uma propriedade que vem do React Navigation
        // e foi passada como parâmetro para este componente SplashScreen
        navigation.navigate("Home");
      } else {
        navigation.navigate("Login");
      }
    });
  });

  return (
    <View style={styles.container}>
      {/* Aqui temos uma imagem simbolizando o Logotipo do App */}
      <Image
        source={{ uri: "https://picsum.photos/200" }}
        // Também é possível utilizar imagens locais, neste caso note sobre
        // as barras duplas e o uso de require para alcançar a pasta assets
        // source={require("../../assets/icon.png")}
        style={{ width: 200, height: 200, borderRadius: 999 }}
      />
      {/* Este componente é o "loading" que realiza uma roda visual para o usuário */}
      <ActivityIndicator />
      <Text>Aguarde</Text>
    </View>
  );
}
