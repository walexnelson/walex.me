import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LinkIcon from '../link-icon';
import styles from './styles.module.css';

class SocialLinks extends Component {
  renderAccounts() {
    return this.props.accounts.map(account => (
      <div className={ styles.linkContainer } key={ account.name }>
        <LinkIcon fa={ account.fa } link={ account.link } name={ account.name } />
      </div>
    ));
  }

  render() {
    const links = this.renderAccounts();

    return (
      <div className={ styles.container }>
        { links }
      </div>
    );
  }
}

SocialLinks.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SocialLinks;
