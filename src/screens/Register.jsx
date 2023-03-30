import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { View, Image } from "react-native";
import { Button, HelperText, Paragraph, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { auth } from "../config/firebase";

export default function Register(navigation) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [error, setError] = useState("");

  function handleRegister() {
    console.log("Registrando usuário");
    if (checkIfPasswordsMatch()) {
      console.log("As senhas coincidem");
    } else {
      console.log("As senhas não coincidem");
    }
    if (checkPasswordLenght()) {
      console.log("As senhas são grandonas");
    } else {
      console.log("As senhas são muito pequenas");
    }

    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        console.log(userCredential, "Usuário registrado com sucesso");
        navigation.navigate("Login");
      })
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
            setError("Ocorreu um erro ao registrar o usuário.");
        }
      });
  }

  function checkIfPasswordsMatch() {
    return senha === confirmarSenha;
  }

  function checkPasswordLenght() {
    return senha.length >= 6;
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
      >Faça o seu Registro</Paragraph>
      <HelperText type="error"> {error} </HelperText>
      <View>
        <Paragraph
         style={{
          color: "#fffafa",
          fontSize: 16,
        }}>E-mail</Paragraph>
        <TextInput
          mode="outlined"
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
          style={{
            width: 300,
            height:50
          }}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Paragraph
         style={{
          color: "#fffafa",
          fontSize: 16,
        }}
        >Senha</Paragraph>

        <TextInput
          mode="outlined"
          placeholder="Digite sua Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={passwordVisible}
          style={{
            width: 300,
            height:50
          }}
          right={
            <TextInput.Icon
              icon={passwordVisible ? "eye" : "eye-off"}
              size={20}
              style={{ marginRight: 10 }}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Paragraph
         style={{
          color: "#fffafa",
          fontSize: 16,
        }}
        >Confirme sua Senha</Paragraph>
        <TextInput
          mode="outlined"
          placeholder="Confirme a Senha"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry={passwordVisible}
          style={{
            width: 300,
            height:50
          }}
          right={
            <TextInput.Icon
              icon={passwordVisible ? "eye" : "eye-off"}
              size={20}
              style={{ marginRight: 10 }}
              onPress={() => setPasswordVisible(!passwordVisible)}
              
            />
          }
        />
        <HelperText type="error" visible={!checkIfPasswordsMatch}>
          Não conferem
        </HelperText>
      </View>
      <View>
        <Button mode="contained" onPress={handleRegister}>
          Registrar
        </Button>
      </View>
    </View>
  );
}