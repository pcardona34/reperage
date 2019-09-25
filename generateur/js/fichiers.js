/* 
 * fichier.js
 * 
 * Fonctions de lecture de fichier JSON : on récupère un objet 'data'
 * ( c ) 2012 Patrick Cardona
 * jmemor version 1.3.0
 * 
 * @source: http://code.google.com/p/jmemor/
 * 
 * IMPORTANT : ce fichier doit se trouver dans le dossier 'js' du générateur !
 */

/* =================================================================== */
/* LICENCE
/* =================================================================== */
/*
@licstart  The following is the entire license notice for the 
    JavaScript code in this page.

Copyright (C) 2012  Patrick CARDONA

    The JavaScript code in this page is free software: you can
    redistribute it and/or modify it under the terms of the GNU
    General Public License (GNU GPL) as published by the Free Software
    Foundation, either version 3 of the License, or (at your option)
    any later version.  The code is distributed WITHOUT ANY WARRANTY;
    without even the implied warranty of MERCHANTABILITY or FITNESS
    FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

    As additional permission under GNU GPL version 3 section 7, you
    may distribute non-source (e.g., minimized or compacted) forms of
    that code without the copy of the GNU GPL normally required by
    section 4, provided you include this license notice and a URL
    through which recipients can access the Corresponding Source.
    
@licend  The above is the entire license notice
    for the JavaScript code in this page.    
*/


function lireFichier(key) {
    
    // On charge les données de cet exercice
    
    // On récupère le nom du fichier...
    var code = window.localStorage.getItem(key);
    var data = $.parseJSON(code);
	
        var sortie = '<p>Exerciseur : ' + data.app_name + '<br />'; // Application 
        sortie += 'Auteur : ' + data.auteur + '<br />'; // Auteur de l'exercice
        sortie += 'Titre de l\'exercice : ' + data.soustitre + '<br />'; // Titre de l'exercice
        sortie += 'Version : ' + data.version + '</p>';
        //sortie += data.texteExercice.join(" * ");
        $.Zebra_Dialog( sortie, {'title':"Informations sur le fichier sélectionné"} );
  }
  
  /*
   * Supprimer une version
   */
  function supprimeFichier(key) {

    // On supprime les données de cet exercice ?
    
    $.Zebra_Dialog("Supprimer cet exercice ?", {
    'type':     'question',
    'title':    'Suppression du contenu stocké',
    'buttons':  [
                    {caption: 'Oui', callback: function() { 
						// On supprime l'enregistrement de la base locale...
						window.localStorage.removeItem(key);
						$("a[title='Modifier']").click(); // Appel récursif pour forcer l'actualisation avec FF
						new $.Zebra_Dialog("Le contenu référencé par la clé "+ key +" a été supprimé.",{
							'title':'Suppression de contenu',
							'buttons':  false,
							'modal': false,
							'position': ['right - 20', 'top + 20'],
							'auto_close': 2000
			});
						}},
                    {caption: 'Non', callback: function() {$(this).close() }}
                ]
	});
    
    
  }
  
  /*
   * Propager les données à partir du fichier lu :
   */
  function propagerLesDonnees(key) {
	
    var code = window.localStorage.getItem(key);
    var data = $.parseJSON(code);
    /*
     * On affiche un formulaire de création à remplir avec les données récupérées
     */
    
    /*
     * Récupération des données :
     */
      switch(data.app_name){
      	
      	case "Reperage":
      		$("a[title='Nouveau']").click();
      		
      		// Données éditoriales :
	      	$("#edito_reperage_0").val(data.soustitre);
	        $("#edito_reperage_1").val(data.auteur);
	        
	        // On remplit la consigne et le commentaire :
	        $("#zoneConsigne").val(data.votreConsigne);
	        $("#commentaire").val(data.commentaire);
	        // On remplit la zone de texte :
	        $("#zonetexte").val(data.texteExercice.join(" * "));
	        
	        $("#zonecode").val(" ");
			$("#items").html(" ");
	        
	        $.Zebra_Dialog('Voulez-vous redécouper le texte ?', {
				'type':     'question',
				'title':    'Option de restauration',
				'buttons':  [
                    {caption: 'Oui', callback: function() { 
						$("#btn_parametres").click();
						$("#btn_consigne").click();
						}},
                    {caption: 'Non', callback: function() { 
						$("#btn_parametres").click();
						$("#btn_consigne").click();
						$("#btn_decoupage").click();
	        		for(var choix in data.solution){
	        			$("input[name='"+choix+"']").attr('checked', true);
						}
						}},
                    
                ]
			});
	        
	        
	        
		
			
        
	        
	        // On affiche la zone des données éditoriales et on masque la zone courante
	        $("*[div*=etape]").each(function(){
	        	$(this).hide();
	        });
	        //$("#etape_Action_Nouveau").show();
	        $("#etape_Action_Modifier").hide();
	        
	        
      	break;
      	
      	
      	
      	default:
      	
      	break;
      }
      
        
        
  }
  
  
  /* Traitement des données importées */
  
  function propagerCode(code) {
	
    if (code == ""){
		$.Zebra_Dialog("Veuillez coller du code dans la zone de texte.",{
			'title':'Zone vide',
			'type':'error'
			});
		return false;
	}
    
    try {
		
		var data = $.parseJSON(code);
    /*
     * On affiche un formulaire de création à remplir avec les données récupérées
     */
    
    /*
     * Récupération des données :
     */
      switch(data.app_name){
      	
      	case "Reperage":
      		$("a[title='Nouveau']").click();
      		
      		// Données éditoriales :
	      	$("#edito_reperage_0").val(data.soustitre);
	        $("#edito_reperage_1").val(data.auteur);
	        
	        // On remplit la consigne et le commentaire :
	        $("#zoneConsigne").val(data.votreConsigne);
	        $("#commentaire").val(data.commentaire);
	        // On remplit la zone de texte :
	        $("#zonetexte").val(data.texteExercice.join(" * "));
	        
	        $("#zonecode").val(" ");
			$("#items").html(" ");
	        
	        $.Zebra_Dialog('Voulez-vous redécouper le texte ?', {
				'type':     'question',
				'title':    'Option de restauration',
				'buttons':  [
                    {caption: 'Oui', callback: function() { 
						$("#btn_parametres").click();
						$("#btn_consigne").click();
						}},
                    {caption: 'Non', callback: function() { 
						$("#btn_parametres").click();
						$("#btn_consigne").click();
						$("#btn_decoupage").click();
	        		for(var choix in data.solution){
	        			$("input[name='"+choix+"']").attr('checked', true);
						}
						}} 
                ]
			});
        
	        // On affiche la zone des données éditoriales et on masque la zone courante
	        $("*[div*=etape]").each(function(){
	        	$(this).hide();
	        });
	        //$("#etape_Action_Nouveau").show();
	        $("#etape_Action_Importer").hide();
	        
	        
      	break;
      	
      	default:
			$.Zebra_Dialog("Ce code n'est pas celui d'un exercice de Repérage : le nom de l'application est "+data.app_name,{
			'title':'Autre type d\'exercice',
			'type':'error'
			});
      	
      	
		
		}}
    catch(e) {
		$.Zebra_Dialog("Ce code est mal formé : "+e.message,{
			'title':'Mauvais code',
			'type':'error'
			});
		return false;
		}
		
}
  
  
  function listerJSON(){
  	var sortie = "<p>";
  	if(window.localStorage.length > 0){
  		sortie += "Exercices enregistrés :</p><table id='reperages'>";
  		for(key in localStorage){
  			var data = $.parseJSON(window.localStorage.getItem(key));
  			
  				sortie += "<tr id='"+ key +"'><td>" + data.soustitre + " (" + data.version + ")</td>";
  				sortie += "<td><img alt='Détail' src='generateur/img/loupe.png' /></td><td><img alt='Ouvrir' src='generateur/img/editer.png' />";
  				sortie += "</td><td><img src='generateur/img/poubelle.png' alt='Supprimer' /></td>";
  				sortie += "</tr>";
  			
  			}
  			
  		sortie += "</table>";
  		
  	}else{
  		sortie += "Aucun exercice enregistré.</p>";
  		
  	}
  	$("#liste_reperages").html(sortie);
  	
  	$("#reperages tr td:nth-child(2)").bind({
  		"click": function(){
  			// Détail...
  			$(".clique").removeClass("clique");
  			$(this).addClass("clique");
  			var cle = $(this).parent().attr("id");
  			
  			lireFichier(cle);
  			
  		},
  		
  		"mouseover": function(){
  			$(this).css("cursor","pointer");
  		},
  		
  		"mouseout": function(){
  			$(this).css("cursor","default");
  		}
  	});
  	
  	$("#reperages tr td:nth-child(3)").bind({
  		"click": function(){
  			// Ouvrir...
  			var cle = $(this).parent().attr("id");
  			propagerLesDonnees(cle);
  		},
  		
  		"mouseover": function(){
  			$(this).css("cursor","pointer");
  		},
  		
  		"mouseout": function(){
  			$(this).css("cursor","default");
  		}
  	});
  	
  	$("#reperages tr td:nth-child(4)").bind({
  		
  		"mouseover": function(){
  			$(this).addClass("rouge");
  		},
  		"mouseout": function(){
  			$(this).removeClass("rouge");
  		},
  		"click": function(){
  			// Suppression...
  			var cle = $(this).parent().attr("id");
  			$(".clique").removeClass("clique");
  			$("#contenu_fichier").html("Suppression...")
  			$(this).addClass("rouge");
  			supprimeFichier(cle);
  			
  		}
  		
  		});
  	
  }
  
  

