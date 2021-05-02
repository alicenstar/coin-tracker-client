import { createMuiTheme } from '@material-ui/core';


export const defaultTheme = createMuiTheme({
	overrides: {
		MuiTableRow: {
			root: {
				'&:nth-of-type(odd)': {
					backgroundColor: '#000',
				},
				'&:nth-of-type(even)': {
					backgroundColor: '#171717',
				},
			}
		},
		MuiMenu: {
			paper: {
				maxHeight: 300
			}
		},
		MuiButton: {
			root: {
				marginTop: '8px',
				marginBottom: '8px',
				height: '40px'
			}
		},
		MuiList: {
			padding: {
				paddingTop: 0,
				paddingBottom: 0
			}
		},
		MuiCardHeader: {
			root: {
				justifyContent: 'space-between',
			},
			action: {
				alignSelf: 'center',
				marginTop: 0,
			}
		},
		MuiFilledInput: {
			root: {
				borderRadius: '8px',
				height: '52px',
				margin: 0
			},
			inputMarginDense: {
				paddingTop: '22px'
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
			main: '#ff82d1',
			contrastText: '#000'
		},
		text: {
			primary: '#e6e6e6',
			secondary: '#e6e6e6',
		},
		background: {
			default: '#171717',
			paper: '#222121'
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
		borderRadius: 8
	},
	props: {
		MuiTable: {
			stickyHeader: true
		},
		MuiSwitch: {
			disableRipple: true,
		},
		MuiButton: {
			disableRipple: true,
		},
		MuiFormControl: {
			variant: 'outlined',
			margin: 'dense',
		},
		MuiTextField: {
			margin: 'dense',
			size: 'small',
			variant: 'outlined',
		},
		MuiInputLabel: {
			shrink: true,
		},
		MuiOutlinedInput: {
			notched: true,
		},
	}
});