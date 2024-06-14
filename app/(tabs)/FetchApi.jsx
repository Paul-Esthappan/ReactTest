import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  ActivityIndicator,
  Image,
} from "react-native";

const FetchApi = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        flex: 1,
        margin: 8,
        backgroundColor: "#ffffff",
        borderRadius: 8,
        padding: 12,
      }}
    >
      <Image
        source={{ uri: item.thumbnail }}
        style={{ width: "100%", height: 150, borderRadius: 8 }}
      />
      <Text style={{ marginTop: 8, fontSize: 16, fontWeight: "bold" }}>
        {item.title}
      </Text>
      <Text style={{ marginTop: 4 }}>{item.description}</Text>
      <Text style={{ marginTop: 4, color: "#888888" }}>
        Price: ${item.price}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" color="#0a7ea4" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
              // numColumns={2}
        contentContainerStyle={{ padding: 8 }}
      />
    </SafeAreaView>
  );
};

export default FetchApi;
