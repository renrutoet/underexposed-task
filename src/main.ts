import "./style.css";
import "./styles/card.css";
import "@fontsource/goldman";
import "@fontsource-variable/plus-jakarta-sans";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <div class="card">
      <!-- HEADER -->
      <div class="header">
          <div  class="header__skew"></div>

          <div class="header__content"> 
            <div class="header__round">Round 1</div>
            <div  class="header__dates">25-27 MAR</div>
          </div>
      </div>
      <div class="card__body">
          <!-- COUNTRY  -->
          <div class="card__body__country__container">
            <div class="card__body__country__flag">FLAG</div>
            <div class="card__body__country__name">SAUDI ARABIA</div>
          </div>
          <div class="card__body__series__container">
          <div class="card__body__series__title"><strong>STC SAUDI ARABIAN GRAND PRIX 2022</strong></div>
          <div class="">ARROW</div>
          </div>
      </div>
    </div>
  </div>
`;
