import { useEffect, useState } from "react";
import { Text, View } from "react-native";
export default function RickScreen() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((responseData) => setData(responseData.results))
      .catch((error) => {
        console.log(error);
      })
      .finally(() => console.log(data));
  }, []);
  return (
    <View>
      <Text>Olá</Text>
      {data.map((item) => (
        <Text key={item.id}>{item.name}</Text>
      ))}
    </View>
  );
}