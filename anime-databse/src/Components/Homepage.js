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
            // style={{
            //   color: "yellow",
            //   marginRight: "70%",
            //   fontSize: "50px",
            //   fontStyle: "italic",
            //   marginTop: "0%",
            //   marginLeft: "40%",
            // }}
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
          <div className="col-lg-6 col-md-12" style={{ marginTop: "1.4%" }}>
            <p>
              Unleash Your Imagination <br />
              with Unlimited <span>Anime</span>
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
          <div className="col-lg-6 col-md-12 d-flex justify-content-center align-items-center">
            <img src={luffy} alt="Luffy" style={{ marginLeft: "25%" }} />
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
    width: 100%;
    margin: 0;
    transition: all 0.4s ease-in-out;
    background-color: black;
 @media screen and (max-width: 768px) {
      padding: 2rem 1rem;
    }

    .logo {
      margin-top: 0%;
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
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      overflow-x: hidden;
      margin-bottom:5%;

      h1{
      margin-left:1%;
      color:yellow;
      margin-right:50%
      }
      button {
        display: flex;
        align-items: center;
        gap: 0rem;
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
      margin-bottom: 0%;

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
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: white;
      padding: 4rem 0;
        width: 100%; // Ensure full width
      margin: 0 auto; // Center content within full width
      padding: 4rem 0;
      margin-top: -10%;

      // Add responsive padding
      @media screen and (max-width: 768px) {
        padding: 2rem 0;
        margin-top: 0;
      }

      p {
        font-size: 40px;
        margin-bottom: 2rem;
        line-height: 1.2;

        span {
          font-style: italic;
          color: yellow;
        }
      }

      form {
        .input-control {
          position: relative;
          width: 100%;
          margin-left: -2%;
        }

        input {
          width: 100%;
          padding: 0.7rem 1rem;
          border-radius: 20px;
          border: 2px solid #e5e7eb;
          background-color: black;
          color: white;
          font-size: 1.2rem;
          outline: none;
        }

        button {
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

      img {
        max-width: 100%;
        height: auto;
      }
    }
  }
`;

export default Homepage;
