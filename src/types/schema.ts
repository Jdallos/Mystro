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
    playing: string;
    token: string;
    details: Discover;
  }
}


export type { Album, Artist, Track, Recommendations, TrackObjectFull, Discover, ArtistSearch, ReduxState }