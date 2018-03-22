import React from 'react';
import Image from 'gatsby-image';
import PropTypes from 'prop-types';

import styles from './styles.module.css';

const Unsplash = props => (
  <Image
    outerWrapperClassName={ styles.wrapper }
    className={ styles.image }
    title={ props.title }
    alt={ props.alt }
    sizes={ props.src.sizes }
  />
);

Unsplash.propTypes = {
  src: PropTypes.shape({ sizes: {} }).isRequired,
  title: PropTypes.string,
  alt: PropTypes.string,
};

Unsplash.defaultProps = {
  title: 'Unsplash',
  alt: 'walex.me',
};

export default Unsplash;
