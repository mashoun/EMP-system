/*******************************Index */

function index(id) {
  //takes the id and return the row number of this ID
  //we have to go to the sheet 'Data'
  //lr - 1 represent the real size of data , because of the headers row
  //will return -1 if id doesnt exist

  var IDS = Data_Sheet.getRange(2,1,lr-1).getValues();
  for(i=0 ; i<IDS.length ; i++){
    if(IDS[i][0] == id)return i+2;
    //we add 1 because ( array index starts from 0 )
    //and we add another 1 because of the header row 
  }
  return -1;
}


/************************* Set data from form to sheet*/

function Add_Data(data){
  //takes data fro  form and set to sheet
  //lr +1 because we want to go to the last row and writes to the next line

  Data_Sheet.getRange(lr+1,1).setValue(data.id);
  Data_Sheet.getRange(lr+1,2).setValue(data.name);
  Data_Sheet.getRange(lr+1,3).setValue(data.cash);
  Data_Sheet.getRange(lr+1,4).setValue(data.com);
  Data_Sheet.getRange(lr+1,5).setValue(data.email);
  Data_Sheet.getRange(lr+1,6).setValue(data.number);

  //set the date of joining the company
  var d = new Date();
  Data_Sheet.getRange(lr+1,7).setValue(d);


}

/************************  */
function set_hours(id){
  //steps :
  //go to the sheet
  //use the formula HOUR(checkout)-HOUR(checkin)
  //set values

  const sheet_name = Data_Sheet.getRange(index(id),2).getValue();
  var emp_sheet = ss.getSheetByName(sheet_name);
  var lr = emp_sheet.getLastRow();

  var formula = '=HOUR( B'+lr+' ) - HOUR( A'+lr+' )';

  //setting the value in third column lr
  emp_sheet.getRange(`C${lr}`).setValue(formula);

}
function set_min(id){
  //steps :
  //use the formula minute(checkout)-minute(checkin)
  //if the value is negative use this formula (60 - minute(checkin) + minute(checkout))
  //go to the sheet
  //set values
  const sheet_name = Data_Sheet.getRange(index(id),2).getValue();
  var emp_sheet = ss.getSheetByName(sheet_name);
  var lr = emp_sheet.getLastRow();

  //must set the iterative settings to use this formula 
  //File->spreadsheet setting -> calculation


  var formula = `=IF(D${lr} < 0 ,(60 - MINUTE(A${lr}) ) + MINUTE(B${lr}), MINUTE( B${lr} ) - MINUTE( A${lr} ))`;

  //setting the value in third column lr
  emp_sheet.getRange(`D${lr}`).setValue(formula);


}
function set_cash(id){
  //steps :
  //use the formula [ net_hours * cash_per_hr ] + [ ( net_munites / 60 )*cash_per_hr ]
  //go to the sheet
  //set values
  const sheet_name = Data_Sheet.getRange(index(id),2).getValue();
  const cash = Data_Sheet.getRange(index(id),3).getValue();
  var emp_sheet = ss.getSheetByName(sheet_name);
  var lr = emp_sheet.getLastRow();
  var formula = `=(C${lr}*${cash})+((D${lr}/60)*${cash})`;

  //setting the value in third column lr
  emp_sheet.getRange(`E${lr}`).setValue(formula);

}

