import React, { memo } from "react";
import Recommendation from "./Recommendation";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

interface Props {
  recommendations: any;
  searchItem: any;
  getInfo: (artistId: string, albumId: string, trackId: string, recommendation: any) => void;
  saved: any[];
  setSaved: React.Dispatch<React.SetStateAction<any[]>>;
  setPlaying: React.Dispatch<React.SetStateAction<any>>;
}

// This component may be rerendering on every input onChange...
const recommendationsList: React.FC<Props> = ({
  recommendations,
  searchItem,
  getInfo,
  saved,
  setSaved,
  setPlaying
}) => {
  const recData = recommendations.data.tracks;
  return (
    <div>
      {/* Prevents warning/ crash if search is invalid */}
      {searchItem ? (
        <div>
          <h3>Recommendations for {searchItem.name} fans</h3>
          <section>
            <Container
              fixed
              disableGutters
              sx={{ marginY: 5 }}
            >
              <Grid container spacing={3}>
                {recData.map((rec: any) => (
                  <Recommendation recommendation={rec} key={rec.id} getInfo={getInfo} saved={saved} setSaved={setSaved} setPlaying={setPlaying} />
                ))}
              </Grid>
            </Container>
          </section>
        </div>
      ) : (
        <h3>Something went wrong, search again</h3>
      )}
    </div>
  );
};

export default memo(recommendationsList);