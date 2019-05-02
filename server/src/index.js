const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");
const { getBooks } = require("./naverBookByTitle");

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

// 리졸버
const resolvers = {
  Query: {
    info: () => `This is my bookReview_API`,
    reviews: async (root, args, context, info) => {
      return await context.prisma.reviews({ orderBy: "createdAt_DESC" });
    },
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
    },
    addReview: async (root, args, context, info) => {
      review = await prisma.createReview({
        subject: args.subject,
        contents: args.contents,
        image: args.image,
        book: { connect: { id: args.book_id } }
      });
      // review = await
      console.log(review);
      return review;
    }
  },
  Review: {
    book: (parent, args, context) => {
      return context.prisma.review({ id: parent.id }).book();
    }
  },
  Book: {
    reviews: (parent, args, context) => {
      return context.prisma.book({ id: parent.id }).reviews();
    }
  }
};

// GraphQL 서버 OPEN
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: { prisma }
});

server.start(() =>
  console.log(`My GraphQL Server is Running on http://localhost:4000`)
);
