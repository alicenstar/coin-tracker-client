import { createMuiTheme } from '@material-ui/core';


export const defaultTheme = createMuiTheme({
	overrides: {
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
				height: '52px',
				margin: 0
			},
			inputMarginDense: {
				paddingTop: '22px'
			}
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

export const lightTheme = createMuiTheme(defaultTheme, {
	overrides: {
		MuiIconButton: {
			root: {
				color: '#fff'
			}
		},
		MuiAppBar: {
			colorDefault: {
				backgroundColor: '#222121'
			}
		},
		MuiListItemIcon: {
			root: {
				color: '#222121'
			}
		},
		MuiTableRow: {
			root: {
				'&:nth-of-type(odd) > td': {
					backgroundColor: '#2b2d2f',
					color: '#fff'
				},
				'&:nth-of-type(even) > td': {
					backgroundColor: '#d9dadb',
					color: '#000'
				},
				'&:nth-of-type(even) svg': {
					color: '#000'
				},
			}
		},
	},
	palette: {
		type: 'light',
		primary: {
			light: '#7be0e4',
			main: '#5ce1e6',
			dark: '#3bc3c8',
			contrastText: '#000'
		},
		secondary: {
			main: '#f00eae',
			contrastText: '#000'
		},
		text: {
			primary: '#000',
			secondary: '#000',
		},
		background: {
			default: '#d9dadb',
            paper: '#FBFBFB'
		}
	},
});

export const darkTheme = createMuiTheme(defaultTheme, {
	overrides: {
		MuiIconButton: {
			root: {
				color: '#fff'
			}
		},
		MuiListItemIcon: {
			root: {
				color: '#fff'
			}
		},
		MuiTableRow: {
			root: {
				'&:nth-of-type(odd) > td': {
					backgroundColor: '#222121',
					color: '#fff'
				},
				'&:nth-of-type(even) > td': {
					backgroundColor: '#171717',
					color: '#fff'
				},
				'&:nth-of-type(even) svg': {
					color: '#fff'
				},
			}
		},
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
});