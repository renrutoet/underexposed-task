import "./style.css";
import "./styles/card.css";
import "@fontsource/goldman";
import "@fontsource-variable/plus-jakarta-sans";
import { F1CardProps, renderCardList } from "./renderUtils/f1Card";

const testData: F1CardProps[] = [
    {
        round: "Round 1",
        dates: "25-27 MAR",
        flag: "FLAG",
        country: "SAUDI ARABIA",
        series: "STC SAUDI ARABIAN GRAND PRIX 2022",
    },
    {
        round: "Round 2",
        dates: "08-10 APR",
        flag: "FLAG",
        country: "AUSTRALIA",
        series: "FORMULA 1 HEINEKEN AUSTRALIAN GRAND PRIX 2022",
    },
];

const renderApp = (data: F1CardProps[]): string => {
    return renderCardList(data);
};

document.querySelector<HTMLDivElement>("#app")!.innerHTML = renderApp(testData);
