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
<div class="card">
  <div class="header">
      <div  class="skew-background"></div>
      <div class="content"> 
        <div class="round">${round}</div>
        <div  class="dates">${dates}</div>
      </div>
  </div>
  <div class="body">
      <div class="country">
        <div class="flag">${flag}</div>
        <div class="name">${country}</div>
      </div>
      <div class="series">
        <div class="title"><strong>${series}</strong></div>
        <div class="arrow-icon">ARROW</div>
      </div>
  </div>
</div>
    ` as Template;
};

export const viewPageRenderer = (cardData: any): Template => {
    return `
    <div class="view-page">
      <div>${navButtonsRenderer()}</div>
      <div>${f1CardRenderer(cardData)}</div>
      <div>WINNER</div>
      <div>TOP 3 DRIVERS</div>
      <div>FASTEST LAP</div>
    </div>
        ` as Template;
};

export const pageHeaderRenderer = (): Template => {
    return `
    <div class="header">
      
    </div>
        ` as Template;
};

export const navButtonsRenderer = (): Template => {
    return `
    <div class="navbar">
      <button id="back-button">Back</button>
      <button id="next-button">Next Round</button>
    </div>
        ` as Template;
};
