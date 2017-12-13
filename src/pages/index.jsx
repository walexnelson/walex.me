import React from 'react';

import styles from './index.module.css';
import { SocialLinks } from '../components';

import BackgroundImage from '../assets/images/unsplash.jpg';

require('sanitize.css');
require('../assets/styles/global.css');

export default () => {
  const rgba = 'rgba(92, 177, 255, 0.3)';
  const url = `linear-gradient(to top, ${rgba}, ${rgba}), url(${BackgroundImage})`;
  const caption = 'Software Architect @ Domo  •  Building Cool Stuff with ReactJS';
  const accounts = [
    { name: 'Twitter', link: 'https://twitter.com/w_alexnelson', fa: 'fa-twitter' },
    { name: 'Instagram', link: 'https://www.instagram.com/walexnelson', fa: 'fa-instagram' },
    { name: 'Facebook', link: 'https://www.facebook.com/walexnelson', fa: 'fa-facebook' },
    { name: 'Github', link: 'https://github.com/walexnelson', fa: 'fa-github' },
  ];

  return (
    <div className={ styles.container } style={ { backgroundImage: url } }>
      <header className={ styles.header }>
        <h1 className={ styles.hero }>Alex Nelson</h1>
        <p className={ styles.caption }>{ caption }</p>
      </header>
      <div className={ styles.linkContainer }>
        <SocialLinks accounts={ accounts } />
      </div>
    </div>
  );
};
