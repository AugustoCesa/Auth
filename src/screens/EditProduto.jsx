import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

export default function EditProduto({ productId })  {
  

  return (
    <View>
      <TextInput
        value={product.name}
        onChangeText={(text) => handleChange('name', text)}
      />
      <TextInput
        value={product.description}
        onChangeText={(text) => handleChange('description', text)}
      />
      <TextInput
        value={product.price}
        onChangeText={(text) => handleChange('price', text)}
      />
      <Button title="Salvar" onPress={handleSubmit} />
    </View>
  );
};

