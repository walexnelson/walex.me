import React from 'react';
import Image from 'gatsby-image';
import PropTypes from 'prop-types';

import styles from './unsplash.module.css';

const Unsplash = props => (
  <Image
    outerWrapperClassName={ styles.wrapper }
    className={ styles.image }
    sizes={ props.image.sizes }
  />
);

Unsplash.propTypes = {
  image: PropTypes.shape({
    sizes: PropTypes.shape({}),
  }),
};

Unsplash.defaultProps = {
  image: null,
};

export default Unsplash;
