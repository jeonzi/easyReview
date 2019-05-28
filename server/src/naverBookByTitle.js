const Axios = require("axios");

module.exports = {
  getBooks: async bookName => {
    const NAVER_CLIENT_ID = "dwiCyszCKPgP65iAW8Xq";
    const NAVER_CLIENT_SECRET = "k0shPw_sS3";
    const SEARCH_URL = "https://openapi.naver.com/v1/search/book_adv.json?";
    const BY_TITEL = "d_titl=";
    const DISPLAY = "display=";
    const DISPLAY_NUMBER = "100";
    const START = "start=";
    let i = 1;
    const MAX_START_VALUE = 1000;

    let condition = true;
    let finalBooks = [];
    while (condition) {
      const url = `${SEARCH_URL}${BY_TITEL}${encodeURIComponent(
        bookName
      )}&${DISPLAY}${DISPLAY_NUMBER}&${START}${i}`;
      console.log(url);

      const result = await Axios.get(url, {
        headers: {
          "X-Naver-Client-Id": NAVER_CLIENT_ID,
          "X-Naver-Client-Secret": NAVER_CLIENT_SECRET
        }
      });
      //   console.log(result.data);

      const books = result.data.items.filter(book => {
        return book.isbn;
      });

      finalBooks = [...finalBooks, ...books];
      i = i + parseInt(DISPLAY_NUMBER);
      if (result.data.total < i || i > MAX_START_VALUE) {
        condition = false;
      }
    }

    finalBooks = finalBooks.sort((a, b) => {
      return a.isbn < b.isbn ? -1 : a.isbn > b.isbn ? 1 : 0;
    });
    // isbn 중복값 제거
    finalBooks = finalBooks.reduce((accumulator, current) => {
      const length = accumulator.length;
      if (length === 0 || accumulator[length - 1].isbn !== current.isbn) {
        accumulator.push(current);
      }
      return accumulator;
    }, []);

    finalBooks = finalBooks.map(book => {
      return {
        title: book.title.replace(/<b>|<\/b>|\n/g, ""),
        isbn: book.isbn,
        image: book.image,
        author: book.author,
        publisher: book.publisher.replace(/<b>|<\/b>|\n/g, ""),
        pubdate: [
          book.pubdate.slice(0, 4),
          book.pubdate.slice(4, 6) === "" ||
          parseInt(book.pubdate.slice(4, 6)) < 1 ||
          parseInt(book.pubdate.slice(4, 6)) > 12
            ? "01"
            : book.pubdate.slice(4, 6),
          book.pubdate.slice(6, 8) === "" ||
          parseInt(book.pubdate.slice(6, 8)) < 1 ||
          parseInt(book.pubdate.slice(6, 8)) > 31
            ? "01"
            : book.pubdate.slice(6, 8)
        ].join("-"),
        description: book.description.replace(/<b>|<\/b>|\n/g, "")
      };
    });

    //   console.log(books);
    return finalBooks;
  }
};
