import { View, Text } from "react-native";
import {  Button } from "react-native-paper";

export default function Empresa({navigation}) {

    return(
  <View style={{backgroundColor:"#000000",
  minHeight:"100%",
  minWidth:"100%",
  }}>
    <Text style={{color:"#ffff",
    marginTop: 40,
    textAlign: "center",
    fontSize: 30,
  }}>Menu Empresa</Text>

<View style={{
  display: "flex",
justifyContent: "center",
textAlign: "center",
alignItems: "center",
}}>
    <Button title="Cadastrar + Empresa" onPress={() => navigation.navigate("CadEmpresa")} mode="contained"
    style={{
    width:150,  
    height: 50,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    }}
    >Cadastrar +</Button>
    </View>


  </View>
)
}
