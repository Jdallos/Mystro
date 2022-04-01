import React from "react";
import Recommendation from "./Recommendation";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import { Recommendations, ArtistSearch } from "../types/schema";

interface Props {
  recommendations: Recommendations;
  searchItem?: ArtistSearch;
}

/**
 *
 * Recommendations List component to display all recommendation responses
 *
 * @param recommendations array of recommendations
 * @param searchItem API response data from user search
 * @returns Recommendations list display
 */
const RecommendationsList: React.FC<Props> = ({
  recommendations,
  searchItem,
}) => {

  const recData = recommendations.tracks;

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
                {recData.map((rec) => (
                  <Recommendation recommendation={rec} key={rec.id} />
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

export default RecommendationsList;