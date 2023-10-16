import { TypedDocumentNode, gql } from '@apollo/client';

export const GetArtistsByNameContaining: TypedDocumentNode<
  ArtistsByNameData,
  ArtistsByNameVars
> = gql`
  query GetArtistsByNameContaining($name: String!) {
    queryArtists(byName: $name) {
      name
      id
      image
    }
  }
`;

export const GetArtistsWithAlbumAndTracksByNameContaining: TypedDocumentNode<
  ArtistsWithAlbumAndTracksByNameData,
  ArtistsWithAlbumAndTracksByNameVars
> = gql`
  query GetArtistsWithAlbumAndTracksByNameContaining($name: String!) {
    queryArtists(byName: $name) {
      name
      id
      image
      albums {
        name
        id
        image
        tracks {
          id
          name
          preview_url
          artists {
            name
          }
        }
      }
    }
  }
`;
