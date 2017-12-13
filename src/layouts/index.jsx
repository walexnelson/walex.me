import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import 'sanitize.css';

import '../assets/styles/global.css';
import favicon from '../assets/images/icon.png';

const TemplateWrapper = ({ children }) => (
  <div className="application">
    <Helmet>
      <title>walex</title>
      <link rel="icon" type="image/png" href={ favicon } />
    </Helmet>
    {children()}
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func.isRequired,
};

export default TemplateWrapper;
