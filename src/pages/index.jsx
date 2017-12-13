import React, { Component } from 'react';

import styles from './index.module.css';
import { SocialLinks } from '../components';

import BackgroundImage from '../assets/images/unsplash1500.png';

require('sanitize.css');
require('../assets/styles/global.css');

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = { show: false };
    this.getContainerStyles = this.getContainerStyles.bind(this);
    this.getLoadedImageStyles = this.getLoadedImageStyles.bind(this);
  }

  componentDidMount() {
    setTimeout(() => { this.setState({ show: true }); }, 2500);

    const hdLoaderImg = new Image();
    hdLoaderImg.src = BackgroundImage;

    hdLoaderImg.onload = () => {
      this.setState({ image: BackgroundImage });
    };
  }

  getContainerStyles() {
    return (this.state.show)
      ? [styles.container, styles.isLoaded].join(' ')
      : styles.container;
  }

  getLoadedImageStyles() {
    return (typeof this.state.image === 'undefined')
      ? styles.loaded
      : [styles.loaded, styles.imageFadeIn].join(' ');
  }

  render() {
    const caption = 'Software Architect @ Domo  •  Building Cool Stuff with ReactJS';
    const accounts = [
      { name: 'Twitter', link: 'https://twitter.com/w_alexnelson', fa: 'fa-twitter' },
      { name: 'Instagram', link: 'https://www.instagram.com/walexnelson', fa: 'fa-instagram' },
      { name: 'Facebook', link: 'https://www.facebook.com/walexnelson', fa: 'fa-facebook' },
      { name: 'LinkedIn', link: 'https://www.linkedin.com/in/walexnelson/', fa: 'fa-linkedin' },
      { name: 'Github', link: 'https://github.com/walexnelson', fa: 'fa-github' },
    ];

    return (
      <div className={ this.getContainerStyles() }>
        <div className={ styles.preload } />
        <div className={ this.getLoadedImageStyles() } />

        <header className={ styles.header }>
          <h1 className={ styles.hero }>Alex Nelson</h1>
          <p className={ styles.caption }>{ caption }</p>
        </header>
        <div className={ styles.linkContainer }>
          <SocialLinks accounts={ accounts } />
        </div>
      </div>
    );
  }
}
