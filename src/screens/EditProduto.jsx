import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

const EditProduct = ({ productId }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
  });

  useEffect(() => {
    const loadProduct = async () => {
      const db = getFirestore();
      const productRef = doc(db, 'products', productId);
      const productSnapshot = await getDoc(productRef);
      setProduct(productSnapshot.data());
    };
    loadProduct();
  }, [productId]);

  const handleChange = (field, value) => {
    setProduct({ ...product, [field]: value });
  };

  const handleSubmit = async () => {
    const db = getFirestore();
    const productRef = doc(db, 'products', productId);
    await updateDoc(productRef, product);
  };

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

export default EditProduct;