import { ApolloClient, ApolloProvider as Provider, InMemoryCache } from '@apollo/client';
import { FC, ReactNode } from 'react';

export const apolloClient = new ApolloClient({
  uri: 'https://joyce-spotify-graphql.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

interface IProps {
  children: ReactNode;
}

export const ApolloProvider: FC<IProps> = ({ children }) => {
  return <Provider client={apolloClient}>{children}</Provider>;
};
