import React, { memo } from "react";
import Recommendation from "./Recommendation";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
/// <reference types="spotify-api" />

interface Props {
  recommendations: any;
  searchItem: any;
  getInfo: (artistId: string, albumId: string, trackId: string) => void;
}

const recommendationsList: React.FC<Props> = ({
  recommendations,
  searchItem,
  getInfo
}) => {
  const recData = recommendations.data.tracks;
  console.log("rec", recData);
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
                  <Recommendation recommendation={rec} key={rec.id} getInfo={getInfo} />
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
