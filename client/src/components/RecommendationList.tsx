import React from "react";
import Recommendation from "./Recommendation";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import { Recommendations, ArtistSearch, ReduxState } from "../types/schema";
import { sortSeeds } from "../utilities/generic-utils";
import { useSelector } from "react-redux";

interface Props {
  recommendations: Recommendations;
  searchItem: ArtistSearch| undefined;
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

  const state = useSelector(
    (state: ReduxState) => state
  );

  const recData = recommendations.tracks;

  const sortedData = sortSeeds(state, recData);

  return (
    <div>
      {/* Prevents warning/ crash if search is invalid */}
      {searchItem !== undefined ? (
        <div>
          <h3>Recommendations for {searchItem.name} fans</h3>
          {recommendations.tracks.length === 0 &&
          <h4>Sorry, spotify doesn't have enough data on this artist to provide recommendations- keep listening!</h4>}
          <section>
            <Container
              fixed
              disableGutters
              sx={{ marginY: 5 }}
            >
              <Grid container spacing={3}>
                {sortedData.map((rec) => (
                  <Recommendation recommendation={rec} key={rec.id} />
                ))}
              </Grid>
            </Container>
          </section>
        </div>
      ) : (
        <h3>Something went wrong, try a different search</h3>
      )}
    </div>
  );
};

export default RecommendationsList;