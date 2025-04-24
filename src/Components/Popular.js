import React from "react";
import { useGlobalContext } from "../context/global";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Popular({ rendred }) {
  const { popularAnime, isSearch, searchResults } = useGlobalContext();

  const displayData = () => {
    if (isSearch) {
      return searchResults;
    }
    return popularAnime;
  };
  return (
    <PopularStyled>
      <div className="popular-anime">
        {displayData()?.map((anime) => (
          <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
            <img src={anime.images.jpg.large_image_url} alt={anime.title} />
          </Link>
        ))}
      </div>
    </PopularStyled>
  );
}
const PopularStyled = styled.div`
  display: flex;
  .popular-anime {
    margin-top: 2rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-left: 3rem;
    padding-right: 3rem;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 2rem;
    background-color: white;
    border-top: 5px solid black;

    a {
      height: 500px;
      border-radius: 7px;
      border: 5px solid black;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5px;
      }
    }
  }
`;
export default Popular;
