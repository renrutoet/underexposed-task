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
    data: TemplateData
): HTMLElement => {
    return convertStringToHTML(templateRenderer(data));
};

export const f1CardRenderer = ({
    round,
    dates,
    flag,
    country,
    series,
}: F1TemplateData): Template => {
    return `
<div class="card font-jakarta">
  <div class="header">
      <div  class="skew-background"></div>
      <div class="content"> 
        <div class="round font-goldman">${round}</div>
        <div  class="dates">${dates}</div>
      </div>
  </div>
  <div class="body">
      <div class="country">
        <div class="flag">${flag}</div>
        <div class="name">${country}</div>
      </div>
      <div class="series">
        <div class="title font-goldman"><strong>${series}</strong></div>
        <div class="arrow-icon">ARROW</div>
      </div>
  </div>
</div>
    ` as Template;
};

export const viewPageRenderer = (pageData: any): Template => {
    return `
    <div class="view-page font-jakarta">
      <div>${navButtonsRenderer()}</div>
      <div>${f1CardRenderer(pageData.cardData)}</div>
      <div class="column">
        <div class="winner">
          <div class="title">WINNER</div>
          <div class="details">
            <div class="flag">FLAG</div>
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
            <div class="icon">STOP</div>
            <div class="time">${pageData.lap.time}</div>
            <div class="name font-goldman">${pageData.lap.name}</div>
          </div>
        </div>
        <hr>
        </div>
    </div>
        ` as Template;
};

export const pageHeaderRenderer = (): Template => {
    return `
    <div class="page__header font-goldman">
      <div>IMAGE</div>
      <div>2022 SEASON</div>
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
