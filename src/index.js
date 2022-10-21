import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  from,
  gql,
  HttpLink
} from "@apollo/client";

const link = from([
  new HttpLink({
    uri: "https://verified-cow-69.hasura.app/v1/graphql",
    headers: {
      'x-hasura-admin-secret': "klOWbo3h46Y1nkwfdxlAlTqwudC905AYxO2tRh9zRmqFBRY5RjSjVpwvCw99Qprl",
    }
  }),
     
]);
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});
 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
  <ApolloProvider client={client}>

    <App />

  </ApolloProvider>
    
  </React.StrictMode>
);/*
client.query({
  query: gql`
   query MyQuery {
     Users {
       email
       first_name
       id
       last_name
       username
     }
   }
 `
})
.then(result => console.log(result))
 */
