export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        tourism: {
          primary: '#0470FA',
          secondary: '#04FA7B',
          accent: '#73F15C',
          neutral: '#3d4451',
          'base-100': '#ffffff',
          half: '50%',
        },
      },
      'dark',
      'cupcake',
    ],
  },
  // eslint-disable-next-line no-undef
  plugins: [require('daisyui')],
};
