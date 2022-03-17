
function CriaTrigger() {
    //var form = FormApp.openById('1wS92tIRMe_MkRXu33TZhTrOaw4zqBNCb2MSi89tfrbs');
    //ScriptApp.newTrigger(onFormSubmit()).forForm(form).onFormSubmit().create();
   
  }
  
  function onFormSubmit(e){
      var itemResponses = e.response.getItemResponses();
      var materia = itemResponses[0].getResponse();
      var data = new Date(itemResponses[1].getResponse());
        if (data.getMonth()>=6){semestre= data.getYear()+"."+"2"}
    else{semestre= data.getYear()+"."+"1"}
    for (var i=2; i<itemResponses.length; i++) {
      var tipo='';
      var arq='';
      switch (itemResponses[i].getItem().getTitle()) {
        case "AD1":
          tipo = 'AD1';
          arq =itemResponses[i].getResponse(); 
          break;
        case "AD2":
          tipo = 'AD2';
          arq =itemResponses[i].getResponse(); 
          break;
        case "AP1":
          tipo = 'AP1';
          arq =itemResponses[i].getResponse(); 
          break;
        case "AP2":
          tipo = 'AP2';
          arq =itemResponses[i].getResponse(); 
          break;
        case "AP3":
          tipo = 'AP3';
          arq =itemResponses[i].getResponse(); 
          break;
      }
      if(arq!='' && tipo!=''){
      var arquivo =  DriveApp.getFileById(arq);
      if(formatoValido(arquivo)){
      renomear(tipo+"_"+semestre+"_"+materia, arquivo);
      mover(materia,tipo,arquivo);
      }else{DriveApp.removeFile(arquivo);}
      } 
    }
       
  }
  
  function renomear(nome,arquivo){
     arquivo.setName(nome);
      //MailApp.sendEmail("jeffinho171@gmail.com", "mime", arquivo.getMimeType());
      
  }
  
  function mover(materia,tipo,arquivo){
    var raiz =  DriveApp.getFolderById('1UUqaj9LhFxEyVcEOi89YPPiLjH_aRTqA');
    if (raiz.getFoldersByName(materia).hasNext()){
        pastaMateria=raiz.getFoldersByName(materia).next();
        if (pastaMateria.getFoldersByName(tipo).hasNext()){
           destino = pastaMateria.getFoldersByName(tipo).next();
           if (!destino.getFilesByName(arquivo.getName()).hasNext()){arquivo.makeCopy(destino);}  
          }
          else{pastaMateria.createFolder(tipo);mover(materia,tipo,arquivo);}
          }
    else{raiz.createFolder(materia); mover(materia,tipo,arquivo);}
  
  }
   function formatoValido(arquivo){
   if (arquivo.getMimeType()=="application/pdf"  || arquivo.getMimeType()== "application/zip" ){
   return true;}else{return false;}
   }
  