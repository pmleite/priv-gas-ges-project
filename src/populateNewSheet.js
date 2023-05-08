//funtion to populate and format new sheet with the calendar and references
function populateNewSheet(newSheetID, sheetName) {

  //Get the spreadSheet and sheet to work
  var theSpreadSheet  = SpreadsheetApp.openById(newSheetID);
  var sheet           = theSpreadSheet.getSheetByName(sheetName);
  
  //Add days of the year to array
  addDaysOfYearToList();

  //Delete unwanted cells and add header rows
  sheet.deleteRows(41,960)
  sheet.appendRow(["Recursos "]);
  sheet.appendRow([" ","P"].concat(daysOfYear));

  //Adjust column width
  sheet.setColumnWidths(1, 1, 300)
  sheet.setColumnWidths(2,numDays+1,40)

  //Obtain A1 Notation of range to set horizontal alignment to centre and vertical to middle
  var lastRow    = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  var allCells   = "A1:"+convertIndexToLetter(lastColumn)+lastRow

  //Set alignments
  sheet.getRange(allCells).setHorizontalAlignment("center")
  sheet.getRange(allCells).setVerticalAlignment("middle")
  sheet.getRange(sheetRanges.gesPrjSS_alocacoes_resources_title).setFontSize(20)

  //define columns representing days
  var firstColumn = 3
  var endColumn   = 0
  
 
  //Add mounth names, merge cell and set background color
  for(i=0; i<=11; i++){

    endColumn        = firstColumn + getDaysInMonth(year,i) -1;

    var firstLetter  = convertIndexToLetter(firstColumn)
    var secondLetter = convertIndexToLetter(endColumn)
    var mounthRange  = firstLetter + "1:" + secondLetter + "1"

    var month      = sheet.getRange(mounthRange)
    var fullRange  = sheet.getRange(firstLetter + "1:" + secondLetter + "40")

    month.setValue(months[i])
    fullRange.setBackgroundColor(bckgColor[i%2])
    month.merge();

    //sheet.getRange(endColumn + "3:" + endColumn).toBorder.setBorder(false, true, true, null, null, null, "black", SpreadsheetApp.BorderStyle.SOLID);

    //define new start column
    firstColumn = endColumn+1

  }

  //Set background color of columns representing weekends and holidays
  for (i=3; i<=numDays+2; i++){
    if (sheet.getRange(convertIndexToLetter(i)+"2").getValue() == "F"){
      sheet.getRange(convertIndexToLetter(i)+"2:"+convertIndexToLetter(i)+"40").setBackgroundColor(bckgColor[5])
    }else if(sheet.getRange(convertIndexToLetter(i)+"2").getValue() == "D" || 
             sheet.getRange(convertIndexToLetter(i)+"2").getValue() == "S"){
      sheet.getRange(convertIndexToLetter(i)+"2:"+convertIndexToLetter(i)+"40").setBackgroundColor(bckgColor[4])        
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

  //Data Validation
  var spreadSheet      = SpreadsheetApp.openById(referenceIDs.spreadSheetIDs.configSheetID)
  var sheetRecursos    = spreadSheet.getSheetByName(sheetNames.config_recursos)
  var sheetProjects    = spreadSheet.getSheetByName(sheetNames.config_projetos)

  var resourcesValues  = sheetRecursos.getRange(sheetRanges.baseSS_config_resources).getValues()
  var projectValues    = sheetProjects.getRange(sheetRanges.baseSS_config_projects).getValues()

  var targetResourceCells = sheet.getRange(sheetRanges.gesPrjSS_alocacoes_resources);
  var targetFullCallandar = sheet.getRange(sheetRanges.gesPrjSS_alocacoes_fullCalendar + convertIndexToLetter(endColumn));
  
  var resourcesRule = SpreadsheetApp.newDataValidation().requireValueInList(resourcesValues).build();
  var projectsRule  = SpreadsheetApp.newDataValidation().requireValueInList(projectValues).build();

  targetResourceCells.setDataValidation(resourcesRule);
  targetFullCallandar.setDataValidation(projectsRule);

  


}
