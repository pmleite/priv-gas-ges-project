//funtion to populate and format new sheet with the calendar and references
function populateNewSheet(newSheetID, sheetName) {

  //Define month names
  var months      = ["janeiro", "fevereiro", "março", "abril", "maio", "junho",
                     "julho","agosto","setembro","outubro","novembro","dezembro"]

  //Get the spreadSheet and sheet to work
  var theSpreadSheet  = SpreadsheetApp.openById(newSheetID);
  var sheet           = theSpreadSheet.getSheetByName(sheetName);
  
  //Add days of the year to array
  for (var i = 0; i < numDays; i++) {
    var day = new Date(firstDate.getTime() + (i * 24 * 60 * 60 * 1000));
    daysOfYear.push(Utilities.formatDate(day, "GMT", "dd"));
  }

  //Delete unwanted cells and add header rows
  sheet.deleteRows(41,960)
  sheet.appendRow(["Recursos "]);
  sheet.appendRow([" ","P"].concat(daysOfYear));

  //Adjust column width
  sheet.setColumnWidths(1, 1, 300)
  sheet.setColumnWidths(2,numDays+1,22)

  //Obtain A1 Notation of range to set horizontal alignment to centre and vertical to middle
  var lastRow    = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  var allCells   = "A1:"+convertIndexToLetter(lastColumn)+lastRow

  //Set alignments
  sheet.getRange(allCells).setHorizontalAlignment("center")
  sheet.getRange(allCells).setVerticalAlignment("middle")
  sheet.getRange("A1:A2").setFontSize(20)

  //define columns representing days
  var firstColumn = 3
  var endColumn   = 0
  
  printInfo(sheetName)
  printInfo(sheet)

 
  //Add mounth names, merge cell and set background color
  for(i=0; i<=11; i++){

    endColumn        = firstColumn + getDaysInMonth(year,i) -1;

    var firstLetter  = convertIndexToLetter(firstColumn)
    var secondLetter = convertIndexToLetter(endColumn)
    var mounthRange  = firstLetter + "1:" + secondLetter + "1"

    printInfo("mounth Range " + mounthRange);

    var month      = sheet.getRange(mounthRange)
    var fullRange  = sheet.getRange(firstLetter + "1:" + secondLetter + "40")

    month.setValue(months[i])
    fullRange.setBackgroundColor(bckgColor[i%2])
    month.merge();

    //define new start column
    firstColumn = endColumn+1
    printInfo("first Column " + firstColumn);
  }

  //Set background color of columns corresponding to the weekends to red
  firstColumn = 3
  for (i=0; i<=numDays; i++){
    if (i%7 == 0 || i%7 == 6){
      sheet.getRange(convertIndexToLetter(firstColumn+i)+"2:"+convertIndexToLetter(firstColumn+i)+"40").setBackgroundColor(bckgColor[4])
    }
  }

  //Add letter M and T to column 1
  for (i=3; i<=40; i++){
    if (i%2 != 0){
      sheet.getRange("B"+i).setValue("M").setBackgroundColor(bckgColor[2])
    }else{
      sheet.getRange("B"+i).setValue("T").setBackgroundColor(bckgColor[3])
    }
  }

  //Merge column 1 and set borders
  for (i=1; i<=40; i++){
    if (i%2 != 0){
      var toMergeRange = sheet.getRange("A"+i+":A" + (i+1))
      toMergeRange.merge()
      toMergeRange.setBorder(null, null, null, true, null, null, "black", SpreadsheetApp.BorderStyle.SOLID);
      var toBorder     = sheet.getRange("A"+i+":NC" + (i+1))
      toBorder.setBorder(null, null, true, null, null, null, "black", SpreadsheetApp.BorderStyle.SOLID);
    }
  }

  //Freeze first 2 rows and 2 columns
  sheet.setFrozenRows(2)
  sheet.setFrozenColumns(2)










}
