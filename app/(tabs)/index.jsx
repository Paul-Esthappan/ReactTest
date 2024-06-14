import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const DisplayData = () => {
  const [userData, setUserData] = useState([]);
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const storedData = await getData();
      if (storedData) setUserData(storedData);
    };
    fetchData();
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@crud_data");
      return jsonValue ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error("Error loading data", e);
    }
  };

  const storeData = async (data) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem("@crud_data", jsonValue);
    } catch (e) {
      console.error("Error saving data", e);
    }
  };

  const addData = async () => {
    if (first.trim() && second.trim()) {
      const newData = [
        ...userData,
        { first: first.trim(), second: second.trim() },
      ];
      setUserData(newData);
      await storeData(newData);
      setFirst("");
      setSecond("");
    }
  };

  const deleteData = async (index) => {
    const newData = userData.filter((_, i) => i !== index);
    setUserData(newData);
    await storeData(newData);
  };

  const renderItems = ({ item, index }) => (
    <View className="flex-row justify-between items-center py-2 px-4 border-b border-gray-300">
      <Text className="w-16 m-2">{`${item.first}  `}</Text>
      <Text className="w-16 m-2">{`${item.second}`}</Text>
      <Button title="Delete" onPress={() => deleteData(index)} />
    </View>
  );

  return (
    <View className="flex-1 justify-center items-center p-4 mt-7">
      <View className="mb-4">
        <Text className="text-2xl font-bold">
          Director and Movies
        </Text>
      </View>
      <View className="flex-row mb-4 space-x-4">
        <TextInput
          value={first}
          onChangeText={setFirst}
          className="bg-gray-200 p-2 rounded-md w-40"
          placeholder="Director"
        />
        <TextInput
          value={second}
          onChangeText={setSecond}
          className="bg-gray-200 p-2 rounded-md w-40"
          placeholder="Movie"
        />
        <Button title="Add" onPress={addData} />
      </View>
      <FlatList
        data={userData}
        renderItem={renderItems}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default DisplayData;
