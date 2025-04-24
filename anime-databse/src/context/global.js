import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import React from "react";

const GlobalContext = createContext();
const baseUrl = "https://api.jikan.moe/v4";

// Action types
const LOADING = "LOADING";
const SEARCH = "SEARCH";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
const GET_AIRING_ANIME = "GET_AIRING_ANIME";
const GET_PICTURES = "GET_PICTURES";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case GET_POPULAR_ANIME:
      return { ...state, popularAnime: action.payload, loading: false };
    case SEARCH:
      return {
        ...state,
        searchResults: action.payload,
        loading: false,
        isSearch: action.payload.length > 0,
      };
    case GET_UPCOMING_ANIME:
      return { ...state, upcomingAnime: action.payload, loading: false };
    case GET_AIRING_ANIME:
      return { ...state, airingAnime: action.payload, loading: false };
    case GET_PICTURES:
      return { ...state, pictures: action.payload, loading: false };
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGOUT:
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};

// i am getting initial state from localStorage
const getInitialState = () => {
  const isAuthenticated =
    JSON.parse(localStorage.getItem("isAuthenticated")) || false;
  const user = JSON.parse(localStorage.getItem("user")) || null;

  return {
    popularAnime: [],
    upcomingAnime: [],
    airingAnime: [],
    pictures: [],
    isSearch: false,
    searchResults: [],
    loading: false,
    isAuthenticated,
    user,
  };
};

export const GLobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, getInitialState());
  const [search, setSearch] = useState("");

  // getting Persist state to localStorage
  useEffect(() => {
    localStorage.setItem("isAuthenticated", state.isAuthenticated);
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.isAuthenticated, state.user]);

  // Login and Logout handling
  const login = (userInfo) => {
    dispatch({ type: LOGIN, payload: userInfo });
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  // Handle input change
  const handleChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      dispatch({ type: SEARCH, payload: [], isSearch: false });
    }
  };

  // Handle search submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      searchAnime(search);
    } else {
      alert("Please enter a valid anime name.");
    }
  };

  // Fetch Popular Anime
  const getPopularAnime = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`);
    const data = await response.json();
    dispatch({ type: GET_POPULAR_ANIME, payload: data.data });
  };

  // Fetch Upcoming Anime
  const getUpComingAnime = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseUrl}/top/anime?filter=upcoming`);
    const data = await response.json();
    dispatch({ type: GET_UPCOMING_ANIME, payload: data.data });
  };

  // Fetch Airing Anime
  const getAiringAnime = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseUrl}/top/anime?filter=airing`);
    const data = await response.json();
    dispatch({ type: GET_AIRING_ANIME, payload: data.data });
  };

  // Search Anime
  const searchAnime = async (anime) => {
    dispatch({ type: LOADING });
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${anime}&order_by=popularity&sort=asc&sfw`
    );
    const data = await response.json();
    dispatch({ type: SEARCH, payload: data.data });
  };
  const getAnimePictures = async (id) => {
    dispatch({ type: LOADING });
    const response = await fetch(
      `https://api.jikan.moe/v4/characters/${id}/pictures`
    );
    const data = await response.json();
    dispatch({ type: GET_PICTURES, payload: data.data });
  };

  useEffect(() => {
    getPopularAnime();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        handleChange,
        handleSubmit,
        searchAnime,
        search,
        getPopularAnime,
        getUpComingAnime,
        getAiringAnime,
        getAnimePictures,
        login,
        logout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
