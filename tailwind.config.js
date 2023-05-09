export default {
	content: ['./src/**/*.html'],
	theme: {
		fontFamily: {
			sora: ['Sora', 'sans-serif'],
			mulish: ['Mulish', 'sans-serif'],
		},
		container: {
			center: true,
			padding: '20px',
		},
		screens: {
			xxl: { max: '1400px' },
			xl: { max: '1200px' },
			lg: { max: '991px' },
			md: { max: '767px' },
			sm: { max: '575px' },
			xxs: { max: '475px' },
			xxxs: { max: '375px' },
		},
		colors: {
			_primary: {
				50: '#F1FCFB',
				400: '#3CC2C5',
				DEFAULT: '#24ACB1',
				600: '#198288',
			},
			_secondary: {
				800: '#194973',
				DEFAULT: '#132D46',
			},
			_cta: {
				300: '#FFE889',
				DEFAULT: '#FFDB5C',
				500: '#CFB02E',
			},
			_success: {
				DEFAULT: '#5DBA60',
			},
			_warning: {
				DEFAULT: '#FFAA5B',
			},
			_error: {
				DEFAULT: '#E65F5F',
			},
			_black: {
				200: '#C8C8C8',
				300: '#A4A4A4',
				400: '#818181',
				DEFAULT: '#000000',
			},
			_gray: {
				50: '#F4F6F7',
				100: '#E3E3E3',
				200: '#C9D2D8',
				DEFAULT: '#424D57',
				600: '#4F5F6B',
			},
			white: '#ffffff',
		},
		fontSize: {
			xs: ['0.75rem', { lineHeight: '120%' }],
			sm: ['0.875rem', { lineHeight: '120%' }],
			base: ['1rem', { lineHeight: '120%' }],
			lg: ['1.125rem', { lineHeight: '120%' }],
			xl: ['1.25rem', { lineHeight: '120%' }],
			'2xl': ['1.5rem', { lineHeight: '120%' }],
			'3xl': ['2rem', { lineHeight: '120%' }],
			'4xl': ['2.25rem', { lineHeight: '120%' }],
			'5xl': ['3rem', { lineHeight: '120%' }],
			'6xl': ['3.75rem', { lineHeight: '120%' }],
			'7xl': ['4.5rem', { lineHeight: '120%' }],
			'8xl': ['6rem', { lineHeight: '120%' }],
			'9xl': ['8rem', { lineHeight: '120%' }],
			40: ['2.5rem', { lineHeight: '120%' }],
		},
		borderRadius: {
			none: '0px',
			sm: '0.125rem',
			DEFAULT: '0.25rem',
			md: '0.375rem',
			lg: '0.5rem',
			xl: '0.75rem',
			'2xl': '1rem',
			'3xl': '1.5rem',
			'4xl': '2rem',
			'5xl': '4rem',
			full: '9999px',
		},
		extend: {
			maxWidth: {
				'container-xl': '1400px',
				'container-l': '1170px',
			},
			boxShadow: {
				temp: '0 0 5px rgba(0, 0, 0, 0.3)',
				outline: '0 0 0px 5px rgb(203, 203, 203)',
			},
		},
	},

	plugins: [],
};
