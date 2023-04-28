import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import {  View, Text, } from "react-native";
import { Button } from "react-native-paper";

const Config = (navigation) => {
    const LogoutButton = () => {
        const navigation = useNavigation();
        const auth = getAuth();
      
        const handleLogout = async () => {
          try {
            await signOut(auth);
            navigation.navigate("Login"); // Nome da tela de login
          } catch (error) {
            console.log(error);
          }
        };
      
        return <Button style={{width:80, backgroundColor:"#5f1985", height:45, color:"#fffafa"}} title="Logout" onPress={handleLogout}>Logout</Button>;
      };

  return (
<View style={{
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    height:"100%",
    width:"100%",
    backgroundColor:"black"
}}>
    
    <Text style={{color:"#fffafa", marginBottom:20, fontSize:20}}>Sair da conta?</Text>
    <LogoutButton/>
    
    </View>
  );
};

export default Config;
