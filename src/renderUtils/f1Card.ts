export interface F1CardProps {
    round: string;
    dates: string;
    flag: string;
    country: string;
    series: string;
}

export const f1Card = ({
    round,
    dates,
    flag,
    country,
    series,
}: F1CardProps): string => {
    return `
<div>
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
</div>
`;
};

export const renderCardList = (dataArr: F1CardProps[]): string => {
    return dataArr
        .map((cardData) => {
            return f1Card(cardData);
        })
        .join(" ");
};
