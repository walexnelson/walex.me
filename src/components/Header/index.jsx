import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.css';

const Header = props => (
  <header className={ styles.header }>
    <h1 className={ styles.hero }>{ props.title }</h1>
    <p className={ styles.caption }>{ props.caption }</p>
  </header>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};

export default Header;
