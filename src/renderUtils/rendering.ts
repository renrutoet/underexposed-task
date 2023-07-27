import {
    getCountryFlag,
    getCurrentCountryCode,
    getFlagCountryCodes,
} from "../apiUtils/flags";
import { testData } from "../main";
import {
    F1TemplateData,
    f1CardRenderer,
    pageHeaderRenderer,
    templateToElement,
    viewPageRenderer,
} from "./templates";

export const renderApp = async (): Promise<void> => {
    const containerElement = document.createElement("div");
    containerElement.classList.add("full-width");
    const renderCards = await renderCardList(testData);
    const cardListContainerElement = document.createElement("div");
    cardListContainerElement.classList.add("card-list__container");

    await getFlagCountryCodes();

    containerElement.appendChild(templateToElement(pageHeaderRenderer));
    renderCards.forEach((card) => {
        cardListContainerElement.appendChild(card);
    });

    containerElement.appendChild(cardListContainerElement);

    document
        .querySelector<HTMLDivElement>("#app")!
        .replaceChildren(containerElement);
};

const renderViewPage = async (cardData: any): Promise<void> => {
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

    await updateCardWithFlag(targetElement, cardData);

    document
        .querySelector<HTMLDivElement>("#app")!
        .replaceChildren(targetElement);

    document.querySelector("#back-button")?.addEventListener("click", () => {
        renderApp();
    });
};

export const renderCard = async (cardData) => {
    const newCardElement = templateToElement(f1CardRenderer, cardData);

    await updateCardWithFlag(newCardElement, cardData);

    newCardElement.addEventListener("click", async () => {
        await renderViewPage(cardData);
    });
    return newCardElement;
};

export const updateCardWithFlag = async (cardElement, cardData) => {
    const currentCountryCode = await getCurrentCountryCode(cardData.country);
    const countryFlag = await getCountryFlag(currentCountryCode);

    const flagElement = cardElement.querySelector(".flag");

    if (flagElement) {
        !flagElement.appendChild(countryFlag);
    }
};

export const renderCardList = async (
    dataArr: F1TemplateData[]
): Promise<any[]> => {
    const result = await Promise.all(
        dataArr.map(async (cardData) => {
            return await renderCard(cardData);
        })
    );
    return result;
};
