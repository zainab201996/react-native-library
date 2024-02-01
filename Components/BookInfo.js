import Header from "./Header";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import Toast from "react-native-toast-message";

const endpoint = "https://openlibrary.org";

export default function BookInfo({ navigation }) {
  const [bookInfo, setBookInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [imageURL, setImageURL] = useState(
    "https://covers.openlibrary.org/b/olid/OL7440033M-S.jpg"
  );
  useEffect(() => {
    const loadData = async () => {
      try {
        let search_url = endpoint + "/search.json?limit=1&q=" + "Harry";
        axios
          .get(search_url)
          .then(async (res) => {
            if (res.data) {
              const data = res.data.docs[0];
              // setImageURL(image_endpoint + data.key.split("/")[2] + "-L.jpg");
              let author_url =
                endpoint + "/authors/" + data.author_key + ".json";
              let book_url = endpoint + data.key + ".json";
              const author_res = await axios.get(author_url);
              const author_data = author_res.data;
              const book_res = await axios.get(book_url);
              const book_data = book_res.data;
              setBookInfo({
                title: data.title,
                author_name: data.author_name[0],
                author_key: data.author_key[0],
                publication_date: data.first_publish_year,
                key: data.key,
                author_info: author_data.bio.split("\n")[0],
                overview: book_data.description.value.split("\n")[0],
                ratings: data.ratings_average,
              });
            }
          })
          .catch((error) => {
            Toast.show({
              type: "error", // 'success', 'error', 'info', 'warning'
              position: "bottom",
              text1: "Error",
              text2: error.message,
              visibilityTime: 4000, // Duration of the toast in milliseconds
            });
          });
      } catch (error) {
        Toast.show({
          type: "error", // 'success', 'error', 'info', 'warning'
          position: "bottom",
          text1: "Error",
          text2: error.message,
          visibilityTime: 4000, // Duration of the toast in milliseconds
        });
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <>
      <Header navigation={navigation} />
      {!isLoading && (
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.bookCover}>
              <Image style={styles.cover} source={{ uri: imageURL }} />
              <Text style={styles.boldText}>{bookInfo.title}</Text>
              <Text style={styles.centeredText}>{bookInfo.author_name}</Text>
              <Text style={styles.centeredText}>
                Published in {bookInfo.publication_date}
              </Text>
              <View style={styles.rowContainer}>
                {[1, 2, 3, 4, 5].map((index) => (
                  <TouchableOpacity key={index}>
                    <FontAwesome
                      name={index <= bookInfo.ratings ? "star" : "star-o"}
                      size={20}
                      color={index <= bookInfo.ratings ? "gold" : "gray"}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <Text
              style={[
                styles.leftAlignedText,
                styles.boldText,
                styles.contentHeading,
              ]}
            >
              About the author
            </Text>
            <Text style={styles.contentBody}>{bookInfo.author_info}</Text>
            <Text
              style={[
                styles.leftAlignedText,
                styles.boldText,
                styles.contentHeading,
              ]}
            >
              Overview
            </Text>
            <Text style={styles.contentBody}>{bookInfo.overview}</Text>
          </ScrollView>
          <TouchableOpacity style={styles.buttonStyle}>
            <Text style={[styles.buttonText, styles.boldText]}>BOOK READ</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  bookCover: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  boldText: {
    fontWeight: "bold",
  },
  contentHeading: {
    fontSize: 16,
    textAlign: "left",
  },
  contentBody: {
    fontSize: 11,
    textAlign: "left",
  },
  centeredText: {
    textAlign: "center",
  },

  cover: {
    width: 200,
    height: 250,
    borderRadius: 15,
  },
  buttonStyle: {
    borderRadius: 5,
    padding: 1,
    backgroundColor: "#7FFFD4",
    justifyContent: "center",
    height: "5%",
    width: "100%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },

  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
});
