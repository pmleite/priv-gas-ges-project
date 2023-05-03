//Add menu to UI
function addMenu(){
  SpreadsheetApp.getUi().createMenu('Gerador').addItem('Gerar Nova Folha', 'ges_project.generateFile').addToUi();
  infoCellL1.setValue("Script active!");
}


//function with a prompt with validation of year value between 2000 and 2030
function generateFile() {
  
  var myUI     = SpreadsheetApp.getUi();
  var result   = myUI.prompt('Ano para nova folha','Valor entre ' + lowerPossibleYear + ' e ' + higherPossibleNumber , myUI.ButtonSet.OK_CANCEL);
  var button   = result.getSelectedButton();
  var response = result.getResponseText()
  
  //Check if the respose are in the parameters range
  if (button == myUI.Button.OK){
    if (isNaN(response)){
       myUI.alert('A resposta não está de acordo com o formato necessário!');
    }else{
      if (response >= lowerPossibleYear && response <= higherPossibleNumber){
        generateNewFile(response, myUI);
      }else{
        myUI.alert('Indicou um valor inválido!');
      }
    }
  }else if(button == myUI.Button.CANCEL || button == myUI.Button.CLOSE ){
    myUI.alert('Operação cancelada pelo utilizador!')
  }
}

//Generate new file
function generateNewFile(response, myUI){
 
  var fileName      = baseFileName+response;
  var checkIfExists = DriveApp.getFilesByName(fileName)

  if (checkIfExists.hasNext()){
    myUI.alert(' O ficheiro '+ fileName + ' já existe!')   
  }else{
   
    var folder      = DriveApp.getFolderById(baseFolderID)
    var newSheet    = SpreadsheetApp.create(fileName)
    var newSheetID  = newSheet.getId();
    var newFile     = DriveApp.getFileById(newSheetID)
    var sheetName   = 'alocacao_' + response

    newFile.moveTo(folder) 

    var spreadSheet  = SpreadsheetApp.openById(newSheetID);
    var defaultSheet = spreadSheet.getSheetByName("Sheet1");
  
    spreadSheet.insertSheet(1).setName(sheetName);
    spreadSheet.deleteSheet(defaultSheet)

    populateNewSheet(newSheetID, sheetName);
    myUI.alert('Ficheiro ' + fileName + ' criado com sucesso!')
  }

}