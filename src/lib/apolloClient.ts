import { ApolloClient, InMemoryCache } from "@apollo/client";


const apolloClient = new ApolloClient({
  uri:`${process.env.SERVER_URI}/api/graphql`,
  cache: new InMemoryCache()
})

export default apolloClient;