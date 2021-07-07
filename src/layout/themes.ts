export const darkTheme = {
    palette: {
        primary: {
            main: '#90caf9',
        },
        secondary: {
            main: '#FBBA72',
        },
        type: 'dark' as 'dark', // Switching the dark mode on is a single property value change.
    },
    overrides: {
        MuiAppBar: {
            colorSecondary: {
                color: '#ffffffb3',
                backgroundColor: '#616161e6',
            },
        },
        MuiButtonBase: {
            root: {
                '&:hover:active::after': {
                    // recreate a static ripple color
                    // use the currentColor to make it work both for outlined and contained buttons
                    // but to dim the background without dimming the text,
                    // put another element on top with a limited opacity
                    content: '""',
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    backgroundColor: 'currentColor',
                    opacity: 0.3,
                    borderRadius: 'inherit',
                },
            },
        },
    },
    props: {
        MuiButtonBase: {
            // disable ripple for perf reasons
            disableRipple: false,
        },
    },
};

export const lightTheme = {
    palette: {
        primary: {
            main: '#4f3cc9',
        },
        secondary: {
            light: '#5f5fc4',
            main: '#283593',
            dark: '#001064',
            contrastText: '#fff',
        },
        background: {
            default: '#fcfcfe',
        },
        type: 'light' as 'light',
    },
    shape: {
        borderRadius: 10,
    },
    overrides: {
        RaSidebar: {
            paper: {
                color: '#ffffffcc',
                backgroundColor: '#3c4c64',
            },
            drawerPaper: {
                // color: '#ffffffcc',
                backgroundColor: '#3c4c64',
            }

        },
        RaMenuItemLink: {
            root: {
                borderLeft: '3px solid #3c4c64',
                color: 'inherit'
                // color: '#ffffffcc',
            },
            active: {
                borderLeft: '3px solid #fff',
                color: '#ffffff',
                backgroundColor: '#ffffff0d'
            },
        },
        MuiPaper: {
            elevation1: {
                boxShadow: 'none',
            },
            root: {
                border: '0px solid #e0e0e3',
                backgroundClip: 'padding-box',
                
            },
        },
        MuiButton: {
            contained: {
                backgroundColor: '#fff',
                color: '#4f3cc9',
                boxShadow: 'none',
            },
        },
        MuiButtonBase: {
            root: {
                // color: 'red',
                '&:hover:active::after': {
                    // recreate a static ripple color
                    // use the currentColor to make it work both for outlined and contained buttons
                    // but to dim the background without dimming the text,
                    // put another element on top with a limited opacity
                    content: '""',
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    backgroundColor: 'currentColor',
                    opacity: 0.3,
                    borderRadius: 'inherit',
                },
            },
        },
        MuiAppBar: {
            colorSecondary: {
                color: '#ffffffcc',
                // backgroundColor: '#fff',
                backgroundColor: '#303d54',
            },
        },
        MuiDrawer: {
            root : {
                
            }
        },
        MuiMenuItem: {
            // root: {
            //     // color: '#ffffffcc',
            // },
            // button: {
            //     // color: 'red',
            // }
        },
        MuiLinearProgress: {
            colorPrimary: {
                backgroundColor: '#f5f5f5',
            },
            barColorPrimary: {
                backgroundColor: '#d7d7d7',
            },
        },
        MuiFilledInput: {
            root: {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                '&$disabled': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
            },
        },
        MuiSnackbarContent: {
            root: {
                border: 'none',
            },
        },
        MuiGridContainer: {
            root: {
                width: '100%',
            }
        },
        RaImageField: {
            image: {
                width: '100%',
            },
            // root: {
            //     width: '100%',
            // }
        },
        RaFormInput: {
            input: {
                width: '100%'
            }
        },
        RaLayout: {
            content: {
                position: 'relative',
                padding: 'unset',
                paddingTop: 0,
                paddingRight: 0,
                height: 'calc(100vh - 50px)'
            }
        },
        RaEdit: {
            root: {
                overflowX: 'auto',
                paddingBottom: 50,
            }
        },
        RaShow: {
            root: {
                overflowX: 'auto',
            }
        },
        RaCreate: {
            root: {
                overflowX: 'auto',
                paddingBottom: 50,
            }
        },
        RaList: {
            root: {
                overflowX: 'auto',
            }
        },
        // MuiToolbar: {
        //     regular: {
        //         minHeight: '45px !important',
        //     }
        // }
    },
    props: {
        MuiButtonBase: {
            // disable ripple for perf reasons
            disableRipple: false,
        },
    },
};
