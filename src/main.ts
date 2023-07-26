import "./style.css";
import "./styles/card.css";
import "@fontsource/goldman";
import "@fontsource-variable/plus-jakarta-sans";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <div class="card">
      <div class="header">
          <div  class="skew-background"></div>
          <div class="content"> 
            <div class="round">Round 1</div>
            <div  class="dates">25-27 MAR</div>
          </div>
      </div>
      <div class="body">
          <div class="country">
            <div class="flag">FLAG</div>
            <div class="name">SAUDI ARABIA</div>
          </div>
          <div class="series">
            <div class="title"><strong>STC SAUDI ARABIAN GRAND PRIX 2022</strong></div>
            <div class="arrow-icon">ARROW</div>
          </div>
      </div>
    </div>
  </div>
`;
