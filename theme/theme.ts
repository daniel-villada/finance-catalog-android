import {extendTheme} from "native-base";

export const theme = {
    spacing: {
        small: 8,
        medium: 16,
        large: 24
    }
}

export const nativeBaseTheme = extendTheme({
    colors: {
        brand: {
            primary: '#0ABAA4',
        },
        background: {
            primary: '#232330',
            secondary: '#161623'
        },
        neutral: {
            white: '#FDFFFD',
            black: '#161623'
        }
    },
    fonts: {
        body: 'poppins-medium',
    },
    components: {
        Button: {
            baseStyle: {
                rounded: 'md',
            },
            defaultProps: {
                _spinner: {
                    color: "black"
                },
                _text: {
                    fontSize: "md",
                    fontWeight: "bold"
                }
            },
            variants: {
                primary: {
                    backgroundColor: '#fafafa',
                    height: 52,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }
            }
        },
    }
})

type CustomThemeType = typeof nativeBaseTheme;

declare module 'native-base' {
    interface ICustomTheme extends CustomThemeType {
    }
}
