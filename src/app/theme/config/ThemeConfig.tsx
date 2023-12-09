import {createTheme, PaletteOptions} from "@mui/material";
import {TypographyStyle} from "./index";


const ThemeConfig = (palette: PaletteOptions) => createTheme(
    {
        palette:{...palette},
        spacing: (factor:number) => `${factor}px`,
        breakpoints: {
            values: {
                xs: 0,
                sm: 450,
                md: 850,
                lg: 1200,
                xl: 1536,
            },
        },
        typography:{...TypographyStyle(palette)},
        components:{
            /*MuiCssBaseline: {
                styleOverrides: (theme) => ({
                    "html":{
                        background:theme.palette.background.default,
                    },
                    "::-webkit-scrollbar-track ":{
                        bgColor: theme.palette.background.default,

                    },
                    "header":{
                        background:theme.palette.background.default,
                        "a":{
                            color:theme.palette.text.primary
                        }
                    },
                }),
            },*/
            MuiButton:{
                styleOverrides: {
                    root: ({ theme }) =>
                        theme.unstable_sx({
                            borderRadius: 2,
                            paddingBlock : "10px",
                        }),
                },
            },
        }
    }
)

export default ThemeConfig;



