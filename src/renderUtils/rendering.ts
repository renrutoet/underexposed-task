import {
    Race,
    WinnerDetails,
    getPageDetails,
    getRoundResults,
    getSeasonData,
} from "../apiUtils/f1";
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

export const renderApp = async (seasonYear = "2022"): Promise<void> => {
    const seasonData = await getSeasonData(seasonYear);
    await getFlagCountryCodes();

    const containerElement = document.createElement("div");
    containerElement.classList.add("full-width");

    const headerElement = templateToElement(pageHeaderRenderer, seasonYear);
    containerElement.appendChild(headerElement);

    const cardListContainerElement = document.createElement("div");
    cardListContainerElement.classList.add("card-list__container");

    const cards = await renderCardList(seasonData);
    cards.forEach((card) => {
        cardListContainerElement.appendChild(card);
    });
    containerElement.appendChild(cardListContainerElement);

    updateHeaderFunctionality(containerElement);

    document
        .querySelector<HTMLDivElement>("#app")!
        .replaceChildren(containerElement);
};

const renderViewPage = async (raceData: Race): Promise<void> => {
    const roundResults = await getRoundResults(raceData);

    const details = await getPageDetails(roundResults);

    const data = { ...details, raceData };

    const targetElement = document.createElement("div");
    targetElement.classList.add("full-width");

    const headerElement = templateToElement(
        pageHeaderRenderer,
        raceData.season
    );
    targetElement.appendChild(headerElement);
    targetElement.appendChild(templateToElement(viewPageRenderer, data));

    updateHeaderFunctionality(targetElement);

    await updateCardWithFlag(targetElement, raceData);
    await updateWinnerWithFlag(targetElement, details);

    document
        .querySelector<HTMLDivElement>("#app")!
        .replaceChildren(targetElement);

    document.querySelector("#back-button")?.addEventListener("click", () => {
        renderApp(raceData.season);
    });

    document
        .querySelector("#next-button")
        ?.addEventListener("click", async (): Promise<void> => {
            const seasonData = await getSeasonData(raceData.season);
            const nextRound = seasonData.Races[raceData.round];
            if (nextRound) {
                await renderViewPage(nextRound);
            }
        });

    window.scrollTo(0, 0);
};

export const renderCard = async (raceData: Race) => {
    const newCardElement = templateToElement(f1CardRenderer, raceData);

    await updateCardWithFlag(newCardElement, raceData);

    newCardElement.addEventListener("click", async (): Promise<void> => {
        await renderViewPage(raceData);
    });
    return newCardElement;
};

export const renderCardList = async (seasonData: any): Promise<any[]> => {
    const result = await Promise.all(
        seasonData.Races.map(async (raceData: Race) => {
            return await renderCard(raceData);
        })
    );
    return result;
};

export const updateCardWithFlag = async (
    cardElement: HTMLElement,
    raceData: Race
) => {
    const currentCountryCode = await getCurrentCountryCode(
        raceData.Circuit.Location.country
    );
    const countryFlag =
        currentCountryCode &&
        ((await getCountryFlag(currentCountryCode)) as HTMLElement);

    const flagElement = cardElement.querySelector(".flag");

    if (countryFlag) {
        const hasViewbox = countryFlag?.getAttribute("viewBox");
        if (!hasViewbox) {
            countryFlag?.setAttribute("viewBox", "0 0 900 600");
        }

        if (flagElement) {
            !flagElement.appendChild(countryFlag);
        }
    }
};

export const updateWinnerWithFlag = async (
    targetElement: HTMLElement,
    winnerDetails: WinnerDetails
) => {
    nationalities.registerLocale(english);

    const winnerNationality = winnerDetails.winner.nationality;
    let winnerCountryCode = nationalities.getAlpha2Code(
        winnerNationality,
        "en"
    );

    if (winnerNationality === "Monegasque") {
        winnerCountryCode = "mc";
    }

    const countryFlag = (await getCountryFlag(
        winnerCountryCode.toLowerCase()
    )) as HTMLElement;

    const flagElement = targetElement
        ?.querySelector(".winner")
        ?.querySelector(".flag");

    const hasViewbox = countryFlag?.getAttribute("viewBox");
    if (!hasViewbox && countryFlag) {
        countryFlag?.setAttribute("viewBox", "0 0 900 600");
    }

    if (flagElement) {
        flagElement.appendChild(countryFlag);
    }
};

const updateHeaderFunctionality = (targetElement: HTMLElement) => {
    const seasonButton = targetElement.querySelector("#season-button");
    const search = targetElement.querySelector(".search__container");

    seasonButton?.addEventListener("click", () => {
        search?.classList.toggle("hidden");
        const headerElement = document.querySelector("#header__container");
        const searchInput = headerElement?.querySelector(
            ".search__input"
        ) as HTMLInputElement;
        const searchButton = headerElement?.querySelector(".search__button");

        searchInput?.classList.toggle("hidden");
        searchInput?.toggleAttribute("aria-hidden");

        searchButton?.classList.toggle("hidden");
        searchButton?.toggleAttribute("aria-hidden");

        searchButton?.addEventListener("click", () => {
            renderApp(searchInput?.value);
        });
    });
};
