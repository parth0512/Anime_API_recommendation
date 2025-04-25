import { render } from "@testing-library/react";
import React, { useState, useRef } from "react"; // Added useRef
import Popular from "./Popular";
import { useGlobalContext } from "../context/global";
import styled from "styled-components";
import Upcoming from "./Upcoming";
import Airing from "./Airing";
import Footer from "./Footer";
import { Carousel } from "bootstrap";
import MyCarousel from "./MyCarousel";
import luffy from "../assests/luffy.png";

function Homepage() {
  const {
    handleSubmit: originalHandleSubmit,
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

  const scrollRef = useRef(null);

  const scrollToContent = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    originalHandleSubmit(e);
    scrollToContent();
  };

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
        <div className="search-container">
          <h1
            style={{
              color: "yellow",
              marginRight: "68%",
              fontSize: "50px",
              fontStyle: "italic",
              marginTop: "0%",
            }}
          >
            Anicom
          </h1>
          <div className="filter-btn popular-filter">
            <button
              onClick={() => {
                setRendered("popular");
                scrollToContent();
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
                scrollToContent();
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
                scrollToContent();
              }}
            >
              Upcoming
            </button>
          </div>
          {isAuthenticated && (
            <div className="filter-btn ">
              <button onClick={logout}>Logout</button>
            </div>
          )}
        </div>
        <div className="Banner row">
          <div className="col-6">
            <p>
              Unleash Your Imagination <br />
              with Unlimited <span> Anime</span>
              <br /> Adventures
            </p>
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
          </div>
          <div className="col-6">
            <img
              src={luffy}
              style={{
                position: "relative",
                overflowX: "hidden",
                width: "150%",
                height: "130%",
                marginLeft: "60%",
                marginTop: "-7%",
                marginBottom: "20%",
                zIndex: "0",
              }}
            />
          </div>
        </div>
        {/* <MyCarousel /> */}
        <div className="logo">
          <h1>
            {rendered === "popular"
              ? "㍿ Popular Anime ㍿"
              : rendered === "airing"
              ? "㍿ Airing Anime ㍿"
              : "㍿ Upcoming Anime ㍿"}
          </h1>
        </div>
        <div className="search-container-2">
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
        </div>
      </header>
      <div ref={scrollRef}>{switchComponents()}</div>
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
      margin-top: 10%;
      display: flex;
      align-items: center;
      justify-content: center;
      letter-spacing: 3px;
      margin-bottom: 1rem;
      background: linear-gradient(to right, yellow, white);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      h1 {
        font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
          "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
        font-size: 40px;
        font-weight: 700;
      }
    }

    .search-container {
      z-index: 1000;
      display: flex;
      align-items: end;
      justify-content: end;
      gap: 2rem;
      margin-right: -30%;
      margin-top: 1%;
      margin-bottom: 10%;

      button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.7rem 1.5rem;
        outline: none;
        border-radius: 30px;
        font-size: 1%.5;
        background-color: #fff;
        cursor: pointer;
        transition: all 0.4s ease-in-out;
        font-family: inherit;
        border: none;
      }

      .filter-btn {
        button {
          background-color: black;
          background: linear-gradient(to right, yellow, white);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }
    .search-container-2 {
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10rem;
      margin-top: 5%;
      margin-bottom: -3%;

      button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.7rem 1.5rem;
        outline: none;
        border-radius: 30px;
        font-size: 1%.5;
        background-color: #fff;
        cursor: pointer;
        transition: all 0.4s ease-in-out;
        font-family: inherit;
        border: none;
      }

      .filter-btn {
        button {
          background-color: black;
          background: linear-gradient(to right, yellow, white);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }
    .Banner {
      width: 100%;
      height: 100%;
      color: white;
      p {
        margin-top: 22%;
        font-size: 5rem;
        margin-right: -90%;
        margin-left: -80%;

        span {
          font-style: italic;
          color: yellow;
        }
      }
      form {
        position: relative;
        width: 200%;

        margin-left: -80%;

        .input-control {
          position: relative;
          transition: all 0.4s ease-in-out;
        }

        .input-control input {
          width: 100%;
          padding: 0.7rem 1rem;
          border: none;
          outline: none;
          border-radius: 20px;
          font-size: 1.2rem;
          background-color: #fff;
          border: 2px solid #e5e7eb;
          transition: all 0.4s ease-in-out;
          background-color: black;
          color: white;
        }

        .input-control button {
          background: linear-gradient(to right, yellow, white);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          border: none;
        }
      }
    }
  }
`;

export default Homepage;
