const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { prisma } = require("../generated/prisma-client");
const { getBooks } = require("../naverBookByTitle");

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
export const resolvers = {
  Query: {
    info: () => `This is my bookReview_API`,
    loginUser: async (root, args, context) => {
      const user = await prisma.users({ where: { email: args.email } });
      console.log(user);
      console.log(user[0].password);
      if (!user) {
        alert("Not Existing User");
      }
      const isEqual = await bcrypt.compare(args.password, user[0].password);
      if (!isEqual) {
        throw new Error("Please check your password 🙏");
      }
      const token = jwt.sign(
        { userId: user[0].id, email: user[0].email },
        "supersupersecretekey",
        {
          expiresIn: "12h"
        }
      );
      return token;
    },
    reviews: async (root, args) => {
      return await prisma.reviews({ orderBy: "createdAt_DESC" });
    },
    searchBooks: async (root, args) => {
      let books = [];
      const AND = Array.from(args.title.replace(/ /g, "")).map(word => {
        return { title_contains: word };
      });
      const booksInDB = await prisma.books({
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
    createUser: async (root, args, context, info) => {
      const userExists = await context.prisma.$exists.user({
        email: args.email
      });
      if (userExists) {
        throw new Error("Already exists. Please Cheack your email address");
      }
      const hashedPassword = await bcrypt.hash(args.password, 12);
      user = await prisma.createUser({
        username: args.username,
        email: args.email,
        password: hashedPassword
      });
      return user;
    },

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
      // console.log(review);
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
