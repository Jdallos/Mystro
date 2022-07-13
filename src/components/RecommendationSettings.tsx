import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArtistSearch, ReduxState } from "../types/schema";
import { sortByYear, sortByPopularity, sortByArtist, clearFilters } from "../redux/sortingSlice";

interface Props {
  searchId: ArtistSearch[];
  changeRecommendationSeed: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const RecommendationSettings: React.FC<Props> = ({
  searchId,
  changeRecommendationSeed,
}) => {

  const{ byYear, byPopularity, byArtist } = useSelector(
    (state: ReduxState) => state.sort
  );

  const dispatch = useDispatch();

  return (
    <div>
      <div id="refineSelect">
        <label htmlFor="changeSeed">Refine search:</label>
        <select id="changeSeed" onChange={(e) => changeRecommendationSeed(e)}>
          {searchId?.map((seed) => (
            <option key={`seeds${seed.id}`}>{seed.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="byYearNewest">By Year: Newest</label>
        <input 
          type="radio" 
          name="byYear" 
          id="byYearNewest" 
          checked={ byYear.descend }
          onChange={() => dispatch(sortByYear("highToLow"))}
        />
        <label htmlFor="byYearOldest">Oldest</label>
        <input 
          type="radio" 
          name="byYear" 
          id="byYearOldest" 
          checked={ byYear.ascend }
          onChange={() => dispatch(sortByYear("lowToHigh"))}
        />
      </div>
      <div>
        <label htmlFor="byPopularity Highest">By Popularity: Highest</label>
        <input 
          type="radio" 
          name="byPopularity" 
          id="byPopularityHighest" 
          checked={ byPopularity.descend }
          onChange={() => dispatch(sortByPopularity("highToLow"))}
        />
        <label htmlFor="byPopularityLowest">Lowest</label>
        <input 
          type="radio" 
          name="byPopularity" 
          id="byPopularityLowest" 
          checked={ byPopularity.ascend }
          onChange={() => dispatch(sortByPopularity("lowToHigh"))}
        />
      </div>
      <div>
        <label htmlFor="byPopularityA-Z">By Artist: A-Z</label>
        <input 
          type="radio" 
          name="byArtist" 
          id="byArtistA-Z" 
          checked={ byArtist.ascend }
          onChange={() => dispatch(sortByArtist("lowToHigh"))}
        />
        <label htmlFor="byPopularityZ-A">Z-A</label>
        <input 
          type="radio" 
          name="byArtist" 
          id="byArtistZ-A" 
          checked={ byArtist.descend }
          onChange={() => dispatch(sortByArtist("highToLow"))}
        />
      </div>
      <button 
        onClick={() => dispatch(clearFilters())}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default RecommendationSettings;