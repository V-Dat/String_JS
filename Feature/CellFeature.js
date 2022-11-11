import { getRowData } from "./ModalRowDetail.js";
import {
  handleSaveRecord,
  handleClickEraser,
  handleSaveAfterEdit,
  handleResetInput,
  handleEditRow,
  handleClickUndo,
  handleClickViewRow,
} from "./TextAreaCrud.js";
import {
  BUTTON_FEATURE,
  buttonFeature,
  unActiveButtonEraserNewNode,
  unActiveButtonCreate,
  highlightNode,
  $,
} from "./Util.js";
export let buttonFeatureActive = BUTTON_FEATURE.ERASER;

export function handleLeftClickTable(event, app) {
  const target = event.target;
  const isClickOnCell = checkIsClickOnCell(target);
  if (isClickOnCell) {
    // 1 click on cell
    return handleClickOnCell(event, app);
  }

  const node = target.closest("img"); // img as a button
  const rowNode = node.closest("tr");
  const isHeaderFeature = checkIsHeaderFeature(rowNode);
  if (isHeaderFeature) {
    //2. click on header button feature
    handleClickHeaderFeature(target, rowNode, app);
  } else {
    //3. click on row button feature
    handleClickRowFeature(rowNode, app, target);
  }
}

function handleClickOnCell(event, app) {
  const highlighttNode = getNodeForHighlight(event);
  const targetNode = event.target;
  if (!highlighttNode) return;
  const isHighlight = checkIsHighlight(targetNode);

  if (
    (isHighlight && (event.shiftKey || event.altKey || event.ctrlKey)) ||
    buttonFeatureActive === BUTTON_FEATURE.ERASER
  ) {
    removeHighlight(highlighttNode, app);
  } else {
    processHighlightRow(highlighttNode, app);
  }
}

function processGetRowNode(event) {
  const rowNode = event.target.closest("tr");
  if (!rowNode) return;
  return rowNode;
}
function processGetCellNode(event) {
  const rowNodeBody = event.target.closest("td");
  const rowNodeHeader = event.target.closest("th");
  if (rowNodeBody) return rowNodeBody;
  if (rowNodeHeader) return rowNodeHeader;
  return;
}
function removeHighlight(targetNode) {
  if (buttonFeatureActive === BUTTON_FEATURE.ROW) {
    for (const cell of targetNode.children) {
      cell.style.backgroundColor = "";
    }
  } else {
    targetNode.style.backgroundColor = "";
  }
}
function processHighlightRow(targetNode, app) {
  const backgroundColor = highlightRow();
  const rowData = getRowData(app);

  if (targetNode.nodeName === "TR") {
    for (const cell of targetNode.children) {
      cell.style.backgroundColor = backgroundColor;
      saveStyleToJsonData(cell, rowData, backgroundColor);
    }
  } else {
    targetNode.style.backgroundColor = backgroundColor;
    saveStyleToJsonData(targetNode, rowData, backgroundColor);
  }
}
function getNodeForHighlight(event) {
  if (buttonFeatureActive === BUTTON_FEATURE.ROW) {
    return processGetRowNode(event);
  } else if (
    buttonFeatureActive === BUTTON_FEATURE.CELL ||
    buttonFeatureActive === BUTTON_FEATURE.ERASER
  ) {
    return processGetCellNode(event);
  }
}

// Footer Feature ========================================================================

export function selectFeatureHighlight(event) {
  const activeButton = event.target.closest(".button-feature");
  if (!activeButton) return;
  for (const btn of buttonFeature.children) {
    btn.removeAttribute("active");
  }
  activeButton.setAttribute("active", true);
  buttonFeatureActive = activeButton;
}

// =======================================================================================

export function getButtonEdit(row) {
  return `<td data-index=${
    row.index
  }  data-column-name="column-6" class="cell column-6 button-actions"  data-key="actions"  style="background-color:${
    row["column-6-bg"] || "color"
  }" >
         <img key=${
           row.index
         } title="Save" class="save" src="./Assets/Icons/create-unactive-icon.svg" width="28px" height="28px"></img>
         <img key=${
           row.index
         } title="Edit" class="edit active" src="./Assets/Icons/edit-active-icon.svg" width="28px" height="28px" ></img>
         <img key=${
           row.index
         } title="Eraser" class="eraser" src="./Assets/Icons/delete-icon.svg" width="28px" height="28px"></img> 
         <img key=${
           row.index
         } title="Undo" class="undo" src="./Assets/Icons/undo-unactive-icon.svg" width="28px" height="28px" ></img> 
         <img key=${
           row.index
         } title="View Detail" class="view-detail" src="./Assets/Icons/view-detail-icon.svg" width="28px" height="28px" ></img> 
      </td>`;
}

function highlightRow() {
  return "hsl(" + 360 * Math.random() + ",50%,50%)";
}

function checkIsHighlight(targetNode) {
  return targetNode.style.backgroundColor !== "";
}

function checkIsHeaderFeature(rowNode) {
  return rowNode.classList.contains("crud-group");
}
function checkIsClickOnCell(target) {
  const node = target.closest("img");
  return !node;
}
function handleClickHeaderFeature(node, rowNode, app) {
  if (
    node.getAttribute("key") === "new-record" &&
    node.getAttribute("type") === "save"
  ) {
    handleSaveRecord(rowNode, app);
  } else if (
    node.getAttribute("key") === "new-record" &&
    node.getAttribute("type") === "clear"
  ) {
    unActiveButtonEraserNewNode(rowNode);
    unActiveButtonCreate(rowNode);
    handleResetInput();
  }
}

function handleClickRowFeature(rowNode, app, node) {
  const className = node.getAttribute("class");
  if (!className && !Number(node.getAttribute("key")) >= 0) return;

  if (className.includes("save")) {
    handleSaveAfterEdit(rowNode, app);
    highlightNode($("body"));
  } else if (className.includes("eraser")) {
    handleClickEraser(rowNode, app);
  } else if (className.includes("edit")) {
    handleEditRow(rowNode, app);
  } else if (className.includes("undo")) {
    handleClickUndo(rowNode, app);
  } else if (className.includes("view-detail")) {
    handleClickViewRow(rowNode, app);
  }
}

function saveStyleToJsonData(node, rowData, backgroundColor) {
  const key = node.dataset["columnName"];
  rowData[key + "-bg"] = backgroundColor;
}
