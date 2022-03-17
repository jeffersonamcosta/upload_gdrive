
function CriaTrigger() {
    //var idForm = "1nZv1rcqnFtZHmoHvdIqZpIwZgYi4ZKEWvWHFDhL4SNI";
    //var form = FormApp.openById(idForm);
    //ScriptApp.newTrigger(onFormSubmit()).forForm(form).onFormSubmit().create(); 
  
  }
  
  function onFormSubmit(e){
      Logger.clear();
      var itemResponses = e.response.getItemResponses();
      var materia = itemResponses[0].getResponse();
      var semestre = itemResponses[1].getResponse();
      /*var data = new Date(itemResponses[1].getResponse());
        if (data.getMonth()>=6){semestre= data.getYear()+"."+"2"}
    else{semestre= data.getYear()+"."+"1"}
    */
    
    for (var i=0; i<itemResponses.length; i++) {
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
      renomear(tipo,semestre,materia,arquivo);
      mover(materia,tipo,arquivo,false);
      }else{DriveApp.removeFile(arquivo);}
      } 
    }
       
  }
  
  function renomear(tipo,semestre,materia,arquivo){
     Logger.log(arquivo.getName()+" renomeado para "+tipo+"_"+semestre+"_"+materia)
     arquivo.setName(tipo+"_"+semestre+"_"+materia);
     
  }
  
  function mover(materia,tipo,arquivo,substitui){
    var raiz =  DriveApp.getFolderById('1UUqaj9LhFxEyVcEOi89YPPiLjH_aRTqA');
    if (raiz.getFoldersByName(materia).hasNext()){
        pastaMateria=raiz.getFoldersByName(materia).next();
        if (pastaMateria.getFoldersByName(tipo).hasNext()){
           destino = pastaMateria.getFoldersByName(tipo).next();
           if (!destino.getFilesByName(arquivo.getName()).hasNext() && substitui == false)
           {arquivo.makeCopy(destino);}
           else if (substitui==true && destino.getFilesByName(arquivo.getName()).hasNext()){
             arqvelho=destino.getFilesByName(arquivo.getName()).next();
             destino.removeFile(arqvelho);
             arquivo.makeCopy(destino);           
           }
           
          }
          else{pastaMateria.createFolder(tipo);mover(materia,tipo,arquivo,false);}
          }
    else{raiz.createFolder(materia); mover(materia,tipo,arquivo,false);}
  
  }
   function formatoValido(arquivo){
   //arquivo= DriveApp.getFileById("1tDiQprl1aFcTXwwii03zerObHCuCRcdx");
   //Logger.log(arquivo.getMimeType())
  
   if (arquivo.getMimeType().indexOf("pdf") != -1  || arquivo.getMimeType().indexOf("zip") != -1) //== "application/zip" )
   {Logger.log("Formato Valido");return true}
   else{Logger.log("não");return false}
   }  