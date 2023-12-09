import {TypographyOptions} from "@mui/material/styles/createTypography";
import {PaletteOptions} from "@mui/material/styles";
const TypographyStyle = (palette:PaletteOptions) => {
    const typography:TypographyOptions = {
        h2: {
            fontFamily: "Kalnia",
            fontSize: "2.2rem",
            fontWeight: "normal",
            color: palette.text?.primary
        },
        h3: {
            fontFamily: "Raleway",
            fontSize: "3rem"
        },
        h6: {
            fontFamily: "Raleway",
            fontSize: "1rem"
        },
        body1: {
            fontFamily: "Raleway , sans-serif",
            fontSize: "0.8rem",
            color: palette.text?.secondary
            //fontSize:"1.3rem"
        },
        body2: {
            fontFamily: "Raleway, sans-serif",
            fontSize: "1.1rem"
        },
        subtitle1: {
            fontFamily: "Raleway, sans-serif",
            fontSize: "1.1rem"
        },

        button: {
            fontFamily: "Raleway, sans-serif",
            fontSize: "1.2rem",
            textTransform: "capitalize",
        }
    }
    return typography
}

export default TypographyStyle