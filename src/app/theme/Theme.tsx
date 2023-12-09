import {ThemeProvider} from "@mui/material/styles";
import {CssBaseline, responsiveFontSizes} from "@mui/material";
import {useSelector} from 'react-redux'
import {themeValue} from "../redux/features/theme.slice";
import {ReactNode} from "react";
import {DarkPalette, LightPalette, ThemeConfig} from "./config";


interface ThemeProps {
    children: ReactNode
}

export const Theme = (props: ThemeProps) => {
    const theme = useSelector(themeValue);
    return (

            <ThemeProvider
                theme={theme === 'light' ? responsiveFontSizes(ThemeConfig(LightPalette)) : responsiveFontSizes(ThemeConfig(DarkPalette))}>
                <CssBaseline/>
                    {props.children}
            </ThemeProvider>

        /*<MaterialCssVarsProvider theme={{[MATERIAL_THEME_ID]: materialTheme}}>
            <JoyCssVarsProvider>

            </JoyCssVarsProvider>
        </MaterialCssVarsProvider>*/
    );
};

