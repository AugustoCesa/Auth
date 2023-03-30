import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button, HelperText, Paragraph, TextInput } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

/**
 * Componente de Login do usuário
 *
 * @param {*} param0
 * @returns
 */
export default function Login({ navigation }) {
  // Variável responsável pelo e-mail do usuário
  const [email, setEmail] = useState("");
  // Variável responsável pela senha do usuário
  const [senha, setSenha] = useState("");
  // Variável responsável por mostrar ou não a senha do usuário (em teste)
  const [passwordVisible, setPasswordVisible] = useState(true);
  // Variável responsável por mostrar ou não o erro do usuário
  const [error, setError] = useState("");

  /**
   * Função responsável por fazer o login do usuário
   */
  function handleRegister() {
    console.log("Login usuário");

    // Verifica se o e-mail e a senha são válidos no firebase
    // esta função retorna uma Promise
    // foi importada do firebase/auth
    // note que auth é o primeiro parâmetro
    signInWithEmailAndPassword(auth, email, senha)
      // caso a Promise seja resolvida, o usuário é logado
      .then((userCredential) => {
        //
        console.log(userCredential, "Usuário logado com sucesso");
        navigation.navigate("Drawer");
      })
      // caso a Promise seja rejeitada, o usuário não é logado
      .catch((error) => {
        setError(error.message); // mostra a mensagem original do Firebase
        const errorCode = error.code; // obtém o código de erro do Firebase
        switch (
          errorCode // verifica qual é o código de erro
        ) {
          case "auth/email-already-in-use":
            setError("Esse email já está em uso por outro usuário."); // mostra uma mensagem humanizada
            break;
          case "auth/invalid-email":
            setError("Esse email não é válido.");
            break;
          case "auth/weak-password":
            setError("Essa senha é muito fraca.");
            break;
          default:
            setError("Ocorreu um erro ao acessar com este e-mail e senha.");
        }
      });
  }

  return (
    <View
      style={{
        backgroundColor: "#5f1985",
        minHeight: 1200,
        maxHeight: 1800,
        minWidth: 300,
        maxWidth: 1000,
        alignItems: "center",
      }}
    >
      <Image
        style={{
          marginTop: 100,
          marginBottom: 40,
        }}
        source={require("../../assets/caixa1.png")}
      />

      <Paragraph
        style={{
          color: "#fffafa",
          fontSize: 20,
        }}
      >
        Faça o seu Login
      </Paragraph>

      <HelperText type="error"> {error} </HelperText>
      <View>
        <Paragraph
          style={{
            color: "#fffafa",
            fontSize: 16,
          }}
        >
          E-mail
        </Paragraph>
        <View>
          <TextInput
            mode="outlined"
            placeholder="Digite seu e-mail"
            value={email}
            onChangeText={setEmail}
            style={{
              width: 300,
              height:50,
            }}
          />
        </View>
      </View>
      <View>
        <Paragraph style={{ color: "#fffafa", fontSize: 16 }}>Senha</Paragraph>
        <TextInput
          mode="outlined"
          placeholder="Digite sua Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={passwordVisible}
          right={
            <TextInput.Icon
              icon={passwordVisible ? "eye" : "eye-off"}
              size={20}
              style={{ marginRight: 10 }}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
          style={{
            width: 300,
            height:50,
            marginBottom: 10,
          }}
        />
      </View>
      <View>
        <View style={{ marginTop: 20, color: "white" }}>
          <Button mode="contained" onPress={handleRegister}>
            Login
          </Button>
          <View style={{ flexDirection: "column", alignItems:"center", marginTop: 10 }}>
          <Text style={{ color: "#fffafa", fontSize: 16 }}>
            Não possui uma conta?{" "}
          </Text>
          <TouchableOpacity style={{
              flexDirection: "row",
          }}
           onPress={() => navigation.navigate("Register")}>
            <Text style={{color: "#fffafa", marginTop:5, fontSize:16}}>Cadastra-se</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
