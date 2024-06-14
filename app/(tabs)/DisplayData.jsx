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
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledButton = styled(Button);

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
    <StyledView className="flex-row justify-between items-center py-2 px-4 border-b border-gray-300">
      <StyledText>{`${item.first} ${item.second}`}</StyledText>
      <StyledButton title="Delete" onPress={() => deleteData(index)} />
    </StyledView>
  );

  return (
    <SafeAreaView className="flex-1 justify-center items-center p-4">
      <StyledView className="mb-4">
        <StyledText className="text-2xl font-bold">
          Director and Movies
        </StyledText>
      </StyledView>
      <StyledView className="flex-row mb-4 space-x-4">
        <StyledTextInput
          value={first}
          onChangeText={setFirst}
          className="bg-gray-200 p-2 rounded-md w-40"
          placeholder="Director"
        />
        <StyledTextInput
          value={second}
          onChangeText={setSecond}
          className="bg-gray-200 p-2 rounded-md w-40"
          placeholder="Movie"
        />
        <StyledButton title="Add" onPress={addData} />
      </StyledView>
      <FlatList
        data={userData}
        renderItem={renderItems}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default DisplayData;
