import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.css';
import { Header, SocialLinks, Unsplash } from '../components';

const HomePage = (props) => {
  const { bgImage, site } = props.data;
  const { home, accounts } = site.siteMetadata;

  return (
    <div className={ styles.container }>
      <Unsplash src={ bgImage } />
      <Header title={ home.title } caption={ home.caption } />
      <SocialLinks accounts={ accounts } />
    </div>
  );
};

HomePage.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({}),
    bgImage: PropTypes.shape({}),
  }).isRequired,
};

export default HomePage;

export const query = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        home {
          title,
          caption
        },
        accounts {
          Twitter,
          Facebook,
          LinkedIn,
          Instagram,
          Github,
        }
      }
    },
    bgImage: imageSharp(id: { regex: "/unsplash/" }) {
      sizes(maxWidth: 1240) {
        ...GatsbyImageSharpSizes
      }
    },
  }
`;
