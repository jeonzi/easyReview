module.exports = {
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
