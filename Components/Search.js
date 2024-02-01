import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import { getBooksByAuthor, getBooksByTitle } from "../Api/bookApi.js";

const Search = ({ navigation }) => {
  const handleButtonPress = () => {
    console.log("Back pressed");
    navigation.navigate("Book");
  };

  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bookList, setBookList] = useState([]);
  useEffect(() => {
    const fetchSearchData = async (searchText) => {
      try {
        if (searchText.replace(/ /g, "").length != 0) {
          const list = [];
          let id = 1;
          const author_match_data = await getBooksByAuthor(searchText, 5);
          console.log(author_match_data.length);
          if (author_match_data && author_match_data.length != 0) {
            author_match_data.map((data) => {
              list.push({
                id: id++,
                title: data.title,
                author: data.author_name[0],
              });
            });
          }

          const title_match_data = await getBooksByTitle(searchText, 5);
          console.log(title_match_data.length);
          if (title_match_data && title_match_data.length != 0) {
            title_match_data.map((data) => {
              list.push({
                id: id++,
                title: data.title,
                author: data.author_name[0],
              });
            });
          }

          setBookList(list);
        } else setBookList([]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSearchData(searchText);

    return () => {};
  }, [searchText]);
  useEffect(() => {
    setIsLoading(false);
  }, [bookList]);
  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text>{item.title}</Text>
        <Text>{item.author}</Text>
      </View>
    );
  };
  return (
    <>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setSearchText}
          value={searchText}
        />
        {!isLoading && (
          <FlatList
            data={bookList}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        )}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  buttonContainer: { flexDirection: "row" },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
export default Search;
