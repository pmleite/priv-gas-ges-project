//Script general configs
var verbose     = true
var bckgColor   = ["#e6e6fa","#c6ff9f","#85c3da","#6cd59e","#e6b8af"]
var sheetNames  = { "recursos":"recursos", "projetos":"projetos" } 

//Base folder configuration
var configSpreadSheetID  = '1Sas8dE_fKvTBXvKDEe6X83LGVOy7rba68RhS7Od7JCg';
var configSheet_recursos = 'recursos';

var baseFolderID         = '1gQ3V2KygiZ8TdIbUWO8wIbjeY5MYl8X_';
var baseFileName         = 'gesPrj_';
var lowerPossibleYear    = 2000;
var higherPossibleNumber = 2030;

//Base configs
var spreadSheet  = SpreadsheetApp.getActive();
var projects     = spreadSheet.getSheetByName("projetos");

//Ranges
var rangeInfoCell1 = "alocacoes_2023!B28" 
var rangeInfoCell2 = "alocacoes_2023!B29" 
var rangeInfoCell3 = "alocacoes_2023!B30" 
var projectRange   = "projetos!B3:J"

//Data Info
var daysOfYear    = []
var date          = new Date()
var year          = date.getFullYear()
var firstDate     = new Date(year, 0, 1)
var lastDate      = new Date(year, 11, 31)
var numDays       = Math.round((lastDate - firstDate) / (1000 * 60 * 60 * 24)) + 1


var newSheetName  = "alocacao_" + year + "b"

