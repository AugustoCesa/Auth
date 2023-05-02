import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Button, HelperText, Paragraph, TextInput } from "react-native-paper";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useEffect } from "react";

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

  useEffect(() => {
    checkIfUserAlreadyLogged();
  }, []);

  function checkIfUserAlreadyLogged() {
    // Verifica se o usuário já está logado
    // esta função retorna uma Promise
    // foi importada do firebase/auth
    // note que auth é o primeiro parâmetro
    onAuthStateChanged(auth, (user) => {
      // caso a Promise seja resolvida, o usuário é logado
      if (user) {
        console.log("Usuário já está logado");
        navigation.navigate("Drawer");
      } else {
        console.log("Usuário não está logado");
      }
    });
  }

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
        backgroundColor: "#000",
        minHeight: "100%",
        minWidth: "100%",
        alignItems: "center",
      }}
    >
      <Image
        style={{
          marginTop: 100,         
          height: 130,
          width: 130,
          shadowColor: "#000",
          shadowOffset: { width: 4, height: 7 },
          shadowOpacity: 0.3,
          shadowRadius: 3.84,
          elevation: 30,
        }}
        source={require("../../assets/caixa21.png")}
      />

    <Text
          style={{
            color: "#fffafa",
            fontSize: 30,
            fontWeight: "bold",
            textAlign: 'center',
            marginBottom: 30
          }}
          >AuthBox
          </Text>
      <View
        style={{
          flex: 2,
          backgroundColor: "#5f1985",
          width: 450,
          borderTopLeftRadius: 49,
          borderTopRightRadius: 49,
        }}
      >
        <Paragraph
          style={{
            color: "#fffafa",
            fontSize: 30,
            fontWeigh: "bold",
            textAlign: 'center',
            marginTop: 30
          }}
        > Bem Vindo(a)
        </Paragraph>

        <HelperText type="error"> {error} </HelperText>
        <View
          style={{
            alignSelf: "center",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}
        >
          <Paragraph
            style={{
              color: "#fffafa",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            E-mail
          </Paragraph>
          <View>
            <TextInput
              testID="Email"
              mode="outlined"
              placeholder="Digite seu e-mail"
              value={email}
              onChangeText={setEmail}
              style={{
                width: 300,
                height: 50,
                shadowColor: "#000",
                shadowOffset: { width: 4, height: 7 },
                shadowOpacity: 0.3,
                shadowRadius: 3.84,
                elevation: 100,
              }}
            />
          </View>
        </View>
        <View
          style={{
            alignSelf: "center",
          }}
        >
          <Paragraph
            style={{ color: "#fffafa", fontSize: 16, fontWeight: "bold" }}
          >
            Senha
          </Paragraph>
          <TextInput
            testID="Senha"
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
              height: 50,
              marginBottom: 10,
              shadowColor: "#000",
              shadowOffset: { width: 4, height: 7 },
              shadowOpacity: 0.3,
              shadowRadius: 3.84,
              elevation: 30,
            }}
          />
        </View>
        <View>
          <View style={{ marginTop: 20, color: "white", alignSelf: "center" }}>
            <Button
              mode="contained"
              onPress={handleRegister}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 4, height: 7 },
                shadowOpacity: 0.35,
                shadowRadius: 3.84,
                elevation: 30,
              }}
            >
              Login
            </Button>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text style={{ color: "#fffafa", fontSize: 16 }}>
                Não possui uma conta?{" "}
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                }}
                onPress={() => navigation.navigate("Register")}
              >
                <Text
                  style={{
                    color: "#fff",
                    marginTop: 5,
                    fontSize: 16,                   
                    borderWidth: 2, 
                    borderColor: 'Black',
                   borderRadius: 10,
                   padding: 6,

                  }}
                >
                  Cadastre-se
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
