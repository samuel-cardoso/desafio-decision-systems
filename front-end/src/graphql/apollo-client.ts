import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  // Por se tratar de um desafio, o valor da URI está visível abaixo.
  // Em aplicações reais, eu utilizaria variáveis de ambiente para proteger dados sensíveis e facilitar configurações por ambiente.

  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});
