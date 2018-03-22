import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LinkIcon from '../LinkIcon';
import styles from './styles.module.css';

class SocialLinks extends Component {
  renderAccounts() {
    const { accounts } = this.props;
    const keys = Object.keys(accounts);

    return keys.map((account) => {
      const className = `fa fa-${account.toLowerCase()}`;

      return (
        <div className={ styles.linkContainer } key={ account }>
          <LinkIcon fa={ className } link={ accounts[account] } name={ account } />
        </div>
      );
    });
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
  accounts: PropTypes.shape({}).isRequired,
};

export default SocialLinks;
