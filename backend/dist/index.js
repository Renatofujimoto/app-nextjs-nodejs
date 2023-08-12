import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
let books = [];
const typeDefs = `#graphql
  type Book {
    id: ID!
    title: String
    author: String
    publishedAt: Int
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
  }

  type Mutation{
    createBook(id: ID!, title: String!, author: String!, publishetAt: Int!): Book
    deleteBook(id: ID!): Boolean
    updateBook(id: ID!, title: String, author: String, publishetAt: Int!): Book
  }
`;
const resolvers = {
    Query: {
        books: () => {
            return books;
        },
        book: (_, { id }) => {
            return books.find((book) => book.id === id);
        },
    },
    Mutation: {
        createBook: (_, { id, title, author, publishetAt }) => {
            const book = { id, title, author, publishetAt };
            books.push(book);
            return book;
        },
        deleteBook: (_, { id }) => {
            const filteredBook = books.filter((book) => book.id !== id);
            books = filteredBook;
            return true;
        },
        updateBook: (_, { id, title, author, publishetAt }) => {
            const book = books.find((book) => book.id !== id);
            book.id = book.id;
            book.title = title ? title : book.title;
            book.author = author ? author : book.author;
            book.publishetAt = publishetAt ? publishetAt : book.publishetAt;
            return book;
        }
    },
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
