import {
  buttonFeature,
  $,
  AlertAfterClose,
  $$,
  highlightNode,
} from "./Feature/Util.js";
import {
  readData,
  handleClickFeaturesPlace,
  countTimeSaveLocalStorage,
} from "./Feature/FeatureLocalStorage.js";
import { handleRender, renderDataImport } from "./Feature/Render.js";
import {
  handleLeftClickTable,
  selectFeatureHighlight,
  buttonFeatureActive,
} from "./Feature/CellFeature.js";
import {
  handleEditMainContent,
  handleInputCrudTextArea,
  hanlePreRender,
} from "./Feature/TextAreaCrud.js";
import {
  embedProject,
  toggleJSPlaygrounds,
  toggleStackBlitz,
} from "./Feature/ModalPlaygrounds.js";
import {
  arrowFeature,
  handleClickArrowFeature,
} from "./Feature/ArrowFeature.js";
import { hideModalRowDetail } from "./Feature/ModalRowDetail.js";
import {
  onChangeHeadingContent,
  onChangeHeadingMethod,
  renderHeading,
} from "./Feature/renderHeading.js";
import { onChangeReferanceContent } from "./Feature/Referance.js";
const downloadButton = $(".features-localstorage");
const inputFile = $("#reading-file");
const table = $("#table");
const buttonEditmainContent = $(".button-edit-main-content");
const crudTextArea = $$(".crud-group textarea");
const buttonOpenStackBlitz = $(".open-stackblitz");
const buttonOpenJSPlaygrounds = $(".open-javascript-playgrounds");
const arrowFeatureBlock = $(".arrow-features");
const buttonCloseModalRowDetail = $(".button-close-modal-row-detail");
const buttonEditHeadingContent = $(".content-notes .btn-edit");
const buttonEditHeadingMethod = $(".heading-method-group .btn-edit");
const buttonEditReferance = $(".referance-section .btn-edit");

const app = {
  JsonData: { mainContent: "", methodHelper: [] },
  editState: [],
  isFillAllCrudState: false,
  counterId: null,
  handler: function () {
    const _this = this;
    downloadButton.addEventListener("click", (event) => {
      handleClickFeaturesPlace(event, _this);
    });

    table.addEventListener("click", (event) =>
      handleLeftClickTable(event, _this)
    );
    buttonFeature.addEventListener("click", selectFeatureHighlight);
    window.addEventListener("beforeunload", AlertAfterClose);

    inputFile.addEventListener("change", (event) =>
      renderDataImport(event, _this)
    );
    buttonEditmainContent.addEventListener("click", () =>
      handleEditMainContent(_this.JsonData)
    );
    crudTextArea.forEach((item) => {
      item.addEventListener("input", () => handleInputCrudTextArea(_this));
    });
    buttonOpenStackBlitz.addEventListener("click", toggleStackBlitz);
    buttonOpenJSPlaygrounds.addEventListener("click", toggleJSPlaygrounds);
    arrowFeatureBlock.addEventListener("click", handleClickArrowFeature);
    window.onload = embedProject;
    window.onscroll = arrowFeature;
    buttonCloseModalRowDetail.addEventListener("click", hideModalRowDetail);
    buttonEditHeadingContent.addEventListener("click", () =>
      onChangeHeadingContent(_this.JsonData)
    );
    buttonEditHeadingMethod.addEventListener("click", () =>
      onChangeHeadingMethod(_this.JsonData)
    );
    buttonEditReferance.addEventListener("click", () =>
      onChangeReferanceContent(_this.JsonData)
    );
    return this;
  },

  defaultSetting: function (app) {
    buttonFeatureActive.setAttribute("active", true);
    countTimeSaveLocalStorage(app);
    return app;
  },
  firstRender: function () {
    const _this = this;
    this.defaultSetting(_this);
    readData().then((data) => {
      if (data) {
        _this.JsonData = JSON.parse(data);
        hanlePreRender();
        renderHeading(_this.JsonData);
        handleRender(_this.JsonData);
        highlightNode($("body"));
      }
      return _this;
    });
  },

  render: function () {
    hanlePreRender();
    handleRender(this.JsonData);
    highlightNode($("body"));
  },
};

app.handler().firstRender();
