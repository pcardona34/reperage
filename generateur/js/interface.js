/* 
 * interface.js
 * 
 * Gestion des événements dans le générateur de reperage
 * (c) 2012 - Patrick Cardona
 * reperage version : xyz
 * 
 * @source: http://code.google.com/p/reperage/
 * 
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

/*
 *  Initialisation  des données des menus
 */

var timeout    = 500;
var closetimer = 0;
var ddmenuitem = 0;

/* ****************************************************************** */
/* Interface utilisateur au moyen de gestionnaires d'événements JQuery */
/* ****************************************************************** */

$(document).ready(function(){

/*
 * On crée une instance de l'objet reperage
 */
var reperage = new oreperage();

 /*
 * On doit actualiser la version de cet exercice en fonction de l'heure courante
 */
window.setTimeout(
    function() {
        var timbre = obtientDate();
        reperage.version = timbre;
    },
    60000
);  // On raffraîchit toutes les minutes…

/*
 * On affiche la zone de menu :
 */
$("#menu").show();

$('#MenuDeroulant > li').bind('mouseover', MenuDeroulant_open);
$('#MenuDeroulant > li').bind('mouseout',  MenuDeroulant_timer);
$('document').click(function(){
	MenuDeroulant_close();
});


$( "#onglets" ).tabs();
$( "#accordeons" ).accordion();
		
/*
 * On charge les zones de l'interface :
 */


 	
// D'abord Edition, puis création
$("#monAction").html(action_Accueil());
$("#monAction").append(action_Importer());
$("#monAction").append(action_Modifier());
$("#monAction").append(action_Nouveau());
 
// Autres étapes emplilées : A ADAPTER !!!

$("#FinAction").html(action_Consigne());
$("#FinAction").append(action_Texte_reperage_un());
$("#FinAction").append(action_Texte_reperage_deux());
$("#FinAction").append(action_Code());
$("#FinAction").append(action_Copie_Exerciseur_reperage());

/*
 * On masque le pied de page au démarrage
 */
$("footer").hide();
	
/*
 * Affichage d'un message d'information
 */
	function Info(){
		this.titre = "";
		this.contenu = "";
	}
	
	Info.prototype.affiche = function(){
		
		$.Zebra_Dialog (this.contenu, {'title': this.titre, 'width':'450'});
	}
	
	var dialogue = new Info();
	
/* ************************************
 * 
 * Actions déclenchées par les menus
 * 
 **************************************/
	
		
/*
 * Fonction permettant de vider les formulaires
 */	
	function effacer() {
  		$(':input')
   		.not(':button, :submit, :reset, :hidden')
   		.val('')
   		.removeAttr('checked')
   		.removeAttr('selected');
	}

	
	/*
	 * Lien : Exerciseur
	 */
	
	$("a[title='Exerciseur']").click(function(e){
		
		// On focalise dans l'onglet Actions
    	$("#onglets ul li:first-child a").click();
    						
		//$("#chemin_fichier").hide();
		$("#Accueil").hide();	
		$("*[id*=etape]").each(function(){
			$(this).hide();
		});
		$("footer").show();
		$("#copy").show();
		$("#etape_Action_Copie_Exerciseur_reperage").show();
				    			
		e.preventDefault(); // Pour ne pas suivre le lien.
	});
	
	
		

	/*
	 * Lien licence
	 */
	$("a[title='Licence']").click(function(e){
		var msg = lic; 
		
		dialogue.titre = "Licence";
		dialogue.contenu = msg;
		dialogue.affiche();
		e.preventDefault();
	});
	
	/*
	 * Lien Contact :
	 */
	$("a[title='Contact']").click(function(e){
			dialogue.titre = "Contact";
			dialogue.contenu = "pcardona34@gmail.com";
			dialogue.affiche();
			e.preventDefault();
	});
	
	    	/*
			* Gestion du lien 'à propos' dans l'interface
			*/
			
			$("a[title=apropos]").click(function(e){
			apropos.affiche();
			e.preventDefault(); // Pour ne pas suivre le lien.
			});
		
	/*
	 * Lien Nouveau
	 */
	$("a[title='Nouveau']").click(function(e){
		
    	// On focalise dans l'onglet Actions
    	$("#onglets ul li:first-child a").click();
    						
		$("*[id*=etape]").each(function(){
			$(this).hide();
		});
		$("#Accueil").hide();	
		$("#etape_Action_Nouveau").show();	
		$("footer").show();
		$("#copy").show();
		/*
		 * On vide les champs
		 */
		effacer();
		
		/*
		 * Idem pour le texte... Les consignes ...
		 */
		$("#zonetexte").val("Mon texte");
		$("#zoneConsigne").val("Consigne...");
		$("#zonecode").val(" ");
		$("#commentaire").val("");
		$("#items").html(" ");
		
				    		
		// On vide le code stocké :
		reperage.code = "";
		reperage.init();
		e.preventDefault();
	});
	
	
	
	/*
	 * Modifier un exercice
	 */
	$("a[title='Modifier']").click(function(e){
		// On focalise dans l'onglet Actions
    	$("#onglets ul li:first-child a").click();
    						
		$("*[id*=etape]").each(function(){
			$(this).hide();
		});
		$("#Accueil").hide();
		$("#etape_Action_Modifier").show();
		$("#chemin_fichier").show();
		$("footer").show();
		
		listerJSON();	
				    		
		// On vide le code stocké :
		reperage.code = "";
		reperage.version = obtientDate();
		e.preventDefault();
	});
	
	
	/*
	 * Importer un exercice
	 */
	$("a[title='Importer']").click(function(e){
		// On focalise dans l'onglet Actions
    	$("#onglets ul li:first-child a").click();
    						
		$("*[id*=etape]").each(function(){
			$(this).hide();
		});
		$("#Accueil").hide();
		$("#zone_importation").val("");
		$("#etape_Action_Importer").show();
		
		$("footer").show();
		
			
				    		
		// On vide le code stocké :
		reperage.code = "";
		reperage.version = obtientDate();
		e.preventDefault();
	});
	
	
	
	// On affiche la présentation par défaut :
	/*
	 * On déclenche l'action au moyen d'une fonction anonyme...
	 */
	var debut = function(){
		/*
		 * On affiche le logo majeur
		 */
		// On masque les zones non sollicitées
		$("#chemin_fichier").hide();
		$("*[id*=etape]").each(function(){
			$(this).hide();
		});
		
		   			
		$("#copy").show();
		$("#etape_Action_Accueil").show();
		
		/*
		 * On vide les champs
		 */
		$("*[id*=edito_]").each(function(){
			$(this).val("");
		});
	}();
	

/*
 * Suite de l'initialisation de l'interface
 */

// Gestionnaire d'événement : quand on clique sur un bouton…
$("input:submit").click(function(e){
	
	// On applique le style Bouton enfoncé...
	$(this).addClass("mousedown"),$(this).mouseout(function(){
		$(this).removeClass("mousedown");
	});
	// Quel label sur le bouton ?
	var label_bouton = $(this).val();
	switch(label_bouton){
		
		case "Charger ce contenu dans le générateur":
			propagerLesDonnees();
		break;
			
		
		case "Supprimer cette version":
			supprimeFichier();
			// On raffraîchit la liste des dictées stockées
			listerJSON();
		break;
		
		
		case "Enregistrer les paramètres":
			var bonneSaisie = true;
				// Les données saisies sont-elles valides ?
				$("*[id*=edito_reperage]").each(function(){
					if ( $(this).val().length == 0 ){ // Si une saisie est vide !
							var msg = "Le champ " + $(this).attr("name") + " est vide !";
							bonneSaisie = false;
							
							
							$.Zebra_Dialog( msg, {'type':'error','title':"Erreur de saisie"} );
							return false;
					}
				}); // fin vérif saisie données édito

				if ( bonneSaisie == true ){ // La saisie est correcte
					
					// On stocke les données éditoriales
					
					// A ADAPTER !!!!
					reperage.soustitre = $("#edito_reperage_0").val();
					reperage.auteur = $("#edito_reperage_1").val();
					reperage.maxEssais = parseInt($("#max").val());
					reperage.jokers = parseInt($("#jokers").val());
				
					$("#etape_Action_Consigne").show();
					$("#etape_Action_Nouveau").hide();
				}
		break;
		
		
		case "Enregistrer la consigne et le commentaire":
			reperage.votreConsigne = $("#zoneConsigne").val();
			reperage.commentaire = $("#commentaire").val();
			
			$("#etape_Action_Texte_reperage_un").show();
			$("#etape_Action_Consigne").hide();
		break;
		
		case "Découper le texte":
			var texte = $("#zonetexte").val();
			
			reperage.texteExercice = texte.split("*");
			var sortie = "";
			for (var i=0;i < reperage.texteExercice.length ;i++){
				sortie += "<li>"+reperage.texteExercice[i]+"<input type='checkbox' name='"+i+"'></li>";
			}
			$("#items").html(sortie);
			$("#etape_Action_Texte_reperage_deux").show();
			$("#etape_Action_Texte_reperage_un").hide();
			
			
		break;	
		
		case "Valider ce choix"	:
			
			for(var i=0; i < reperage.texteExercice.length ; i++){
				if ($("input[name='"+i+"']").is(":checked")){
					reperage.solution.push(i);
				}	
			}
			
			
			
		
		
		
		
		
			//reperage.texte = $("#zonetexte_reperage").val();
			
			// On génère et on stocke le code JSON des données de l'exercice
			if(reperage.code != undefined){
				delete reperage.code;
				delete reperage.fic_code;
			}
			reperage.genereCode();
			
			$("#zonecode").val(reperage.code);
			
			$("*[div*=etape]").each(function(){
				$(this).hide();
			});
			$("#etape_Action_Code").show();
			$("#etape_Action_Texte_reperage_deux").hide();
			
		break;
		
		case "Télécharger une copie de cet exerciseur...":
			
    			window.location.href = "http://exercice-reperage.googlecode.com/files/exercice-reperage-210.zip";
			
		break;
		
		case "Sélectionner le code":
			

    		
    		
    		$("#zonecode").select();
			
		break;
		
		case "Importer":
			var code = $("#zone_importation").val();
			propagerCode(code);
		
		break;
		
		default:
		$.Zebra_Dialog("Aucune action définie pour ce bouton : "+ label_bouton, {'type':'error'});
		
		
	}
	
	e.preventDefault(); // Empêche de suivre le lien ou de recharger la page
}); /* Fin gestionnaire de click sur un bouton */
	
}); // Fin de la fonction .ready
					
					
						
