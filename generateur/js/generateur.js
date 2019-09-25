/* 
 * generateur.js
 * 
 * Fonctions du générateur d'exercice de reperage 
 * reperage
 * (c) 2012 - Patrick Cardona
 * Version : 2.0
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

/* =================================================================== */
/* !!!!!!!!!!!!!!!! AVERTISSEMENT  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
/* =================================================================== */
/* 
	!!! IMPORTANT !!! Ne touchez pas à ce fichier à moins de posséder de solides
	connaissances en javascript, DOM et JQuery !
*/

/* ****************** */
/* Variables globales */
/* ****************** */

function oreperage(){
	this.app_name = "Reperage";
	this.soustitre=""; // Titre de l'exercice
	this.auteur="", // Professeur auteur de l'exercice
	this.version = obtientDate(); // Version initiale de l'exercice en cours de création/réédition
	/*
	* ADAPTEZ CE QUI SUIT EN FONCTION des propriétés de l'objet
	*/
	this.commentaire = "";
	this.votreConsigne="Consigne...";
	this.texteExercice=[]; // tableau des unités de l'exercice
	this.solution=[]; // Tableau des solutions de l'exercice
	this.maxEssais=0; // de pas de limite au nombre d'essais par défaut
	this.jokers=0; // Erreurs tolérées
}

oreperage.prototype.init = function () {
  	this.soustitre=""; // Titre de l'exercice
	this.version = obtientDate(); // Version initiale de l'exercice en cours de création/réédition
	/*
	* ADAPTEZ CE QUI SUIT EN FONCTION des propriétés de l'objet
	*/
	this.commentaire = "";
	this.votreConsigne="Consigne...";
	this.texteExercice=[]; // tableau des unités de l'exercice
	this.solution=[]; // Tableau des solutions de l'exercice
	this.maxEssais=0; // de pas de limite au nombre d'essais par défaut
	this.jokers=0; // Erreurs tolérées
}

function toJSON(_obj){
	return obj_json = JSON.stringify(_obj);
}


function obtientDate(){
	
	var mois=new Array();
	mois[0]="janvier";
	mois[1]="fevrier";
	mois[2]="mars";
	mois[3]="avril";
	mois[4]="mai";
	mois[5]="juin";
	mois[6]="juillet";
	mois[7]="aout";
	mois[8]="septembre";
	mois[9]="octobre";
	mois[10]="novembre";
	mois[11]="decembre";
	 
	var madate = new Date();
	var sceau = madate.getDate();
	sceau += mois[madate.getMonth()];
	sceau += madate.getFullYear() + "-";
	sceau += madate.getHours();
	sceau += "h" + madate.getMinutes();
	sceau += ":" + madate.getSeconds();
	return sceau;
}


/*
 * *******************************************
 */

/*
 * Génération du code de l'exercice reperage
 */
oreperage.prototype.genereCode = function(){
	this.mots = this.texteExercice.length;
	this.solutions = this.solution.length;
	var code = toJSON(this);
	this.code = code;
	this.fic_code = "reperage_"+ this.version;
	
	localStorage.setItem(this.fic_code, this.code);
	
	var msg = "Données conservées sous l'index local <em>" + this.fic_code + ".</em>";
	msg += " Et maintenant... ? Consultez l'aide : récupérer le code généré &hellip;";
	new $.Zebra_Dialog (msg, {
		'title':'Sauvegarde automatique',
		'auto_close':'2000',
		'buttons': false,
		'modal': false,
		'position': ['right - 20', 'top + 20']
		});
	
	$("#zonecode").val(this.code);
	
    	
}

/* *********************************************************
 *  Affichage des actions
 * *********************************************************
 */

// Mode éditeur
function action_Modifier(){
	var monAction = "<div id='etape_Action_Modifier'>";
	monAction += "<h2>Éditer un exercice de reperage</h2>";	
  	monAction += "<div id='chemin_fichier'>";
  	monAction += "<form>";
  	monAction += "<fieldset><legend>Source de données :&nbsp;</legend>";
  	monAction += "<div id='liste_reperages'>&nbsp;</div>";
  	monAction += "</fieldset></form></div>";
  			
  			
  	return monAction;		
}

// Mode importation / édition
function action_Importer(){
	var monAction = "<div id='etape_Action_Importer'>";
	monAction += "<h2>Importer un exercice de Repérage</h2>";	
  	monAction += "<form>";
  	monAction += "<fieldset><legend>Collez votre code ci-dessous.</legend>";
  	monAction += "<textarea id='zone_importation' cols='60' rows='6'></textarea>";
  	monAction += "<input type='submit' id='importer' value='Importer' />";
  	monAction += "</fieldset></form></div>";
  			
  			
  	return monAction;		
}

/*
* NECESSITE UNE ADAPTATION !!!
*/
function action_Nouveau(){
	var monAction = "<div id='etape_Action_Nouveau'>";
	monAction += "<h2>Configuration</h2>";
    monAction += "<form id='editoriales_reperage'>";
    monAction += "<fieldset><legend>Données éditoriales obligatoires&nbsp;</legend>";
    monAction += "<table><tr><td>";
    monAction += "<label for='edito_reperage_0'>Titre de l'exercice :</label>";
    monAction += "</td><td><input type='text' id='edito_reperage_0' name='titre' value='Exercice de reperage n°' />";
    monAction += "</td></tr><tr><td>";
    monAction += "<label for='edito_reperage_1'>Auteur de l'exercice :</label>";
    monAction += "</td><td><input type='text' id='edito_reperage_1' name='auteur' />";
    monAction += "</td></tr></table></fieldset>";
    monAction += "<fieldset><legend>Paramètres de l'exercice&nbsp;</legend>";
    monAction += "<p>Jokers : <select id='jokers'>";
    monAction += "<option value='0'>Aucun joker</option>";
    monAction += "<option value='1'>1 joker</option>";
    for(var i=2;i<11;i++){
    	monAction += "<option value='"+i+"'>"+i+" jokers</option>";
    }
    monAction += "</select><br />Nombre d'exécutions : <select id='max'>";
    monAction += "<option value='0'>Illimité</option>";
    for(var i=1;i<11;i++){
    	monAction += "<option value='"+i+"'>"+i+" fois</option>";
    }
	monAction += "</p></fieldset>";
    monAction += "<p><input type='submit' id='btn_parametres' value='Enregistrer les paramètres' /></p></form></div>";
    
    return monAction;
     
}




/*
* ADAPTEZ CE QUI SUIT...
*/
function action_Accueil(){
	var monAction ="<div id='Accueil'>";
	monAction += "<figure style='text-align: center'>";
	monAction += "<img src='generateur/img/generateur-reperage.png' alt='Logo générateur de reperage' /></figure>";
  	monAction += "</div>";
    
	return monAction;
}


function action_Texte_reperage_un(){
	var monAction ="<div id='etape_Action_Texte_reperage_un'><h2>Saisir le texte segmenté de l'exercice</h2>";
	monAction += "<p>Séparez chaque segment au moyen du signe étoile (*).<br />";
	monAction += "Pour indiquer un nouveau paragraphe, préposez le caratère dièse (#) à l'endroit désiré.</p>";
	
	monAction += "<textarea cols='80' rows='6' id='zonetexte'>Mon texte</textarea><br />";
	monAction += "<input type='submit' id='btn_decoupage' value='Découper le texte' />";
  	monAction += "</div>";
    
	return monAction;
}

function action_Texte_reperage_deux(){
	var monAction ="<div id='etape_Action_Texte_reperage_deux'><h2>Choisir des items</h2>";
	monAction += "<p>Cochez les items qui respectent la consigne :</p>";
	
	monAction += "<ul id='items'></ul>";
	monAction += "<input type='submit' id='btn_choix' value='Valider ce choix' />";
  	monAction += "</div>";
    
	return monAction;
}


function action_Consigne(){
	var monAction ="<div id='etape_Action_Consigne'><h2>Consigne et commentaire</h2>";   
  	monAction += "<form>";
  	monAction += "<fieldset><legend> Consigne de l'exercice de repérage </legend>";
  	monAction += "<textarea cols='60' rows='4' id='zoneConsigne'>Ma consigne</textarea><br />";
  	monAction += "</fieldset>";
  	monAction += "<fieldset><legend> Commentaire de fin d'exercice (facultatif) </legend>";
  	monAction += "<textarea id='commentaire' name='commentaire' cols='60' rows='4'></textarea>";
  	monAction += "</fieldset>";
  	monAction += "<input type='submit' id='btn_consigne' value='Enregistrer la consigne et le commentaire' />";
  	monAction += "</form>";
  	monAction += "</div>";
  	
	return monAction;
}

function action_Code(){
	var monAction = "<div id='etape_Action_Code'><h2 id='titre10'>Données de l'exercice</h2>";
	monAction += "<div id='enregistrement'><img src='generateur/img/json.png' width='100px' align='left' alt='Données JSON' />";
	monAction += "<input type='submit' id='action_selection' value='Sélectionner le code' /><br />"
	monAction += "<textarea id='zonecode' cols='60' rows='10'></textarea></div></div>";
		
	return monAction;	
}

function action_Copie_Exerciseur_reperage(){
	
	var monAction = "<div id='etape_Action_Copie_Exerciseur_reperage'><div id='exerciseur_reperage'>";
	monAction += "<h2>Exerciseur de reperage</h2>";
    monAction += "<form><img src='generateur/img/zip.png' width='100px' align='left' alt='Paquet Zip' />";
	monAction += "<input type='submit' value='Télécharger une copie de cet exerciseur...' />"; 	
	monAction +=  "</form></div></div>"; 	
	
	return monAction;
}
			
		
    	



 
