import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { storage } from "../config/firebase";
import { Button, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native";

export default function ImagePicker({ onImgURLChange }) {
  const [progressPorcent, setPorgessPorcent] = useState(0);

  const handleFileChange = (event) => {
    const file = event.target?.files?.[0];
    if (!file) return;

    const storageRef = ref(storage, `livros/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPorgessPorcent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          onImgURLChange(downloadURL); // call the callback with the image URL
        });
      }
    );
  };

  const handleButtonPress = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.onchange = handleFileChange;
    fileInput.click();
  };

  return (
    <View style={{alignItems:"center"}}>
         <TouchableOpacity onPress={handleButtonPress}>
        <Image
          source={require("../Imagem/caixa.png")}
          style={{ width: 90, height: 100, marginTop: 30 }}
        />
      </TouchableOpacity>
    </View>
  );
}