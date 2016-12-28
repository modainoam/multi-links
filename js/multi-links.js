
var reader; //GLOBAL File Reader object for demo purpose only

   /**
    * Check for the various File API support.
    */
 function checkFileAPI() {
     if (window.File && window.FileReader && window.FileList && window.Blob) {
         reader = new FileReader();
         return true;
     } else {
         alert('The File APIs are not fully supported by your browser. Fallback required.');
         return false;
     }
 }

   /**
    * read text input
    */
function readText(filePath) {
   var output = ""; //placeholder for text output
   if(filePath.files && filePath.files[0]) {
       reader.onload = function (e) {
           output = e.target.result;
           displayContents(output);
       };//end onload()
       reader.readAsText(filePath.files[0]);
   }//end if html5 filelist support
   else if(ActiveXObject && filePath) { //fallback to IE 6-8 support via ActiveX
       try {
           reader = new ActiveXObject("Scripting.FileSystemObject");
           var file = reader.OpenTextFile(filePath, 1); //ActiveX File Object
           output = file.ReadAll(); //text contents of file
           file.Close(); //close file "input stream"
           displayContents(output);
       } catch (e) {
           if (e.number == -2146827859) {
               alert('Unable to access local files due to browser security settings. ' +
                'To overcome this, go to Tools->Internet Options->Security->Custom Level. ' +
                'Find the setting for "Initialize and script ActiveX controls not marked as safe" and change it to "Enable" or "Prompt"');
           }
       }
   }
   else { //this is where you could fallback to Java Applet, Flash or similar
       return false;
   }
   return true;
}

/**
* display content using a basic HTML replacement
*/

function displayContents(txt) {
  var options_html = "";
  var el = document.getElementById('list');
  domains_input = txt.split("\n");
  domains_input.forEach( function(domain_input) {
    if (domain_input.length > 1) {
      domain_net = domain_input.replace('.noclick','');
      options_html += "<option>" + domain_net + "</option>";
    };
  });

     $("#domain-select").html(options_html);
     //  Rebind double-click to new options
    bindOptionsDblClick();
    bindOptionsClick();
  //  el.innerHTML = txt; //display output in DOM
}

function getLink(check_id, domain_name){
// Retrieves the link according to the button checked
  links = {
    "ping": "http://pingme.info/ping/" + domain_name,
    "ping": "http://network-tools.com/default.asp?prog=ping&host=" + domain_name,
    "isup": "http://www.isup.me/" + domain_name,
    "google-search": 'https://www.google.co.il/search?q="' + domain_name + '"',
    "google-in-site": 'https://www.google.co.il/search?q=site:"' + domain_name + '"',
    "vt-dom": "https://www.virustotal.com/en/domain/" + domain_name + "/information/",
    "vt-url": "https://www.virustotal.com/latest-scan/http://" + domain_name,
    "threat-crowd": "https://www.threatcrowd.org/domain.php?domain=" + domain_name,
    "url-query": "http://urlquery.net/",
    "void": "http://www.urlvoid.com/scan/" + domain_name,
    "wayback": "http://web.archive.org/web/" + domain_name,
    "central-ops": "https://centralops.net/co/DomainDossier.aspx?addr=" + domain_name ,
    "robtex": "https://www.robtex.com/?dns=" + domain_name,
    "alexa": "http://www.alexa.com/siteinfo/" + domain_name,
    "google-malware": 'https://www.google.co.il/search?q="' + domain_name + '"+(malware%7Cbotnet%7Cmalicious%7Cransomware%7Ctrojan%7Cvirus%7Cphishing)',
    "wot": "https://www.mywot.com/en/scorecard/" + domain_name,
    "snapito": "https://snapito.com/screenshots/" + domain_name + ".html",
    "norton": "https://safeweb.norton.com/report/show?url=" + domain_name,
    "qutera": "https://quttera.com/detailed_report/" + domain_name,
    "sucuri": "https://sitecheck.sucuri.net/results/" + domain_name,
    "port-check": "http://my-addr.com/check-open-ports/check-listening-of-ports/check_ports_tool.php"
  }
  return links[check_id]
};

function bindOptionsDblClick() {
 $("option").dblclick(function(e){
   e.preventDefault();
   openLinks("basic");
   console.log("db");
 });
 };

function updateInputDomain() {
  $("#domain-select option:selected").each(function(){
  $("#inputDomain").val($(this).text());
  }
  )
};

function bindOptionsClick() {
 $("option").click(function(e){
   e.preventDefault();
   updateInputDomain();
 });
}

function openLinks(type){
// Open checked links of specified type (basic or advanced)

  var domain_name;
  var check_id;
  var typeClass= "." + type + "-options ";

  domain_name = $("#inputDomain").val();
  var linkArray = [];
  $(typeClass + ".form-check-input:checked").each(function(){
    check_id = $(this).attr("id");
    linkArray.push(getLink(check_id, domain_name) )
  });
  console.log(linkArray);
  for (var i = 0; i < linkArray.length; i++) {
  // will open each link in the current window
  window.open(linkArray[i], '_blank');
  };


  $("#domain-select option").each(function(){
    if (domain_name == $(this).val()) {
      $(this).addClass("bg-success text-white");
    };
  }
  )
};

$(".btn-basic").click(function(e){
  e.preventDefault();
  openLinks("basic")

});

$(".btn-advanced").click(function(e){
  e.preventDefault();
  openLinks("advanced")

});

// ********* Seleact and Deselect All ******  //
$("#select-all-basic-websites").click(function(){
  $(".basic-options .form-check-input").prop("checked", true);
});

$("#deselect-all-basic-websites").click(function(){
  $(".basic-options .form-check-input").prop("checked", false);
});

$("#select-all-advanced-websites").click(function(){
  $(".advanced-options .form-check-input").prop("checked", true);
});

$("#deselect-all-advanced-websites").click(function(){
  $(".advanced-options .form-check-input").prop("checked", false);
});
