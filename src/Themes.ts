import { createMuiTheme } from '@material-ui/core';

export const defaultTheme = createMuiTheme({
	overrides: {
		MuiTableRow: {
			root: {
				'&:nth-of-type(odd)': {
					backgroundColor: '#000',
				},
			}
		}
	},
	palette: {
		type: 'dark',
		primary: {
			light: '#7be0e4',
			main: '#5ce1e6',
			dark: '#3bc3c8',
			contrastText: '#000'
		},
		secondary: {
			main: '#ff66c4',
			contrastText: '#000'
		},
		text: {
			primary: '#e6e6e6',
			secondary: '#e6e6e6',
		},
		background: {
			default: '#171717'
		}
	},
	typography: {
		// fontFamily: '',
		h1: {
			fontSize: '3.5rem'
		},
		h2: {
			fontSize: '3rem'
		},
		h3: {
			fontSize: '2.5rem'
		},
		button: {
			textTransform: 'none'
		},
		overline: {
			fontSize: '1.2rem',
			lineHeight: 1.0,
			letterSpacing: '0.094em'
		}
	},
	shape: {
		borderRadius: 0
	},
	props: {
		MuiTable: {
			stickyHeader: true
		},
		MuiSwitch: {
			disableRipple: true,
		}
	}
});