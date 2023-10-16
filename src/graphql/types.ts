type Track = {
  id: string;
  name: string;
  preview_url: string;
  artists: { name: string }[];
};

type Album = {
  name: string;
  id: string;
  image: string;
  tracks: Track[];
};

type ArtistBasicInfo = {
  name: string;
  id: string;
  image: string;
};

type Artist = ArtistBasicInfo & {
  albums: Album[];
};

type ArtistsByNameVars = {
  name: string;
};

type ArtistsByNameData = {
  queryArtists: ArtistBasicInfo[];
};

type ArtistsWithAlbumAndTracksByNameVars = ArtistsByNameVars;

type ArtistsWithAlbumAndTracksByNameData = {
  queryArtists: Artist[];
};
