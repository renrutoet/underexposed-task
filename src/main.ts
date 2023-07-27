import "./style.css";
import "./styles/card.css";
import "./styles/viewPage.css";
import "@fontsource/goldman";
import "@fontsource-variable/plus-jakarta-sans";
import { renderApp } from "./renderUtils/rendering";
import { F1TemplateData } from "./renderUtils/templates";

export const testData = [
    {
        round: "Round 1",
        dates: "25-27 MAR",
        flag: "FLAG",
        country: "Saudi Arabia",
        series: "STC SAUDI ARABIAN GRAND PRIX 2022",
    },
    {
        round: "Round 2",
        dates: "08-10 APR",
        flag: "FLAG",
        country: "Australia",
        series: "FORMULA 1 HEINEKEN AUSTRALIAN GRAND PRIX 2022 FORMULA 1 HEINEKEN AUSTRALIAN GRAND PRIX 2022FORMULA 1 HEINEKEN AUSTRALIAN GRAND PRIX 2022FORMULA 1 HEINEKEN AUSTRALIAN GRAND PRIX 2022",
    },
    {
        round: "Round 2",
        dates: "08-10 APR",
        flag: "FLAG",
        country: "Australia",
        series: "FORMULA 1 HEINEKEN AUSTRALIAN GRAND PRIX 2022",
    },
    {
        round: "Round 2",
        dates: "08-10 APR",
        flag: "FLAG",
        country: "Australia",
        series: "FORMULA 1 HEINEKEN AUSTRALIAN GRAND PRIX 2022",
    },
    {
        round: "Round 2",
        dates: "08-10 APR",
        flag: "FLAG",
        country: "Australia",
        series: "FORMULA 1 HEINEKEN AUSTRALIAN GRAND PRIX 2022",
    },
] as F1TemplateData[];

renderApp();
