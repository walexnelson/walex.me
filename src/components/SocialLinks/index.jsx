import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';

import LinkIcon from '../LinkIcon';
import styles from './links.module.css';

const defaultPosition = 2000;

class SocialLinks extends Component {
  state = { show: false }

  componentWillMount() {
    setTimeout(() => this.setState({ show: true }), 1000);
  }

  getRandom = () => Math.floor(Math.random() * 15) + 5;

  getMotionSpring = () => {
    const damping = 15 - (this.getRandom() * 0.125);

    return spring(
      this.state.show ? 0 : defaultPosition,
      { stiffness: 120, damping },
    );
  };

  renderAccounts = () => {
    const { accounts } = this.props;
    const keys = Object.keys(accounts);

    return keys.map((account, index) => {
      const className = `fa fa-${account.toLowerCase()}`;

      return (
        <Motion
          defaultStyle={{ top: defaultPosition }}
          style={{ top: this.getMotionSpring(index) }}
          key={ account }
        >
          {state => (
            <div className={ styles.link } style={{ ...state }}>
              <LinkIcon fa={ className } link={ accounts[account] } name={ account } />
            </div>
          )}
        </Motion>
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
