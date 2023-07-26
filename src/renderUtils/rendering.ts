import { testData } from "../main";
import {
    F1TemplateData,
    f1CardRenderer,
    templateToElement,
    viewPageRenderer,
} from "./templates";

export const renderApp = (): any => {
    console.log("rendering");
    const containerElement = document.createElement("div");
    const renderCards = renderCardList(testData);

    renderCards.forEach((card) => {
        containerElement.appendChild(card);
    });

    document
        .querySelector<HTMLDivElement>("#app")!
        .replaceChildren(containerElement);
};

const renderViewPage = (cardData: any) => {
    document
        .querySelector<HTMLDivElement>("#app")!
        .replaceChildren(templateToElement(viewPageRenderer, cardData));

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
