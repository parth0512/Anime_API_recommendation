import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";

function AnimeItem() {
  const { id } = useParams();

  const [anime, setAnime] = useState({});
  const [characters, setCharacters] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const {
    title,
    synopsis,
    trailer,
    duration,
    aired,
    season,
    images,
    rank,
    score,
    scored_by,
    popularity,
    status,
    rating,
    source,
  } = anime;

  // I am getting anime based on ID
  const getAnime = async (anime) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`);
    const data = await response.json();
    setAnime(data.data);
  };

  //here i will have characters
  const getCharacters = async (anime) => {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime/${anime}/characters`
    );
    const data = await response.json();
    setCharacters(data.data);
    console.log(data.data);
  };
  useEffect(() => {
    getAnime(id);
    getCharacters(id);
  }, []);
  return (
    <AnimeItemStyle>
      <h1>{title}</h1>
      <div className="details">
        <div className="detail">
          <div className="image">
            <img src={images?.jpg.large_image_url} alt="" />
          </div>
          <div className="anime-details">
            <p>
              <span>Aired:</span>
              <span>{aired?.string}</span>
            </p>
            <p>
              <span>Rating:</span>
              <span>{rating}</span>
            </p>
            <p>
              <span>Rank:</span>
              <span>{rank}</span>
            </p>
            <p>
              <span>Score:</span>
              <span>{score}</span>
            </p>
            <p>
              <span>Scored By:</span>
              <span>{scored_by}</span>
            </p>
            <p>
              <span>Popularity:</span>
              <span>{popularity}</span>
            </p>
            <p>
              <span>Staus:</span>
              <span>{status}</span>
            </p>
            <p>
              <span>Source:</span>
              <span>{source}</span>
            </p>
            <p>
              <span>Season:</span>
              <span>{season}</span>
            </p>
            <p>
              <span>Duration:</span>
              <span>{duration}</span>
            </p>
          </div>
        </div>
        <p className="description">
          {showMore ? synopsis : synopsis?.substring(0, 450) + "..."}
          <button
            onClick={() => {
              setShowMore(!showMore);
            }}
          >
            {showMore ? "Show Less" : "Read More"}
          </button>
        </p>
      </div>
      <h3 className="title">Trailer</h3>
      <div className="trailer-con">
        {trailer?.embed_url && (
          <iframe
            src={trailer?.embed_url}
            title={title}
            width="800"
            height="450"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
      <h3 className="title">Characters</h3>
      <div className="characters">
        {characters?.map((character, index) => {
          const { role } = character;
          const { images, name, mal_id } = character.character;
          return (
            <Link to={`/character/${mal_id}`} key={index}>
              <div className="character">
                <img src={images?.jpg.image_url} alt="" />
                <h4>{name}</h4>
                <p>{role}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </AnimeItemStyle>
  );
}
const AnimeItemStyle = styled.div`
  padding: 3rem 18rem;
  background-color: rgb(0, 0, 0);
  h1 {
    display: inline-block;
    font-size: 3rem;
    margin-bottom: 1.5rem;
    cursor: pointer;
    background: linear-gradient(
      to right,
      rgb(255, 252, 63),
      rgb(242, 242, 242)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all 0.4s ease-in-out;
    &:hover {
      transform: skew(-3deg);
    }
  }
  .title {
    display: inline-block;
    margin: 3rem 0;
    font-size: 2rem;
    cursor: pointer;
    background: linear-gradient(
      to right,
      rgb(255, 252, 63),
      rgb(242, 242, 242)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .description {
    margin-top: 2rem;
    color: rgb(255, 255, 255);
    line-height: 1.7rem;
    font-size: 13px;
    button {
      background-color: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      font-size: 13px;
      color: rgb(255, 252, 63);
      font-weight: 600;
    }
  }
  .trailer-con {
    display: flex;
    justify-content: center;
    align-items: center;
    iframe {
      outline: none;
      border: 5px solid rgb(255, 255, 255);
      padding: 1.5rem;
      border-radius: 10px;
      background-color: rgb(145, 147, 152);
    }
  }
  .details {
    background-color: rgb(0, 0, 0);
    border-radius: 20px;
    padding: 2rem;
    border: 5px solid yellow;
    color: white;
    .detail {
      display: grid;
      grid-template-columns: repeat(2, 1fr);

      img {
        padding-right: 20px;
        border-radius: 7px;
      }
    }
    .anime-details {
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      p {
        gap: 1rem;
        display: flex;
        font-size: 13px;
      }
      p span:first-child {
        font-weight: 600;
        color: rgb(255, 252, 63);
      }
    }
  }
  .characters {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 2rem;
    background-color: #fff;
    padding: 2rem;
    border-radius: 20px;
    border: 5px solid yellow;
    background-color: rgb(0, 0, 0);

    a {
      text-decoration: none;
    }
    .character {
      padding: 0.4rem 0.6rem;
      border-radius: 7px;
      border: 3px solid white;
      background-color: rgba(120, 28, 28, 0.68);
      transition: all 0.4s ease-in-out;

      img {
        width: 100%;
      }

      h4 {
        padding: 0.5rem 0;
        color: rgb(255, 255, 255);
      }
      p {
        color: rgb(255, 252, 63);
      }
      &:hover {
        transform: translateY(-5px);
      }
    }
  }
`;
export default AnimeItem;
