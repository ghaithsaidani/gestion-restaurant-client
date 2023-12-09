import { PaletteOptions } from "@mui/material/styles"
import colors from "../../../assets/scss-variables/_colors.module.scss"

const Primary={
    main:colors.blue1000,
    light:colors.blue100
}

export const LightPalette:PaletteOptions=({
    mode:"light",
    primary:Primary,
    background:{
        default:colors.light,
    },
    text:{
        primary:colors.dark,
        secondary:colors.grey500,
        disabled:colors.grey1000
    },
    common:{
        white:colors.light,
        black:colors.dark
    }
})


export const DarkPalette:PaletteOptions=({
    mode:"dark",
    primary:Primary,
    background:{
        default:colors.dark,
    },
    text:{
        primary:colors.light,
        secondary:colors.grey500,
        disabled:colors.grey1000
    }
})