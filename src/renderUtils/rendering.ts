import { testData } from "../main";
import {
    F1TemplateData,
    f1CardRenderer,
    pageHeaderRenderer,
    templateToElement,
    viewPageRenderer,
} from "./templates";

export const renderApp = (): any => {
    const containerElement = document.createElement("div");
    containerElement.classList.add("full-width");
    const renderCards = renderCardList(testData);
    const cardListContainerElement = document.createElement("div");
    cardListContainerElement.classList.add("card-list__container");

    containerElement.appendChild(templateToElement(pageHeaderRenderer));
    renderCards.forEach((card) => {
        cardListContainerElement.appendChild(card);
    });

    containerElement.appendChild(cardListContainerElement);

    document
        .querySelector<HTMLDivElement>("#app")!
        .replaceChildren(containerElement);
};

const renderViewPage = (cardData: any) => {
    const mockSeriesData = {
        winner: { name: "MAX VERSTAPPEN", laps: "50" },
        top: ["MAX VERSTAPPEN", "CHARLES LECLERC", "CARLOS SAINZ"],
        lap: { time: "1:31.634", name: "MAX VERSTAPPEN" },
    };

    const data = { ...mockSeriesData, cardData };

    const targetElement = document.createElement("div");
    targetElement.classList.add("full-width");

    targetElement.appendChild(templateToElement(pageHeaderRenderer, data));
    targetElement.appendChild(templateToElement(viewPageRenderer, data));

    document
        .querySelector<HTMLDivElement>("#app")!
        .replaceChildren(targetElement);

    document.querySelector("#back-button")?.addEventListener("click", () => {
        renderApp();
    });
};

export const renderCardList = (dataArr: F1TemplateData[]): any[] => {
    const result = dataArr.map((cardData) => {
        const newCardElement = templateToElement(f1CardRenderer, cardData);

        newCardElement.addEventListener("click", () => {
            console.log(cardData.country);
            renderViewPage(cardData);
        });
        return newCardElement;
    });
    return result;
};
