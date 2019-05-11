const { prisma } = require("../../generated/prisma-client");

module.exports = {
  Query: {
    reviews: async (root, args, context, info) => {
      return await context.prisma.reviews({ orderBy: "createdAt_DESC" });
    }
  },
  Mutation: {
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
  }
};
