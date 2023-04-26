import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { storage } from "../config/firebase/firebase";
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
    <View>
         <TouchableOpacity onPress={handleButtonPress}>
        <Image
          source={require("../Images/botaoModal.png")}
          style={{ width: "80px", height: "100px", marginTop: "30px" }}
        />
      </TouchableOpacity>
    </View>
  );
}