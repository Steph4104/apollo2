const { ApolloServer, gql } = require('apollo-server');

const books = [
  { id: 1, title: 'The Trials of Brother Jero', rating: 8, authorId: 1 },
  { id: 2, title: 'Half of a Yellow Sun', rating: 9, authorId: 3 },
  { id: 3, title: 'Americanah', rating: 9, authorId: 3 },
  { id: 4, title: 'King Baabu', rating: 9, authorId: 1 },
  { id: 5, title: 'Children of Blood and Bone', rating: 8, authorId: 2 },
];
//const Recettes = require( './data.js');
const Recettes= [
  // {
  //       id: 7,
  //       title: "Miame22",
  //       rating: "5",
  //       link: "www.google.com",
  //       ingredients: "pomme, patate, carotte",
  //       etapes: "melanger; cuire; manger;",
  //       tempsCuisson: "55min",
  //       image: "https://via.placeholder.com/150",
  //       tags: "lunch, mijoteuse, bbq",
  //       mijoteuse: "True"
  // }
]

const authors = [
  { id: 1, firstName: 'Wole', lastName: 'Soyinka' },
  { id: 2, firstName: 'Tomi', lastName: 'Adeyemi' },
  { id: 3, firstName: 'Chimamanda', lastName: 'Adichie' },
];

const typeDefs = gql`
  type Author {
    id: Int!
    firstName: String!
    lastName: String!
    books: [Book]! # the list of books by this author
  }
  type Book {
    id: Int!
    title: String!
    rating: String!
    author: Author!
  }

  type Recette {
    id: Int!
    title: String!
    rating: String
    link: String
    ingredients: String!
    etapes: String!
    tempsCuisson: String
    image: String
    tags: String
    mijoteuse: String
  }

  # the schema allows the following query
  type Query {
    books: [Book!]!
    recettes: [Recette!]!
    recette(id: Int!): Recette!
    book(id: Int!): Book!
    author(id: Int!): Author!
  }
  # this schema allows the following mutation
  type Mutation {
    addBook(title: String!, rating: String!, authorId: String!): Book!
    addRecette(title: String!, rating: String, link: String, ingredients: String!, etapes: String!, tempsCuisson: String, image: String, tags: String, mijoteuse: String): Recette!
     }
`;


let bookId = 5;
let recetteId = 5;

const resolvers = {
  Query: {
    books: () => books,
    recettes: () => Recettes,
    book: (_, { id }) => books.find(book => book.id === id),
    recette: (_, { id }) => recettes.find(recette => recette.id === id),
    author: (_, { id }) => authors.find(author => author.id === id),
  },
  Mutation: {
    addBook: (_, { title, rating, authorId }) => {
      bookId++;

      const newBook = {
        id: bookId,
        title,
        rating,
        authorId,
      };

      books.push(newBook);
      return newBook;
    },

    addRecette: (_, { title, rating, link, ingredients, etapes, tempsCuisson, image, tags, mijoteuse }) => {
      recetteId++;

      const newRecette = {
        id: recetteId,
        title,
        rating,
        link,
        ingredients,
        etapes,
        tempsCuisson,
        image,
        tags,
        mijoteuse
      };

      Recettes.push(newRecette);
      return newRecette;
    },
  },
  Author: {
    books: author => books.filter(book => book.authorId === author.id),
  },
  Book: {
    author: book => authors.find(author => author.id === book.authorId),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

// module.exports = {
//   typeDefs,
//   resolvers,
//   ApolloServer,
//   server,
// };
