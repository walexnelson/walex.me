import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

function LinkIcon(props) {
  return (
    <a
      className={ [styles.icon, `fa ${props.fa}`].join(' ') }
      href={ props.link }
      target="_blank"
      name={ props.name }
    >
      <span className={ styles.label }>{ props.name }</span>
    </a>
  );
}

LinkIcon.propTypes = {
  link: PropTypes.string.isRequired,
  fa: PropTypes.string.isRequired,
  name: PropTypes.string,
};

LinkIcon.defaultProps = {
  name: 'Follow Me',
};

export default LinkIcon;
