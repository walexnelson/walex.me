import React, { Component } from 'react';

import styles from './index.module.css';
import { SocialLinks } from '../components';

import PreloadImage from '../assets/images/unsplash50.png';
import BackgroundImage from '../assets/images/unsplash1500.png';

require('sanitize.css');
require('../assets/styles/global.css');

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const hdLoaderImg = new Image();
    hdLoaderImg.src = BackgroundImage;

    hdLoaderImg.onload = () => {
      this.setState({ image: BackgroundImage });
    };
  }

  render() {
    const { image } = this.state;
    const classes = (typeof image === 'undefined')
      ? styles.loaded
      : [styles.loaded, styles.imageFadeIn].join(' ');

    const rgba = 'rgba(92, 177, 255, 0.3)';
    const preloadURL = `linear-gradient(to top, ${rgba}, ${rgba}), url(${PreloadImage})`;
    const loadURL = `linear-gradient(to top, ${rgba}, ${rgba}), url(${image})`;

    const caption = 'Software Architect @ Domo  •  Building Cool Stuff with ReactJS';
    const accounts = [
      { name: 'Twitter', link: 'https://twitter.com/w_alexnelson', fa: 'fa-twitter' },
      { name: 'Instagram', link: 'https://www.instagram.com/walexnelson', fa: 'fa-instagram' },
      { name: 'Facebook', link: 'https://www.facebook.com/walexnelson', fa: 'fa-facebook' },
      { name: 'LinkedIn', link: 'https://www.linkedin.com/in/walexnelson/', fa: 'fa-linkedin' },
      { name: 'Github', link: 'https://github.com/walexnelson', fa: 'fa-github' },
    ];

    return (
      <div className={ styles.container }>
        <div className={ styles.preload } style={{ backgroundImage: preloadURL }} />
        <div className={ classes } style={{ backgroundImage: loadURL }} />

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
