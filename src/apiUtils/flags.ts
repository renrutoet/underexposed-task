export const getFlagCountryCodes = async () => {
    let flagCodeData = sessionStorage.getItem("flagCodes");
    if (!flagCodeData) {
        try {
            const response = await fetch("https://flagcdn.com/en/codes.json");
            flagCodeData = await response.json();
            if (flagCodeData) {
                sessionStorage.setItem(
                    "flagCodes",
                    JSON.stringify(flagCodeData)
                );
            }
        } catch (e) {
            console.error(e);
        }
        return flagCodeData;
    } else {
        const parsedData = flagCodeData && JSON.parse(flagCodeData);
        return parsedData;
    }
};

export const getCountryFlag = async (countryCode: string) => {
    let flagData = sessionStorage.getItem(`${countryCode}-flag`);

    if (!flagData) {
        try {
            const response = await fetch(
                `https://flagcdn.com/${countryCode}.svg`
            );

            flagData = await response.text();

            if (flagData) {
                sessionStorage.setItem(`${countryCode}-flag`, flagData);
            }
        } catch (e) {
            console.error(e);
        }
    }

    if (flagData) {
        const parsedFlag = new window.DOMParser().parseFromString(
            await flagData,
            "text/xml"
        ).firstChild;

        return parsedFlag;
    }
};

export const getCurrentCountryCode = async (
    currentCountryName: string
): Promise<string | undefined> => {
    const countryCodes = await getFlagCountryCodes();

    const edgeCaseCodes = { ae: "UAE", us: "USA", gb: "UK" };

    const completeCodes = { ...countryCodes, ...edgeCaseCodes };

    let currentCountry = Object.entries(completeCodes).find((key) => {
        return key[1] === currentCountryName;
    });

    if (currentCountry) {
        return currentCountry[0];
    }
};
