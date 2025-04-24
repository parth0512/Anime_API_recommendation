import { render } from "@testing-library/react";
import React, { useState } from "react";
import Popular from "./Popular";
import { useGlobalContext } from "../context/global";
import styled from "styled-components";
import Upcoming from "./Upcoming";
import Airing from "./Airing";
import Footer from "./Footer";

function Homepage() {
  const {
    handleSubmit,
    search,
    searchAnime,
    handleChange,
    getPopularAnime,
    getUpComingAnime,
    getAiringAnime,
    logout,
    isAuthenticated,
  } = useGlobalContext();
  const [rendered, setRendered] = useState("popular");

  const switchComponents = () => {
    switch (rendered) {
      case "popular":
        return <Popular rendered={rendered} />;
      case "airing":
        return <Airing rendered={render} />;
      case "upcoming":
        return <Upcoming rendered={rendered} />;
      default:
        return <Popular rendered={rendered} />;
    }
  };

  return (
    <HomePageStyle>
      <header>
        <div className="logo">
          <h1>
            {rendered === "popular"
              ? "㍿ Popular Anime ㍿"
              : rendered === "airing"
              ? "㍿ Airing Anime ㍿"
              : "㍿ Upcoming Anime ㍿"}
          </h1>
        </div>
        <div className="search-container">
          <div className="filter-btn popular-filter">
            <button
              onClick={() => {
                setRendered("popular");
              }}
              style={{ width: "148px" }}
            >
              Popular🔥
            </button>
          </div>

          <div className="filter-btn airing-filter">
            <button
              onClick={() => {
                setRendered("airing");
                getAiringAnime();
              }}
            >
              Airing
            </button>
          </div>
          <div className="filter-btn upcoming-filter">
            <button
              onClick={() => {
                setRendered("upcoming");
                getUpComingAnime();
              }}
            >
              Upcoming
            </button>
          </div>
          <form action="" className="search-form">
            <div className="input-control">
              <input
                type="text"
                placeholder="Search Anime"
                value={search}
                onChange={handleChange}
              />
              <button type="submit" onClick={handleSubmit}>
                Search
              </button>
            </div>
          </form>
          {isAuthenticated && (
            <div className="filter-btn ">
              <button onClick={logout}>Logout</button>
            </div>
          )}
        </div>
      </header>
      {switchComponents()}
      <Footer />
    </HomePageStyle>
  );
}

const HomePageStyle = styled.div`
  background-color: black;
  header {
    padding: 2rem 5rem;
    width: 60%;
    margin: 0 auto;
    transition: all 0.4s ease-in-out;
    background-color: black;
    @media screen and (max-width: 1530px) {
      width: 95%;
    }

    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      letter-spacing: 3px;
      margin-bottom: 2rem;
      background: linear-gradient(to right, #72edf2, #5151e5);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      h1 {
        font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
          "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
        font-size: 70px;
        font-weight: 700;
      }
    }

    .search-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;

      button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.7rem 1.5rem;
        outline: none;
        border-radius: 30px;
        font-size: 1.2rem;
        background-color: #fff;
        cursor: pointer;
        transition: all 0.4s ease-in-out;
        font-family: inherit;
        border: 3px solid #e5e7eb;
      }

      .filter-btn {
        button {
          background-color: black;
          background: linear-gradient(to right, #72edf2, #5151e5);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }

      form {
        position: relative;
        width: 100%;
        .input-control {
          position: relative;
          transition: all 0.4s ease-in-out;
        }

        .input-control input {
          width: 100%;
          padding: 0.7rem 1rem;
          border: none;
          outline: none;
          border-radius: 30px;
          font-size: 1.2rem;
          background-color: #fff;
          border: 3px solid #e5e7eb;
          transition: all 0.4s ease-in-out;
          background-color: black;
          color: white;
        }

        .input-control button {
          background: linear-gradient(to right, #72edf2, #5151e5);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
`;

export default Homepage;
