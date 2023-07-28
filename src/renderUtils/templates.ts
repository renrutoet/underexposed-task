export type TemplateBrand = { __type: "Template" };
export type Template = string & { __type: "Template" };
export type TemplateData = any & { __type: "TemplateData" };

export type F1TemplateData = {
    round: string;
    dates: string;
    flag: string;
    country: string;
    series: string;
} & TemplateData;

export const convertStringToHTML = (htmlString: string): any => {
    const parser = new DOMParser();
    const html = parser.parseFromString(htmlString, "text/html");

    return html.body.firstChild;
};

export const templateToElement = (
    templateRenderer: (data: TemplateData) => Template,
    data?: TemplateData
): HTMLElement => {
    return convertStringToHTML(templateRenderer(data));
};

export const f1CardRenderer = (
    raceData: F1TemplateData,
    forHomepage: boolean = true
): Template => {
    const { round, date, raceName } = raceData;

    const firstPractiseDate = new Date(
        raceData.FirstPractice.date
    ).toLocaleString("default", { day: "numeric" });
    const day = new Date(date).toLocaleString("default", { day: "numeric" });
    const month = new Date(date).toLocaleString("default", { month: "short" });

    const country = raceData.Circuit.Location.country;

    if (forHomepage) {
        return `
<div class="card font-jakarta">
  <div class="header">
      <div  class="skew-background"></div>
      <div class="content"> 
        <div class="round font-goldman">Round ${round}</div>
        <div  class="dates">${firstPractiseDate}-${day} ${month}</div>
      </div>
  </div>
  <div class="body">
      <div class="country">
        <div class="flag"></div>
        <div class="name">${country}</div>
      </div>
      <div class="series">
        <div class="title font-goldman">${raceName}</div>
        <div class="arrow-icon"><img  src="./arrow-circle.svg" alt="arrow icon"/></div>
      </div>
  </div>
</div>
    ` as Template;
    }
    return `
          <div class="card font-jakarta" id="card--series-view">
            <div class="header">
                <div class="content"> 
                  <div class="round font-goldman">Round ${round}</div>
                  <div  class="dates">${firstPractiseDate}-${day} ${month}</div>
                </div>
            </div>
            <div class="body">
                <div class="country">
                  <div class="flag"></div>
                  <div class="name">${country}</div>
                </div>
                <div class="series">
                  <div class="title font-goldman">${raceName}</div>
                </div>
            </div>
          </div>
    ` as Template;
};

export const viewPageRenderer = (pageData: any): Template => {
    const circuitName = pageData.raceData.Circuit.circuitName;
    const locationParam = encodeURI(circuitName);

    return `
    <div class="view-page font-jakarta">
      <div>${navButtonsRenderer()}</div>
      <div>${f1CardRenderer(pageData.raceData, false)}</div>
      <div class="column">
        <div class="winner">
          <div class="title">WINNER</div>
          <div class="details">
            <div class="flag"></div>
            <div class="name  font-goldman">${pageData.winner.name}</div>
            <div class="laps">${pageData.winner.laps} LAPS</div>
          </div>
        </div>
        <hr>
        <div>
        <div class="top-list">
          <div class="title">TOP 3 DRIVERS</div>
          <ol class="font-goldman">
            <li><span>${pageData.top[0]}</span></li>
            <li><span>${pageData.top[1]}</span></li>
            <li><span>${pageData.top[2]}</span></li>
          </ol>
        </div>
        <hr>
        <div class="fastest-lap">
          <div class="title">FASTEST LAP</div>
          <div class="details">
            <img src="./stopwatch.svg" alt="stopwatch icon" />
            <div class="time">${pageData.lap.time}</div>
            <div class="name font-goldman">${pageData.lap.name}</div>
          </div>
        </div>
        <hr>
        <div>
          <div class="title">Map</div>
          <div class="map__container">
            <iframe
              width="325"
              height="250"
              frameborder="0" style="border-radius:5px; box-shadow:  0px 4px 4px 0px rgba(0, 0, 0, 0.25);"
              src="https://www.google.com/maps/embed/v1/place?q=${locationParam}&key=AIzaSyDTU-Sbv-rp_Jr7uyKiJwH8KRRbxuvWYhM"
              >
            </iframe>
          </div>
        </div>
        </div>
    </div>
        ` as Template;
};

export const pageHeaderRenderer = (seasonYear: string): Template => {
    return `
    <div id="header__container">
      <div class="page__header font-goldman">
        <img src="./f1-logo.svg" alt="formula one logo" />
        <div class="season__container" id="season-button">
          <img class="arrow-icon" src="./arrow-circle.svg" alt="arrow icon"/>
          <div>${seasonYear} SEASON</div>
        </div>
      </div>
      <div class="search__container hidden">
        <input type="text" class="search__input hidden" aria-hidden></input>
        <button class="search__button hidden" aria-hidden>Change Season</button>
      </div>
    </div>
        ` as Template;
};

export const navButtonsRenderer = (): Template => {
    return `
    <div class="navbar">
      <button id="back-button"><img src="./arrow.svg" alt="arrow icon" class="arrow"> BACK </button>
      <button id="next-button"> NEXT ROUND <img src="./arrow.svg" alt="arrow icon" class="arrow right"></button>
    </div>
        ` as Template;
};
