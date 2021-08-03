function LoadMenu(){
  const ui = SpreadsheetApp.getUi();
  const menu = ui.createMenu('The Artist Overseas');
  menu.addItem('Add Employee','LoadAddPage');
  menu.addSeparator();
  menu.addItem('Pay for Employee','LoadPayPage');
  menu.addSeparator();
  menu.addItem('Delete Employee','Delete');
  menu.addToUi();

}

function LoadPayPage(){
  const p = HtmlService.createTemplateFromFile('Pay.html').evaluate();
  const ui = SpreadsheetApp.getUi();
  ui.showSidebar(p);
  
}

function LoadAddPage(){
  const a = HtmlService.createTemplateFromFile('Add.html').evaluate();
  const ui = SpreadsheetApp.getUi();
  ui.showSidebar(a);

}

