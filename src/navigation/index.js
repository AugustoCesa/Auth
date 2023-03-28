import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Config } from "../screens/Config";
import { Perfil } from "../screens/Perfil";
import HomeScreen from "../screens/Home";
import Register from "../screens/Register";
import { Login } from "../screens/Login";






const Stack = createNativeStackNavigator();
export const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Drawer">

        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            title: "Login",
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: false,
            title: "Registro",
          }}
        />
      
        <Stack.Screen name={"Drawer"} component={MyDrawer} />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator useLegacyImplementation  initialRouteName="Home">
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Perfil" component={Perfil} />
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Config" component={Config} />
    </Drawer.Navigator>
  );
}