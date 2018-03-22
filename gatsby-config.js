module.exports = {
  siteMetadata: {
    title: 'walex',
    home: {
      title: 'Alex Nelson',
      caption: `
        Husband  •  Father  •  Software Engineer @ Clip.mx  •  Building Cool Stuff with React
      `,
    },
    accounts: {
      Twitter: 'https://twitter.com/w_alexnelson',
      Instagram: 'https://www.instagram.com/walexnelson',
      Facebook: 'https://www.facebook.com/walexnelson',
      LinkedIn: 'https://www.linkedin.com/in/walexnelson',
      Github: 'https://github.com/walexnelson',
    },
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'img',
        path: `${__dirname}/src/assets/images/`,
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
  ],
};
