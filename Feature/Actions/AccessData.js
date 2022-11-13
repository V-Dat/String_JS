export function getRowDataFromDB(app) {
  const rowData = app.DB.dataTable.dataTableBody.find((_, index) => {
    return +index === +app.activeRow;
  });
  const result = rowData.filter((item) => item.show.includes("home"));
  return result;
}

export function getRowDataFromActiveRow(app) {
  const result = app.DB.dataTable.dataTableBody.find((_, index) => {
    return +index === +app.activeRow;
  });

  return result;
}

export function getRowDataPrevious(app) {
  const rowData = app.DB.dataTable.dataTableBody.find((_, index) => {
    return +index === +app.previousActiveRow;
  });
  const result = rowData.filter((item) => item.show.includes("home"));
  return result;
}

export function setActiveRow(app, index) {
  app.activeRow = index;
}

export function findNoteObject(app) {
  const result = getRowDataFromActiveRow(app);
  const noteObject = result.findLast((item, index) => {
    return item.name === "note";
  });
  if (noteObject) {
    return noteObject;
  } else {
    const newLength = result.push({
      name: "note",
      data: "",
      index: result.length,
      show: ["detail"],
    });
    return result[newLength - 1];
  }
}

export function getRowDataShowInDetail(app) {
  const rowData = getRowDataFromActiveRow(app);
  const result = rowData.filter((item) => item.show.includes("detail"));
  return result;
}
