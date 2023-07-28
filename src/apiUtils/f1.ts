export interface F1Response {
    MRData: {
        RaceTable: RaceTable;
    };
}

export interface RaceTable {
    season: string;
    Races: Race[];
}

export interface RaceResultsTable {
    season: string;
    round: string;
    Races: RaceResults[];
}

export interface Race {
    season: string;
    round: string;
    raceName: string;
    Circuit: {
        circuitName: string;
        Location: {
            country: string;
        };
    };
    date: string;
    FirstPractise: {
        date: string;
        time: string;
    };
}

export interface RaceResults extends Race {
    Results: {
        number: string;
        postition: string;
        Driver: {
            givenName: string;
            familyName: string;
            nationality: string;
        };
        laps: string;
        FastestLap: {
            rank: string;
            Time: {
                time: string;
            };
        };
    }[];
}

export interface WinnerDetails {
    winner: {
        name: string;
        laps: string;
        nationality: string;
    };
    top: string[];
    lap: { time: string | undefined; name: string };
}

export const getSeasonData = async (seasonYear = "2022") => {
    let seasonData = sessionStorage.getItem(`season-${seasonYear}`);

    if (!seasonData) {
        const response = await fetch(
            `http://ergast.com/api/f1/${seasonYear}.json`
        );
        const data = await response.json();

        seasonData = data.MRData.RaceTable;
        sessionStorage.setItem(
            `season-${seasonYear}`,
            JSON.stringify(seasonData)
        );

        return seasonData;
    } else {
        const parsedData = seasonData && JSON.parse(seasonData);
        return parsedData;
    }
};

export const getRoundResults = async (raceData: Race) => {
    const sessionKey = `${raceData.season}-round-${raceData.round}`;
    let roundData = sessionStorage.getItem(sessionKey);

    if (!roundData) {
        const response = await fetch(
            `http://ergast.com/api/f1/${raceData.season}/${raceData.round}/results.json`
        );
        const data = await response.json();

        roundData = data.MRData.RaceTable;
        sessionStorage.setItem(sessionKey, JSON.stringify(roundData));

        return roundData;
    } else {
        const parsedData = roundData && JSON.parse(roundData);
        return parsedData;
    }
};

export const getFastestLapTime = async (roundResults: RaceResultsTable) => {
    const sessionKey = `${roundResults.season}-round-${roundResults.round}-fastest-time`;
    let roundData = sessionStorage.getItem(sessionKey);

    if (!roundData) {
        const response = await fetch(
            `http://ergast.com/api/f1/${roundResults.season}/${roundResults.round}/fastest/1/results.json`
        );
        const data = await response.json();

        const fastestResult = data.MRData.RaceTable.Races[0].Results[0];
        sessionStorage.setItem(sessionKey, JSON.stringify(fastestResult));

        return fastestResult;
    } else {
        const parsedData = roundData && JSON.parse(roundData);
        return parsedData;
    }
};

export const getPageDetails = async (
    roundResults: RaceResultsTable
): Promise<WinnerDetails> => {
    const top3Results = roundResults.Races[0].Results.slice(0, 3);

    const top3Copy = [...top3Results];

    const topNames = top3Copy.map((driver) => {
        return `${driver.Driver.givenName} ${driver.Driver.familyName}`;
    });

    let fastestResult = top3Results.find((result: any) => {
        return result.FastestLap.rank === "1";
    });

    if (!fastestResult) {
        fastestResult = await getFastestLapTime(roundResults);
    }

    const fastestTime = fastestResult?.FastestLap?.Time?.time;
    const fastestDriver = fastestResult?.Driver;
    const fastestName = `${fastestDriver?.givenName} ${fastestDriver?.familyName}`;

    return {
        winner: {
            name: topNames[0],
            laps: top3Results[0].laps,
            nationality: top3Results[0].Driver.nationality,
        },
        top: topNames,
        lap: { time: fastestTime, name: fastestName },
    };
};
