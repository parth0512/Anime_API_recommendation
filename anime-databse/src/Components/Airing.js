import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/global";
import styled from "styled-components";
import Sidebar from "./Sidebar";

function Airing({ rendered }) {
  const { airingAnime, isSearch, searchResults } = useGlobalContext();

  // Determine which data to display
  const displayData = isSearch ? searchResults : airingAnime;

  return (
    <PopularStyled>
      <div className="airing-anime">
        {displayData?.length > 0 ? (
          displayData.map((anime) => (
            <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
              <img
                src={anime.images.jpg.large_image_url}
                alt={anime.title || "Anime"}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x450"; // Fallback image
                }}
              />
            </Link>
          ))
        ) : (
          <div className="no-results">
            {isSearch ? "No search results found" : "Loading airing anime..."}
          </div>
        )}
      </div>
      <Sidebar />
    </PopularStyled>
  );
}

const PopularStyled = styled.div`
  border-top: 3px solid #333;

  display: flex;
  .airing-anime {
    border-right: 3px solid #333;
    margin-top: 2rem;
    padding-top: 0rem;
    padding-bottom: 2rem;
    padding-left: 5rem;
    padding-right: 30px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 2rem;
    background-color: black;

    a {
      height: 500px;
      border-radius: 7px;
      border: 3px solid yellow;
    }
    a img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px;
    }
  }
`;

export default Airing;
