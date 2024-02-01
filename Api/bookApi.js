import axios from "axios";
const endpoint = "https://openlibrary.org";

const getBooksByAuthor = (searchTerm, limit) => {
  return new Promise((resolve, reject) => {
    try {
      let search_url = `${endpoint}/search.json?limit=${limit}&author="${searchTerm}`;
      axios
        .get(search_url)
        .then((response) => {
          if (response.data) {
            const data = response.data.docs;
            resolve(data);
          }
        })
        .catch((error) => {
          if (error.message.contains("status 500")) {
            reject({ status: 500 });
          }
        });
    } catch (error) {
      if (error.message.contains("status 500")) {
        reject({ status: 500 });
      }
    }
  });
};
const getBooksByTitle = (searchTerm, limit) => {
  return new Promise((resolve, reject) => {
    try {
      let search_url = `${endpoint}/search.json?limit=${limit}&title="${searchTerm}`;

      axios
        .get(search_url)
        .then((response) => {
          if (response.data) {
            const data = response.data.docs;
            resolve(data);
          }
        })
        .catch((error) => {
          if (error.message.contains("status 500")) {
            reject({ status: 500 });
          }
        });
    } catch (error) {
      if (error.message.contains("status 500")) {
        reject({ status: 500 });
      }
    }
  });
};

export { getBooksByAuthor, getBooksByTitle };
