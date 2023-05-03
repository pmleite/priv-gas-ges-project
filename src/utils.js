/**
 * Function that return the cell letter for a given index
 * Limit 18252 Columns
 * 
 * @autor : Paulo Leite
 * @param {int} index    : Index value of the column
 * @param {bool} verbose : When true turn verbose mode active
 * 
 */
function convertIndexToLetter(idx) {

  var letters  = ["A","B","C","D","E","F","G","H","I","J","K","L","M",
                  "N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

  //Get the last letter from cell                  
  var finalValue   = ""
  
  //Check if the index is less than the alphabet
  if(idx <= letters.length)  {
    finalValue = letters[idx-1]
  }else if (idx <= (Math.pow(letters.length,2)+letters.length)){
    //idx 26 to 702 (2 letters column, from AA to ZZ)
    var firstLetter  = letters[(Math.floor((idx - 1) / 26) - 1)];
    var secondLetter = letters[((idx - 1) % 26)];
    finalValue = firstLetter+secondLetter
  }else{
    //idx 703 to 18252 (3 letters column, from AAA to ZZZ)
    var firstLetter  = letters[(Math.floor((idx - 1) / (26 * 26)) - 1)];
    var secondLetter = letters[(Math.floor((idx - 1) / 26) % 26)  - 1];
    var thirdLetter  = letters[((idx - 1) % 26)];
    finalValue = firstLetter+secondLetter+thirdLetter
  }
  printInfo(finalValue)
  return finalValue
}




//Simple logging function
function printInfo(info){
  if (verbose) Logger.log(info)
}


/**
 * Info panel
 */
function onSelectionChange(e) {

//Informações do projeto
var prjValues   = projects.getRange(projectRange).getValues();
var infoCellL1  = spreadSheet.getRange(rangeInfoCell1);
var infoCellL2  = spreadSheet.getRange(rangeInfoCell2);
var infoCellL3  = spreadSheet.getRange(rangeInfoCell3);

 //Get range passed to event trigger
 var eventCellValue = spreadSheet.getActiveCell().getValue();

 for (let i=0; i<prjValues.length ; i++){ 
   if (eventCellValue == prjValues[i][0] && eventCellValue != ''){
     infoCellL1.setValue(prjValues[i][0] + ': ' + prjValues[i][1] + ' - ' + prjValues[i][2]);

     if(prjValues[i][6]){
     infoCellL2.setValue(Utilities.formatDate(prjValues[i][6], "GMT", "dd/MM/yyyy"));
     }else{
       infoCellL2.setValue('Não existe informação, por favor verifique a folha "projetos" e corrija o respetivo valor');
     }


     infoCellL3.setValue('Gestor de projeto: ' + prjValues[i][8].toUpperCase() + ',  CPI: ' + prjValues[i][7].toFixed(2));
     break;
   }else{
     infoCellL1.setValue('');
     infoCellL2.setValue('');
     infoCellL3.setValue('');
   }
 }
}

//Obtain number of days by month
function getDaysInMonth(year, month) {
  var days = new Date(year, month + 1, 0).getDate();
  return days;
}


