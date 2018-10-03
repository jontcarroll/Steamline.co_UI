<form-designer-control-nav>
  <nav class="designerNav { navActive ? 'nav-is-active' : ''}" onclick="{ onNavClick }">
    <ul class="designerNav-list">
      <!-- Static Heading -->
      <!--<li class="designerNav-item">-->
        <!--<button class="designerNav-btn">-->
          <!--<i class="designerNav-icon icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18" enable-background="new 0 0 18 18"><defs><filter id="a" filterUnits="userSpaceOnUse" x="0" y="0" width="18" height="18"><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"></feColorMatrix></filter></defs><mask maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18" id="b"><path fill="#fff" d="M0 0h18v18H0z" filter="url(#a)"></path></mask><path d="M4.4 18v-1.1c1.1 0 1.8-.1 2-.2.2-.1.4-.3.4-.5.1-.3.2-1.5.2-3.3V5.2 2.1H5c-1 0-1.9 0-2.7.1h-.5c-.1.1-.2.2-.2.5-.1.6-.2.9-.2 1.6H.2c0-1.8-.1-2.7-.1-3C.1 1 .1.6 0 .1L.1 0c.5 0 .9.1 1.4.1h15c.4 0 .9 0 1.3-.1l.2.1c-.1.5-.1 1-.2 1.4 0 .1 0 1-.1 2.8h-1.2c0-.7-.1-.9-.2-1.5-.1-.3-.1-.5-.2-.6-.1 0-.2-.1-.4-.1H11v10.8c0 1.9.1 3 .2 3.3.1.2.2.4.4.5.2.1.9.2 2 .2V18c-1.8-.1-3.3-.1-4.6-.1-1.3 0-2.9 0-4.6.1" mask="url(#b)"></path></svg></i>-->
          <!--Static Heading-->
          <!--<i class="designerNav-icon icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12"><path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path></svg></i>-->
        <!--</button>-->
      <!--</li>-->
      <!-- Static Text -->
      <li class="designerNav-item {active === 'staticText' ? 'item-active' : ''}">
        <button class="designerNav-btn" onclick="{ onBtnStaticTextClick }">
          <i class="designerNav-icon icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" enable-background="new 0 0 10 10" width="10" height="10"><defs><filter id="a" filterUnits="userSpaceOnUse" x="0" y="0" width="10" height="10"><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"></feColorMatrix></filter></defs><mask maskUnits="userSpaceOnUse" x="0" y="0" width="10" height="10" id="b"><path fill="#fff" d="M0 0h10v10H0z" filter="url(#a)"></path></mask><path d="M2.5 10v-.6c.6 0 1-.1 1.1-.1.1-.1.2-.2.2-.3.1-.2.1-.8.1-1.9V2.9 1.2H2.8c-.6 0-1.1 0-1.5.1-.2-.1-.3-.1-.3-.1s-.1.1-.1.2c-.1.4-.1.6-.1 1H.1V.7C.1.5.1.3 0 0H9.9l.1.1c0 .3-.1.5-.1.8v1.6h-.7c0-.4 0-.5-.1-.8 0-.2-.1-.3-.1-.3s-.1 0-.2-.1c-.4 0-.9-.1-1.5-.1H6.1v6c0 1 0 1.6.1 1.9 0 .1.1.2.2.3.1.1.5.1 1.1.1v.5c-1 0-1.9-.1-2.5-.1-.7 0-1.6.1-2.5.1" mask="url(#b)"></path></svg></i>
          Static Text
          <i class="designerNav-icon icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12"><path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path></svg></i>
        </button>
      </li>
      <!-- Single Dropdown -->
      <li class="designerNav-item {active === 'dropdown' ? 'item-active' : ''}">
        <button class="designerNav-btn" onclick="{ onBtnChoiceSingleClick }">
          <i class="designerNav-icon icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"><path d="M9 0C4 0 0 4 0 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 13L5 7h8l-4 6z"></path></svg></i>
          Dropdown
          <i class="designerNav-icon icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12"><path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path></svg></i>
        </button>
      </li>
      <!-- Multiple Dropdown -->
      <li class="designerNav-item {active === 'multiple-dropdown' ? 'item-active' : ''}">
        <button class="designerNav-btn" onclick="{ onBtnChoiceMultipleClick }">
          <i class="designerNav-icon icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"><path d="M9 0C4 0 0 4 0 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 13L5 7h8l-4 6z"></path></svg></i>
          Multiple Dropdown
          <i class="designerNav-icon icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12"><path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path></svg></i>
        </button>
      </li>
      <!-- File Upload -->
      <!--<li class="designerNav-item">-->
        <!--<button class="designerNav-btn">-->
          <!--<i class="designerNav-icon icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.8 18" width="14.8" height="18"><path d="M14.8 11.7L7.4 4.3 0 11.7h4.2V18h6.3v-6.3h4.3zM0 2.1h14.8V0H0v2.1z"></path></svg></i>-->
          <!--File Upload-->
          <!--<i class="designerNav-icon icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12"><path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path></svg></i>-->
        <!--</button>-->
      <!--</li>-->
      <!-- Date Picker -->
      <li class="designerNav-item {active === 'date' ? 'item-active' : ''}">
        <button class="designerNav-btn" onclick="{ onBtnDateClick }">
          <i class="designerNav-icon icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.4 18" width="15.4" height="18"><path d="M5.1 8.1H3.4v1.8h1.7V8.1zm3.5 0H6.9v1.8h1.7V8.1zm3.4 0h-1.7v1.8H12V8.1zm1.7-6.3h-.9V0h-1.7v1.8H4.3V0H2.6v1.8h-.9C.8 1.8 0 2.6 0 3.6v12.6c0 1 .8 1.8 1.7 1.8h12c.9 0 1.7-.8 1.7-1.8V3.6c0-1-.7-1.8-1.7-1.8zm0 14.4h-12V6.3h12v9.9z"></path></svg></i>
          Date Picker
          <i class="designerNav-icon icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12"><path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path></svg></i>
        </button>
      </li>
      <!-- Short Text -->
      <li class="designerNav-item {active === 'shortText' ? 'item-active' : ''}">
        <button class="designerNav-btn" onclick="{ onBtnShortTextClick }">
          <i class="designerNav-icon icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 7" width="18" height="7"><path d="M0 0h18v2H0V0zm0 5h11v2H0V5z"></path></svg></i>
          Short Text
          <i class="designerNav-icon icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12"><path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path></svg></i>
        </button>
      </li>
      <!-- Long Text -->
      <li class="designerNav-item {active === 'paragraph' ? 'item-active' : ''}">
        <button class="designerNav-btn" onclick="{ onBtnLongTextClick }">
          <i class="designerNav-icon icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 17" height="18" width="17"><path d="M0 10h18v2H0v-2zm0-5h18v2H0V5zm0-5h18v2H0V0zm0 15h11v2H0v-2z"></path></svg></i>
          Paragraph
          <i class="designerNav-icon icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12"><path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path></svg></i>
        </button>
      </li>
      <!-- Multiple Choice -->
      <li class="designerNav-item {active === 'radio' ? 'item-active' : ''}">
        <button class="designerNav-btn" onclick="{ onBtnChoiceRadioClick }">
          <i class="designerNav-icon icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" height="18" width="18"><path d="M9 18c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9zm0-2c3.9 0 7-3.1 7-7s-3.1-7-7-7-7 3.1-7 7 3.1 7 7 7zm0-2c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"></path></svg></i>
          Multiple Choice
          <i class="designerNav-icon icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12"><path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path></svg></i>
        </button>
      </li>
      <!-- Checkboxes -->
      <li class="designerNav-item {active === 'checkbox' ? 'item-active' : ''}">
        <button class="designerNav-btn" onclick="{ onBtnChoiceCheckboxClick }">
          <i class="designerNav-icon icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"><path d="M1.1 0h15.8c.6 0 1.1.5 1.1 1.1v15.8c0 .6-.5 1.1-1.1 1.1H1.1C.5 18 0 17.5 0 16.9V1.1C0 .5.5 0 1.1 0z"></path><path fill="#fff" d="M7.4 12.7l-4-3.9 1.1-1.2 2.9 2.9 6.1-6 1.1 1.1z"></path></svg></i>
          Checkboxes
          <i class="designerNav-icon icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12"><path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path></svg></i>
        </button>
      </li>
      <!-- File Upload -->
      <li class="designerNav-item {active === 'file' ? 'item-active' : ''}">
        <button class="designerNav-btn" onclick="{ onBtnFileClick }">
          <i class="designerNav-icon icon"><svg width="14px" height="17px" viewBox="0 0 14 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs></defs>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="file-upload" transform="translate(-5.000000, -3.000000)">
                <polygon id="Shape" points="0 0 24 0 24 24 0 24"></polygon>
                <path d="M9,16 L15,16 L15,10 L19,10 L12,3 L5,10 L9,10 L9,16 Z M5,18 L19,18 L19,20 L5,20 L5,18 Z" id="Shape" fill="#000000" fill-rule="nonzero"></path>
              </g>
            </g>
          </svg></i>
          File Upload
          <i class="designerNav-icon icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12"><path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path></svg></i>
        </button>
      </li>
      <!-- Asset Selector -->
      <li class="designerNav-item {active === 'asset' ? 'item-active' : ''}">
        <button class="designerNav-btn" onclick="{ onBtnAssetClick }">
          <i class="designerNav-icon icon"><svg width="19px" height="19px" viewBox="0 0 19 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
              <polygon id="path-1" points="0 0.0950598266 18.9155165 0.0950598266 18.9155165 18.9999895 0 18.9999895"></polygon>
            </defs>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="assets">
                <mask id="mask-2" fill="white">
                  <use xlink:href="#path-1"></use>
                </mask>
                <g id="path-1"></g>
                <path d="M17.2857906,17.4040945 L17.2857906,8.01851436 L15.7458459,8.01851436 C15.7458459,10.3119508 15.7467906,12.564763 15.745321,14.8175751 C15.7447961,15.6228182 15.5220448,15.8492436 14.7264591,15.8499785 C12.6299508,15.851868 10.5334425,15.8506083 8.43693425,15.8506083 L7.9032547,15.8506083 L7.9032547,17.4040945 L17.2857906,17.4040945 Z M12.5966746,4.85086796 C12.5966746,7.16330442 12.5976193,9.41611657 12.5961497,11.6689287 C12.5956249,12.4737519 12.3726635,12.7000724 11.576658,12.7008072 C9.4802547,12.7026967 7.38374641,12.701437 5.28723812,12.701437 L4.75429337,12.701437 L4.75429337,14.2431663 L14.1364094,14.2431663 L14.1364094,4.85086796 L12.5966746,4.85086796 Z M1.59808895,11.0896912 L10.9804149,11.0896912 L10.9804149,1.70715525 L1.59808895,1.70715525 L1.59808895,11.0896912 Z M-1.04972376e-05,12.1767851 L-1.04972376e-05,0.629823757 C0.279216022,0.21591768 0.664359669,0.0926801105 1.16171878,0.0950944751 C4.6249674,0.112204972 8.08832099,0.103597238 11.5516746,0.104646961 C12.3391773,0.104961878 12.5918459,0.353221547 12.5958348,1.13022707 C12.5994039,1.8239895 12.5966746,2.51775193 12.5966746,3.2539232 C13.351321,3.2539232 14.0471829,3.25182376 14.7431497,3.25444807 C15.4835199,3.25707238 15.7405972,3.51656409 15.7449011,4.26932099 C15.7488901,4.96402818 15.7458459,5.65884033 15.7458459,6.33181823 C15.8278293,6.36761381 15.8580613,6.39228232 15.8886083,6.39249227 C16.5182326,6.39763591 17.1477519,6.40078508 17.7772713,6.40277956 C18.6575696,6.40561381 18.9063541,6.64684033 18.9065641,7.51475193 C18.9079287,10.9781055 18.8998459,14.4414591 18.9154867,17.9048127 C18.9176912,18.3887354 18.7979177,18.7569785 18.3701552,18.9999895 L6.82319392,18.9999895 C6.41012762,18.7454315 6.26631547,18.3808624 6.29003923,17.896205 C6.32300055,17.2243818 6.29833204,16.5496193 6.29833204,15.8505033 C5.52699503,15.8505033 4.83008343,15.8552271 4.13338177,15.8491387 C3.41893978,15.8431552 3.15346464,15.5766304 3.15000055,14.8696414 C3.14643149,14.1599232 3.14926575,13.4501 3.14926575,12.701437 C2.40952541,12.701437 1.73108895,12.6834867 1.05422707,12.7076304 C0.590459116,12.724111 0.238801657,12.5775696 -1.04972376e-05,12.1767851 Z" id="Fill-1" fill="#333333" fill-rule="nonzero" mask="url(#mask-2)"></path>
              </g>
            </g>
          </svg></i>
          Asset Selector
          <i class="designerNav-icon icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12"><path d="M8 6L1.6 0 0 1.5 4.8 6 0 10.5 1.6 12 8 6z"></path></svg></i>
        </button>
      </li>
    </ul>
  </nav>

  <style>
    :scope {
      display: block;
    }
  </style>

  <script type="es6">

    this.app = opts.app;
    this.control = opts.control;
    this.activeType = this.control.type;
    this.activeSubType = this.control.subType;
    this.sectionid = opts.sectionid;
    this.active = '';
    this.navActive = false;

    if (this.activeType === 'static') {
      if (this.activeSubType === 'text') {
        this.active = 'staticText';
      }
    }
    else if (this.activeType === 'choice') {
      if (this.activeSubType === 'radio') {
        this.active = 'radio';
      }
      else if (this.activeSubType === 'checkbox') {
        this.active = 'checkbox';
      }
      else if (this.activeSubType === 'single') {
        this.active = 'dropdown';
      }
      else if (this.activeSubType === 'multiple') {
        this.active = 'multiple-dropdown';
      }
    }
    else if (this.activeType === 'text') {
      if (this.activeSubType === 'single') {
        this.active = 'shortText';
      }
      else if (this.activeSubType === 'area') {
        this.active = 'paragraph';
      }
    }
    else if (this.activeType === 'date') {
      if (this.activeSubType === 'single') {
        this.active = 'date';
      }
      else if (this.activeSubType === 'range') {
        this.active = 'date';
      }
    }
    else if (this.activeType === 'file') {
      if (this.activeSubType === 'single') {
        this.active = 'file';
      }
    }
    else if (this.activeType === 'asset') {
      if (this.activeSubType === 'multiple') {
        this.active = 'asset';
      }
    }

    this.onGlobalClick = (e) => {
      const path = utils.GetComposedPath(e.target);
      // If the click happened outside of this tag, then toggle edit mode
      if (path.indexOf(this.root) < 0) {
        this.setNavActive(false);
        utils.stopEvent(e);
      }
    };

    this.onNavClick = (e) => {
      this.setNavActive(true);
    };

    /**
     * Used to turn the nav on/off and set/unset the global click event handler.
     * @param isActive
     */
    this.setNavActive = (isActive) => {
      this.navActive = isActive;

      if (!utils.isNullOrUndefined(this.parent)) {
        this.parent.isNavActive = this.navActive;
      }

      // enable/disable the global click event
      if (this.navActive) {
        window.addEventListener('click', this.onGlobalClick, true);
      }
      else {
        window.removeEventListener('click', this.onGlobalClick, true);
      }

      this.update();
    };

    this.onBtnStaticTextClick = (e) => {
      // We only care about click events if the nav is active
      if (!this.navActive) {
        return;
      }
      utils.stopEvent(e);

      // if this is already the current type, then just close the nav and do nothing else.
      if (this.active === 'staticText') {
        this.setNavActive(false);
        return;
      }

      // otherwise, change the nav
      this.app.changeControlType(this.sectionid, this.control.id, 'static', 'text');
    };

    this.onBtnChoiceSingleClick = (e) => {
      // We only care about click events if the nav is active
      if (!this.navActive) {
        return;
      }
      utils.stopEvent(e);

      // if this is already the current type, then just close the nav and do nothing else.
      if (this.active === 'dropdown') {
        this.setNavActive(false);
        return;
      }

      // otherwise, change the nav
      this.app.changeControlType(this.sectionid, this.control.id, 'choice', 'single');
    };

    this.onBtnChoiceMultipleClick = (e) => {
      // We only care about click events if the nav is active
      if (!this.navActive) {
        return;
      }
      utils.stopEvent(e);

      // if this is already the current type, then just close the nav and do nothing else.
      if (this.active === 'multiple-dropdown') {
        this.setNavActive(false);
        return;
      }

      // otherwise, change the nav
      this.app.changeControlType(this.sectionid, this.control.id, 'choice', 'multiple');
    };

    this.onBtnDateClick = (e) => {
      // We only care about click events if the nav is active
      if (!this.navActive) {
        return;
      }
      utils.stopEvent(e);

      // if this is already the current type, then just close the nav and do nothing else.
      if (this.active === 'date') {
        this.setNavActive(false);
        return;
      }

      // otherwise, change the nav
      this.app.changeControlType(this.sectionid, this.control.id, 'date', 'single');
    };

    this.onBtnShortTextClick = (e) => {
      // We only care about click events if the nav is active
      if (!this.navActive) {
        return;
      }
      utils.stopEvent(e);

      // if this is already the current type, then just close the nav and do nothing else.
      if (this.active === 'shortText') {
        this.setNavActive(false);
        return;
      }

      // otherwise, change the nav
      this.app.changeControlType(this.sectionid, this.control.id, 'text', 'single');
    };

    this.onBtnLongTextClick = (e) => {
      // We only care about click events if the nav is active
      if (!this.navActive) {
        return;
      }
      utils.stopEvent(e);

      // if this is already the current type, then just close the nav and do nothing else.
      if (this.active === 'paragraph') {
        this.setNavActive(false);
        return;
      }

      // otherwise, change the nav
      this.app.changeControlType(this.sectionid, this.control.id, 'text', 'area');
    };

    this.onBtnChoiceRadioClick = (e) => {
      // We only care about click events if the nav is active
      if (!this.navActive) {
        return;
      }
      utils.stopEvent(e);

      // if this is already the current type, then just close the nav and do nothing else.
      if (this.active === 'radio') {
        this.setNavActive(false);
        return;
      }

      // otherwise, change the nav
      this.app.changeControlType(this.sectionid, this.control.id, 'choice', 'radio');
    };

    this.onBtnChoiceCheckboxClick = (e) => {
      // We only care about click events if the nav is active
      if (!this.navActive) {
        return;
      }
      utils.stopEvent(e);

      // if this is already the current type, then just close the nav and do nothing else.
      if (this.active === 'checkbox') {
        this.setNavActive(false);
        return;
      }

      // otherwise, change the nav
      this.app.changeControlType(this.sectionid, this.control.id, 'choice', 'checkbox');
    };

    this.onBtnFileClick = (e) => {
      // We only care about click events if the nav is active
      if (!this.navActive) {
        return;
      }
      utils.stopEvent(e);

      // if this is already the current type, then just close the nav and do nothing else.
      if (this.active === 'file') {
        this.setNavActive(false);
        return;
      }

      // otherwise, change the nav
      this.app.changeControlType(this.sectionid, this.control.id, 'file', 'single');
    };

    this.onBtnAssetClick = (e) => {
      // We only care about click events if the nav is active
      if (!this.navActive) {
        return;
      }
      utils.stopEvent(e);

      // if this is already the current type, then just close the nav and do nothing else.
      if (this.active === 'asset') {
        this.setNavActive(false);
        return;
      }

      // otherwise, change the nav
      this.app.changeControlType(this.sectionid, this.control.id, 'asset', 'multiple');
    };

  </script>

</form-designer-control-nav>