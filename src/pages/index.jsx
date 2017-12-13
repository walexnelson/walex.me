import React, { Component } from 'react';

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
        <div className={ styles.preload } />
        <div className={ styles.loaded } style={ this.getLoadedImageStyle() } />

        <header className={ styles.header } style={ this.getLoadedStyle() }>
          <h1 className={ styles.hero }>Alex Nelson</h1>
          <p className={ styles.caption }>{ caption }</p>
        </header>
        <div className={ styles.linkContainer } style={ this.getLoadedStyle() }>
          <SocialLinks accounts={ accounts } />
        </div>
      </div>
    );
  }
}
