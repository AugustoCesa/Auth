import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { View, Image } from "react-native";
import { Button, HelperText, Paragraph, TextInput } from "react-native-paper";
import { auth, db } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function Register({ navigation }) { // fix: add {} to destructure navigation
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [error, setError] = useState("");

  async function handleRegister() {
    console.log("Registrando usuário");
    if (checkIfPasswordsMatch()) {
      console.log("As senhas coincidem");
    } else {
      console.log("As senhas não coincidem");
    }
    if (checkPasswordLength()) {
      console.log("As senhas são grandonas");
    } else {
      console.log("As senhas são muito pequenas");
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );
      console.log(userCredential, "Usuário registrado com sucesso");
      addUsuario(userCredential.user.uid); // pass the user ID to addUsuario
      navigation.navigate("Login");
    } catch (error) {
      setError(error.message);
      const errorCode = error.code;
      switch (errorCode) {
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
    }
  }

  async function addUsuario(uid) { // pass the user ID as a parameter
    try {
      const docRef = await addDoc(collection(db, "usuarios"), {
        nome: nome,
        email: email,
        senha: senha,
        UsuarioId: auth.currentUser.uid, // add the user ID to the document
      });
      console.log("Id do usuário: ", docRef.id);
      setNome("");
    } catch (error) {
      console.error("Erro ao adicionar usuário ao Firestore:", error);
    }
  }

  function checkIfPasswordsMatch() {
    return senha === confirmarSenha;
  }

  function checkPasswordLength() {
    return senha.length >= 6;
  }

  return (
    <View
    style={{
      backgroundColor: "#5f1985",
      minHeight:"100%",
      minWidth:"100%",
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
        }}>Nome</Paragraph>
        <TextInput
          mode="outlined"
          placeholder="Digite seu Nome"
          value={nome}
          onChangeText={setNome}
          style={{
            width: 300,
            height:50
          }}
        />
      </View>

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