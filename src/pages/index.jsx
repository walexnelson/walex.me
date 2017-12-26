import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.css';
import { SocialLinks } from '../components';

const transitionStyles = {
  loading: { opacity: 0 },
  loaded: { opacity: 1, top: 0 },
};

const placeholderTransitions = {
  loading: { opacity: 1 },
  loaded: { opacity: 0 },
};

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    // TODO: figure out JS intervals in Gatsby
    // this.state = { state: 'loading' };
    // setInterval(() => { this.setState({ state: 'loaded' }); }, 1000);

    this.state = { state: 'loaded' };
  }

  render() {
    const { state } = this.state;
    const { home, accounts } = this.props.data.site.siteMetadata;

    return (
      <div className={ styles.container }>
        <div className={ styles.preload } style={ placeholderTransitions[state] } />
        <div className={ styles.loaded } style={ transitionStyles[state] } />

        <header className={ styles.header } style={ transitionStyles[state] }>
          <h1 className={ styles.hero }>{ home.title }</h1>
          <p className={ styles.caption }>{ home.caption }</p>
        </header>

        <div className={ styles.linkContainer } style={ transitionStyles[state] }>
          <SocialLinks accounts={ accounts } />
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        home: PropTypes.shape({}),
        accounts: PropTypes.shape({}),
      }),
    }),
  }).isRequired,
};

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
    }
  }
`;
