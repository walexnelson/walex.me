import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import 'sanitize.css';

import './main.css';
import favicon from '../assets/images/icon.png';

const TemplateWrapper = ({ children, data }) => (
  <div className="application">
    <Helmet>
      <title>{ data.site.siteMetadata.title }</title>
      <link rel="icon" type="image/png" href={ favicon } />
    </Helmet>
    {children()}
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func.isRequired,
  data: PropTypes.shape({}).isRequired,
};

export default TemplateWrapper;

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
