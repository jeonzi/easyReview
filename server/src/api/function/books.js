const { getBooks } = require("../../naverBookByTitle");
const { prisma } = require("../../generated/prisma-client");

const createBooksByNaver = async title => {
  let books = await getBooks(title);

  books = await Promise.all(
    books.map(async book => {
      try {
        return await prisma.createBook({
          title: book.title,
          image: book.image,
          author: book.author,
          publisher: book.publisher,
          pubdate: book.pubdate,
          description: book.description,
          isbn: book.isbn
        });
      } catch (error) {
        return await prisma.book({
          isbn: book.isbn
        });
      }
    })
  );
  return books;
};

module.exports = {
  Query: {
    searchBooks: async (root, args, context, info) => {
      let books = [];
      const AND = Array.from(args.title.replace(/ /g, "")).map(word => {
        return { title_contains: word };
      });
      const booksInDB = await context.prisma.books({
        where: { AND }
      });

      if (booksInDB.length > 0) {
        books = booksInDB.filter(book => {
          return book.title
            .replace(/ /g, "")
            .includes(args.title.replace(/ /g, ""));
        });
      }

      if (books.length === 0 && booksInDB.length > 0) {
        return booksInDB;
      }
      if (books.length === 0) {
        books = await createBooksByNaver(args.title);
      }
      return books;
    }
  },
  Mutation: {
    addSearchBooks: async (root, args, context, info) => {
      let books = [];
      books = await createBooksByNaver(args.title);
      return books;
    }
  }
};
