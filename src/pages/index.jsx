import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.css';
import { SocialLinks } from '../components';
import BackgroundImage from '../assets/images/unsplash1500.png';

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = { show: false };
    this.getLoadedImageStyle = this.getLoadedImageStyle.bind(this);
    this.getLoadedStyle = this.getLoadedStyle.bind(this);
  }

  componentDidMount() {
    setTimeout(() => { this.setState({ show: true }); }, 2500);

    const hdLoaderImg = new Image();
    hdLoaderImg.src = BackgroundImage;

    hdLoaderImg.onload = () => {
      this.setState({ image: BackgroundImage });
    };
  }

  getLoadedImageStyle() {
    return (typeof this.state.image === 'undefined')
      ? {}
      : { opacity: 1 };
  }

  getLoadedStyle() {
    return (this.state.show)
      ? { opacity: 1, top: 0 }
      : {};
  }

  render() {
    const { home, accounts } = this.props.data.site.siteMetadata;

    return (
      <div className={ styles.container }>
        <div className={ styles.preload } />
        <div className={ styles.loaded } style={ this.getLoadedImageStyle() } />

        <header className={ styles.header } style={ this.getLoadedStyle() }>
          <h1 className={ styles.hero }>{ home.title }</h1>
          <p className={ styles.caption }>{ home.caption }</p>
        </header>
        <div className={ styles.linkContainer } style={ this.getLoadedStyle() }>
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
