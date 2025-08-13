import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/global";
import styled from "styled-components";
import Sidebar from "./Sidebar";

function Upcoming({ rendered }) {
  const { upcomingAnime, isSearch, searchResults } = useGlobalContext();

  const conditionalRender = () => {
    if (!isSearch && rendered === "upcoming") {
      return upcomingAnime?.map((anime) => {
        return (
          <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
            <img src={anime.images.jpg.large_image_url} alt="" />
          </Link>
        );
      });
    } else {
      return searchResults?.map((anime) => {
        return (
          <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
            <img src={anime.images.jpg.large_image_url} alt="" />
          </Link>
        );
      });
    }
  };

  return (
    <PopularStyled>
      <div className="upcoming-anime">{conditionalRender()}</div>
      <Sidebar />
    </PopularStyled>
  );
}

const PopularStyled = styled.div`
  display: flex;
  border-top: 3px solid #333;
  .upcoming-anime {
    border-right: 3px solid #333;
    margin-top: 2rem;
    padding-top: 2rem;
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

export default Upcoming;
