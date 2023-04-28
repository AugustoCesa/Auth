import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { storage } from "../config/firebase";
import { View, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerFirebase ({ onImgURLChange }) {
  const [progressPorcent, setPorgessPorcent] = useState(0);

  const handleFileChange = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const fileExtension = blob.type.split('/')[1];
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExtension}`;
    const storageRef = ref(storage, `Imagens/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, blob);

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

  const handleButtonPress = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access the camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      handleFileChange(result.uri);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handleButtonPress}>
        <Image
          source={require("../Imagem/camera.png")}
          style={{ width: 92, height: 91, borderRadius: 10}}
        />
      </TouchableOpacity>
    </View>
  );
}