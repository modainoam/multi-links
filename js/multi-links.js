
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
var options_html = "";
function displayContents(txt) {

   var el = document.getElementById('list');
   domains_input = txt.split("\n");
   domains_input.forEach( function(domain_input) {
      domain_net = domain_input.replace('.noclick','');
      options_html += "<option>" + domain_net + "</option>";
   });
       $("#exampleSelect2").html(options_html);
  //  el.innerHTML = txt; //display output in DOM
}

$(".btn-primary").click(function(e){
  e.preventDefault();
  var domain_name;
  var check_id;

  $("#exampleSelect2 option:selected").each(function(){
    domain_name = $(this).text();
    var linkArray = [];
    $(".form-check-input:checked").each(function(){
      check_id = $(this).attr("id");
      if (check_id == "ping") {
        linkArray.push("http://pingme.info/ping/" + domain_name)
      };
      if (check_id == "isup") {
        linkArray.push("http://www.isup.me/" + domain_name)
      };
      if (check_id == "google-search") {
        linkArray.push("https://www.google.co.il/search?q=site:" + domain_name)
      };
      if (check_id == "vt-dom") {
        linkArray.push("https://www.virustotal.com/en/domain/" + domain_name + "/information/")
      };
      if (check_id == "vt-url") {
        linkArray.push("https://www.virustotal.com/latest-scan/http://" + domain_name)
      };
      if (check_id == "threat-crowd") {
        linkArray.push("https://www.threatcrowd.org/domain.php?domain=" + domain_name)
      };
      if (check_id == "url-query") {
        linkArray.push("http://urlquery.net/")
      };
      if (check_id == "void") {
        linkArray.push("http://www.urlvoid.com/scan/" + domain_name)
      };
      if (check_id == "wayback") {
        linkArray.push("http://web.archive.org/web/" + domain_name)
      };

      if (check_id == "central-ops") {
        linkArray.push("https://centralops.net/co/DomainDossier.aspx?addr=" + domain_name)
      };
    });
    console.log(linkArray);
    for (var i = 0; i < linkArray.length; i++) {
    // will open each link in the current window
    window.open(linkArray[i], '_blank');

    };
  });

});
