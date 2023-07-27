import { getPageDetails, getRoundResults, getSeasonData } from "../apiUtils/f1";
import {
    getCountryFlag,
    getCurrentCountryCode,
    getFlagCountryCodes,
} from "../apiUtils/flags";
import {
    f1CardRenderer,
    pageHeaderRenderer,
    templateToElement,
    viewPageRenderer,
} from "./templates";
import nationalities from "i18n-nationality";
import english from "i18n-nationality/langs/en.json";

export const renderApp = async (): Promise<void> => {
    const seasonData = await getSeasonData();

    const cards = await renderCardList(seasonData);

    const containerElement = document.createElement("div");
    containerElement.classList.add("full-width");
    const cardListContainerElement = document.createElement("div");
    cardListContainerElement.classList.add("card-list__container");

    await getFlagCountryCodes();

    containerElement.appendChild(templateToElement(pageHeaderRenderer));
    cards.forEach((card) => {
        cardListContainerElement.appendChild(card);
    });

    containerElement.appendChild(cardListContainerElement);

    document
        .querySelector<HTMLDivElement>("#app")!
        .replaceChildren(containerElement);
};

const renderViewPage = async (raceData: any): Promise<void> => {
    const roundResults = await getRoundResults(raceData);

    const details = await getPageDetails(roundResults);

    const data = { ...details, raceData };

    const targetElement = document.createElement("div");
    targetElement.classList.add("full-width");

    targetElement.appendChild(templateToElement(pageHeaderRenderer, data));
    targetElement.appendChild(templateToElement(viewPageRenderer, data));

    await updateCardWithFlag(targetElement, raceData);
    await updateWinnerWithFlag(targetElement, details);

    document
        .querySelector<HTMLDivElement>("#app")!
        .replaceChildren(targetElement);

    document.querySelector("#back-button")?.addEventListener("click", () => {
        renderApp();
    });

    window.scrollTo(0, 0);
};

export const renderCard = async (raceData) => {
    const newCardElement = templateToElement(f1CardRenderer, raceData);

    await updateCardWithFlag(newCardElement, raceData);

    newCardElement.addEventListener("click", async () => {
        await renderViewPage(raceData);
    });
    return newCardElement;
};

export const updateCardWithFlag = async (cardElement, raceData) => {
    const currentCountryCode = await getCurrentCountryCode(
        raceData.Circuit.Location.country
    );
    const countryFlag = await getCountryFlag(currentCountryCode);

    const flagElement = cardElement.querySelector(".flag");

    if (flagElement) {
        !flagElement.appendChild(countryFlag);
    }
};

export const updateWinnerWithFlag = async (targetElement, winnerDetails) => {
    nationalities.registerLocale(english);

    const winnerNationality = winnerDetails.winner.nationality;
    let winnerCountryCode = nationalities.getAlpha2Code(
        winnerNationality,
        "en"
    );

    if (winnerNationality === "Monegasque") {
        winnerCountryCode = "mc";
    }

    const countryFlag = await getCountryFlag(winnerCountryCode.toLowerCase());

    const flagElement = targetElement
        .querySelector(".winner")
        .querySelector(".flag");

    if (flagElement) {
        !flagElement.appendChild(countryFlag);
    }
};

export const renderCardList = async (seasonData: any): Promise<any[]> => {
    const result = await Promise.all(
        seasonData.Races.map(async (raceData) => {
            return await renderCard(raceData);
        })
    );
    return result;
};
