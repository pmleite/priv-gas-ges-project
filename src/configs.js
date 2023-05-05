//Script general configs

var daysOfYear    = []
var date          = new Date()
var year          = date.getFullYear()
var firstDate     = new Date(year, 0, 1)
var lastDate      = new Date(year, 11, 31)
var numDays       = Math.round((lastDate - firstDate) / (1000 * 60 * 60 * 24)) + 1

var verbose                 = true;
var baseFileName            = 'gesPrj_';
var lowerPossibleYear       = 2000;
var higherPossibleNumber    = 2030;

var daysOfYear              = []; 

var bckgColor               = [ "#e6e6fa",
                                "#c6ff9f",
                                "#85c3da",
                                "#6cd59e",
                                "#e6b8af",
                                "#e69138",];
                               
                          
var months                  = [ "janeiro", "fevereiro", "março", "abril", "maio", "junho",
                                "julho","agosto","setembro","outubro","novembro","dezembro"]

var hollydays               = [ "1/1", "2/4", "5/4", "25/4", "1/5", "3/6", "1/6", "15/8", "5/1", "1/11", "1/12", "8/12", "25/12" ]

var referenceIDs            = { "spreadSheetIDs" : { "configSheetID":"1Sas8dE_fKvTBXvKDEe6X83LGVOy7rba68RhS7Od7JCg"},
                                "folderIDs"      : { "baseFolderID":"1gQ3V2KygiZ8TdIbUWO8wIbjeY5MYl8X_"}}

var sheetNames              = { "config_recursos":"recursos", 
                                "config_projetos":"projetos"};

var sheetRanges             = { "gesPrjSS_alocacoes_resources_title":"A1:A2",
                                "gesPrjSS_alocacoes_resources":"A3:A40",
                                "gesPrjSS_alocacoes_fullCalendar":"C3:",
                                "baseSS_config_resources":"B4:B24",
                                "baseSS_config_projects":"B3:B100",}

var baseAlocationSheetName  = "alocacao_"

//Spreadsheets and Sheets
var configSpreadSheet    = SpreadsheetApp.openById(referenceIDs.spreadSheetIDs.configSheetID);

var resourcesSheet       = configSpreadSheet.getSheetByName(sheetNames.config_recursos);

//Ranges
// var rangeInfoCell1 = "alocacoes_2023!B28" 
// var rangeInfoCell2 = "alocacoes_2023!B29" 
// var rangeInfoCell3 = "alocacoes_2023!B30" 
// var projectRange   = "projetos!B3:J"






