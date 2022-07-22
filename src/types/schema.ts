/// <reference types="spotify-api" />

import Album = SpotifyApi.AlbumObjectFull;
import Artist = SpotifyApi.ArtistObjectFull;
import Track = SpotifyApi.TrackObjectFull;
import RecommendationsSeedObject = SpotifyApi.RecommendationsSeedObject;
import TrackObjectFull = SpotifyApi.TrackObjectFull;
import ArtistSearch = SpotifyApi.ArtistObjectSimplified;


interface Recommendations {
  seeds: RecommendationsSeedObject[];
  tracks: TrackObjectFull[];
}

interface Discover {
  recommendation: TrackObjectFull,
  album: Album;
  artist: Artist;
  track: Track;
}
interface ReduxState {
  mystro: {
    saved: TrackObjectFull[];
    playing: TrackObjectFull;
    token: string;
    details: Discover;
    goBack: boolean;
    previousSearch: {
      previousRecommendations: any;
      previousSearchId: any;
    },
  },
  sort: {
    byYear: { ascend : boolean, descend: boolean };
    byPopularity: { ascend : boolean, descend: boolean };
    byArtist: { ascend : boolean, descend: boolean };
  }
}


export type { Album, Artist, Track, Recommendations, TrackObjectFull, Discover, ArtistSearch, ReduxState }