 /************************ G L O B A L S ****************** */
 //The Sheet Must be exactly as it look in the video
 const ID = '1_BA6xrKmR3Rogg-84GwszU12-AQC-GpboKSzh2IckLc';
 const companyName = 'The Artist Overseas';
 const currency = ' LBP ';
 const ss =SpreadsheetApp.openById(ID);
 const Data_Sheet= ss.getSheetByName('Data');
 const lr = Data_Sheet.getLastRow();

 function doGet(){
   return HtmlService.createTemplateFromFile('WEB').evaluate();
 }
/***************************  A D D   *********************************** **** */

function ADD_EMP(data) {
  //function that accept Admin input to enter the employee data via html page
  //step 2 : Create template
  //step 3 : Set Data
  //step 4 : send profile to employee via email
  const ui = SpreadsheetApp.getUi();
  New_Template(data.name);
  Add_Data(data);
  //sending profile to the new employee

  //put the date of joining the company
  //var date = new Date;
  //Data_Sheet.getRange(index(data.id),7).setValue(date);

  //sending confirmation email
  //if(MailApp.getRemainingDailyQuota){
    //if there is enough emails to send
    var message = `
    ID : ${data.id}
    name : ${data.name}
    Cash per hour : ${data.cash} ${currency}
    Commesion % : ${data.com}
    Email : ${data.email}
    Number : ${data.number}
    `;
    var title = 'WELCOME from the Artis7.com'
    Logger.log(message);
    MailApp.sendEmail(data.email,title,message);
  //}else ui.alert('Reached max nb of daily email try after 24 hr');
  
}
/******************************  Check IN    **************************** */

function Check_IN(id){
  //must check if ID exist
  if(index(id)){
    //if index returned a positive value mean id exist so i must continue my code here !
    //we must go to the sheet now

    const sheet_name = Data_Sheet.getRange(index(id),2).getValue();

    var emp_sheet = ss.getSheetByName(sheet_name);
    var lr = emp_sheet.getLastRow();

    //now creat the Date 
    const date = new Date;

    //put the date into the empolyee sheet 
    //so easy !

    emp_sheet.getRange(lr+1,1).setValue(date);//+1 because we want to put new record 
    //we dont want to over write on the same line or row 
    return 1;

  }else{
    //id not fount must alert that in html 
    return -1;
  }
  //it takes the ID and make a check in
  //will go to the sheet of employee
  //creat date variable
  //set to the sheet

  
}

/******************************* Check OUT ************************************ */

function Check_Out(id){
  //must check if user exist
  //must check if user has checked IN first
  //use set hr - min - cash
  //return -1 if failure

  //some useful variables 
  const sheet_name = Data_Sheet.getRange(index(id),2).getValue();
  var emp_sheet = ss.getSheetByName(sheet_name);
  var lr = emp_sheet.getLastRow();


  if(index(id)){
    //okay here ID exist but we have to make sure if user has check IN first
    if(emp_sheet.getRange(lr,1).getValue() != ''){
      //here user has checked in 
      
      //put the check out date in sheet
      var date = new Date ;
      emp_sheet.getRange(lr,2).setValue(date);


      //now what are u waiting, go and use those setters !
      set_hours(id);
      set_min(id);
      set_cash(id);

      //it seems that we did it so return some positive true value !
      return 1;
    }else{
      return 0;//means not checked in
    }
  }else{
    return -1;//user not found
  }

}


/*********************** Payments ******************************* */

function Pay3(data){
  //will be stored in daily cash 
  //will make a check in
  //colored in blue
  //email confirm

  var ui = SpreadsheetApp.getUi();
  var sheet_name = Data_Sheet.getRange(index(data.id),2).getValue();
  var emp_sheet = ss.getSheetByName(sheet_name);
  var lr = emp_sheet.getLastRow();


  var date = new Date;

  emp_sheet.getRange(`E${lr+1}`).setValue(data.cash);
  emp_sheet.getRange(`E${lr+1}`).setBackground('#b8d3ff');
  emp_sheet.getRange(`A${lr+1}`).setValue(date);
  emp_sheet.getRange(`A${lr+1}`).setBackground('#b8d3ff');
  //#cecece

  var title = `Cash Payments from Artis7.me`;
  var email = Data_Sheet.getRange(index(data.id),5).getValue();
  var message =`
  You got ${data.cash} ${currency}
  `;
  MailApp.sendEmail(email,title,message);



}

function Pay2(data){
  //commesion mode
  //use data.id
  //go to emp sheet .
  //calculate com 
  //new date
  //set data
  //send email
  var ui = SpreadsheetApp.getUi();
  var sheet_name = Data_Sheet.getRange(index(data.id),2).getValue();
  var emp_sheet = ss.getSheetByName(sheet_name);
  var lr = emp_sheet.getLastRow();

  var payments =((data.icash * parseInt( Data_Sheet.getRange(`D${index(data.id)}`).getValue()))/100);

  var date = new Date;
  

  emp_sheet.getRange(`F${lr+1}`).setValue(date).setBackground('#cecece');
  emp_sheet.getRange(`G${lr+1}`).setValue(payments).setBackground('#cecece');
  emp_sheet.getRange(`H${lr+1}`).setValue(data.client).setBackground('#cecece');
  
  center();

  var res = ui.alert(`Payments = ${payments} ${currency}\n\nConfirm ??`,ui.ButtonSet.OK_CANCEL);

  if(res == ui.Button.OK){
    //send message
    var title = `Commesion Payments from Artis7.com`
    var message = `
    You Got ${payments} ${currency} from ${companyName}
    `;
    var email = Data_Sheet.getRange(`E${index(data.id)}`).getValue();
    if(MailApp.getRemainingDailyQuota){
      MailApp.sendEmail(email,title,message);
    }else {
      ui.alert('Reached max email try after 24 hour'); 
    }
  }
}


function Pay1(data){

  //daily mode
  //use data.id
  //go to sheet
  //get the cash values in an array
  //calculate salary
  //scratch effect
  //email confirm

  var ui = SpreadsheetApp.getUi();

  

  var sheet_name = Data_Sheet.getRange(index(data.id),2).getValue();
  var emp_sheet = ss.getSheetByName(sheet_name);

  var size = (data.till - data.fromm +1);
  var cash = emp_sheet.getRange(data.fromm,5,size).getValues();

  var salary = 0;
  for( i =0 ; i<cash.length ; i++){
    salary +=parseInt(cash[i][0]);//using parse is better
  }
  //scratch effect
  var cash_Cells = emp_sheet.getRange(data.fromm,5,size);
  var style = SpreadsheetApp.newTextStyle().setStrikethrough(true).build();
  cash_Cells.setTextStyle(style);
  cash_Cells.setBackground('#f4cccc');

  //send confirmation
  //creat ui alert that shows salary if admin click yes then will send email

  var res = ui.alert(`Salary = ${salary} ${currency}\n\nConfirm ??`,ui.ButtonSet.OK_CANCEL);
  if(res == ui.Button.OK){
    //then send the email
    var title = `Salary Payments from Artis7.com`;
    let message = `
    Your Salary is ${salary} ${currency}
    Thank you !
    `;
    var email = Data_Sheet.getRange(index(data.id),5).getValue();
    MailApp.sendEmail(email,title,message);

  }


  
}

/************************   D e l e t e  ********************** */


function Delete(){
  
  //delete an employe
  //will make red effect on Data sheet
  //will hide the emp sheet
  //add a leaving date 
  //send email
  var ui = SpreadsheetApp.getUi();
  var id = ui.prompt('Enter ID').getResponseText();
  var email = Data_Sheet.getRange(index(id),5).getValue();
  var sheet_name = Data_Sheet.getRange(index(id),2).getValue();
  var emp_sheet = ss.getSheetByName(sheet_name);

  var deleted_Cells = Data_Sheet.getRange(index(id),1,1,8);
  deleted_Cells.setBackground('#f4cccc');


  emp_sheet.hideSheet();

  var date = new Date;
  
  Data_Sheet.getRange(index(id),8).setValue(date);

  if(MailApp.getRemainingDailyQuota){
    var message = `

    Your Account with ${companyName} has beed deleted
    Thank You for your service !
    `;
    MailApp.sendEmail(email,companyName,message);
  }

  ui.alert(`Account has been deleted successfuly \nTo Restore check : Views -> HiddenSheets()`);


}

