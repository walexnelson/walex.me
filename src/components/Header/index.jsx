import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';

import styles from './header.module.css';

const transitionStyles = {
  entering: { opacity: 0.01 },
  entered: { opacity: 1 },
};

class Header extends React.Component {
  state = { show: false };

  componentWillMount() {
    setTimeout(() => {
      this.setState({ show: true });
    }, 10);
  }

  render() {
    return (
      <header className={ styles.header }>
        <Transition
          mountOnEnter
          in={ this.state.show }
          timeout={ 1000 }
        >
          {state => (
            <span>
              <h1 className={ styles.hero } style={{ ...transitionStyles[state] }}>
                { this.props.title }
              </h1>
              <p className={ styles.caption } style={{ ...transitionStyles[state] }}>
                { this.props.caption }
              </p>
            </span>
          )}
        </Transition>
      </header>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};

export default Header;
