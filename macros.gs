function New_Template(name) {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('A1:H1').activate();
  spreadsheet.insertSheet(2);
  spreadsheet.getRange('Template!A1:H1').copyTo(spreadsheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);
  spreadsheet.getRange('A:A').activate();
  spreadsheet.getActiveSheet().setColumnWidth(1, 300);
  spreadsheet.getRange('B:B').activate();
  spreadsheet.getActiveSheet().setColumnWidth(2, 300);
  spreadsheet.getRange('C:C').activate();
  spreadsheet.getActiveSheet().setColumnWidth(3, 140);
  spreadsheet.getRange('D:D').activate();
  spreadsheet.getActiveSheet().setColumnWidth(4, 140);
  spreadsheet.getRange('E:E').activate();
  spreadsheet.getActiveSheet().setColumnWidth(5, 140);
  spreadsheet.getRange('F:F').activate();
  spreadsheet.getActiveSheet().setColumnWidth(6, 300);
  spreadsheet.getRange('G:G').activate();
  spreadsheet.getActiveSheet().setColumnWidth(7, 140);
  spreadsheet.getRange('H:H').activate();
  spreadsheet.getActiveSheet().setColumnWidth(8, 150);
  spreadsheet.getRange('A:A').activate();
  spreadsheet.getActiveRangeList().setNumberFormat('dddd", "d" "mmmm" "yyyy", "hh":"mm":"ss');
  spreadsheet.getRange('B:B').activate();
  spreadsheet.getActiveRangeList().setNumberFormat('dddd", "d" "mmmm" "yyyy", "hh":"mm":"ss');
  spreadsheet.getRange('E:E').activate();
  spreadsheet.getActiveRangeList().setNumberFormat('#,##0[$LL]');
  spreadsheet.getRange('F:F').activate();
  spreadsheet.getActiveRangeList().setNumberFormat('dddd", "d" "mmmm" "yyyy", "hh":"mm":"ss');
  spreadsheet.getRange('G:G').activate();
  spreadsheet.getActiveRangeList().setNumberFormat('#,##0[$LL]');
  spreadsheet.getRange('A1').activate();
  spreadsheet.getActiveSheet().setName(name);
};



function center() {
  var spreadsheet = SpreadsheetApp.getActive();
  var sheet = spreadsheet.getActiveSheet();
  sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).activate();
  spreadsheet.setCurrentCell(spreadsheet.getRange('B1'));
  spreadsheet.getActiveRangeList().setHorizontalAlignment('center')
  .setVerticalAlignment('middle');
};

function hide() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('D10').activate();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('my yara'), true);
  spreadsheet.getActiveSheet().hideSheet();
};
