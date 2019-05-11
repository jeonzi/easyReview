const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { prisma } = require("../../generated/prisma-client");

module.exports = {
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
    }
  },
  Query: {
    loginUser: async (root, args, context) => {
      const user = await context.prisma.users({ where: { email: args.email } });
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
    }
  }
};
