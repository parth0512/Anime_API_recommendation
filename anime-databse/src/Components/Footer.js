import React from "react";
import styled from "styled-components";
import { FaGithub, FaTwitter, FaDiscord, FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <FooterContainer>
      <div className="footer-content">
        <div className="footer-section">
          <h3>Navigation</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/">Popular</a>
            </li>
            <li>
              <a href="/">Airing</a>
            </li>
            <li>
              <a href="/">Upcoming</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Legal</h3>
          <ul>
            <li>
              <a href="/terms">Terms of Service</a>
            </li>
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="/dmca">DMCA</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Connect</h3>
          <div className="social-icons">
            <a href="https://github.com/parth0512" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://twitter.com" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://discord.gg" aria-label="Discord">
              <FaDiscord />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          It is Powered by{" "}
          <a
            href="https://jikan.moe/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Jikan API
          </a>
        </p>
        <p>© {new Date().getFullYear()} AnimeClub. All rights reserved.</p>
      </div>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background: rgb(0, 0, 0);
  color: #fff;
  padding: 3rem 0 1rem;
  margin-top: 3rem;

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    padding: 0 2rem;
  }

  .footer-section {
    h3 {
      color: #5151e5;
      margin-bottom: 1.5rem;
      font-size: 1.2rem;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        margin-bottom: 0.8rem;

        a {
          color: #ccc;
          text-decoration: none;
          transition: color 0.3s;

          &:hover {
            color: #72edf2;
          }
        }
      }
    }
  }

  .social-icons {
    display: flex;
    gap: 1.5rem;

    a {
      color: #fff;
      font-size: 1.5rem;
      transition: color 0.3s;

      &:hover {
        color: #72edf2;
      }
    }
  }

  .footer-bottom {
    text-align: center;
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid #333;
    color: #888;
    font-size: 0.9rem;

    p {
      margin: 0.5rem 0;

      a {
        color: #72edf2;
        text-decoration: none;
      }
    }
  }

  @media (max-width: 768px) {
    .footer-content {
      grid-template-columns: 1fr;
      text-align: center;
    }

    .social-icons {
      justify-content: center;
    }
  }
`;

export default Footer;
