$(document).ready(function(){
     //Vars to be used in client
     var 
        form = $('.form'),
        cache_width = form.width(),
        a4  =[ 595.28,  841.89], // for a4 size paper width and height
        formInteractedWith = undefined;

    /*******************************************************
        Utility functions
    *******************************************************/
    
    //Util function to get the form ID for the resp pdf or save button click
    function getClickedForm(clickedBtnId) {
        switch(clickedBtnId) {
            case "save_form_sublist_1_1" :
            case "create_pdf_sublist_1_1" : 
                formInteractedWith = window.document.getElementById("form_1_1");
                break;
            case "save_form_sublist_1_2" :
            case "create_pdf_sublist_1_2" : 
                formInteractedWith = window.document.getElementById("form_1_2");
                break;
            case "save_form_sublist_1_3" :
            case "create_pdf_sublist_1_3" : 
                formInteractedWith = window.document.getElementById("form_1_3");
                break;
            case "save_form_sublist_1_4" :
            case "create_pdf_sublist_1_4" : 
                formInteractedWith = window.document.getElementById("form_1_4");
                break;
            case "save_form_sublist_1_5" :
            case "create_pdf_sublist_1_5" : 
                formInteractedWith = window.document.getElementById("form_1_5");
                break;
            case "save_form_sublist_1_6" :
            case "create_pdf_sublist_1_6" : 
                formInteractedWith = window.document.getElementById("form_1_6");
                break;
            case "save_form_sublist_1_7" :
            case "create_pdf_sublist_1_7" : 
                formInteractedWith = window.document.getElementById("form_1_7");
                break;
            default: 
                //Return the whole document as the form
                //formInteractedWith = window.document.getElementsByTagName("body")[0];
                formInteractedWith = undefined;
        }
        
        return formInteractedWith;
    }

    //Util function to post form data
    function postFormData(clickedBtnId) {
        var selectedForm = getClickedForm(clickedBtnId);
        var postData = {};

        postData.form_id = $(selectedForm).attr('id');

        for (var i = 0; i < selectedForm.elements.length; i++) {
            if(selectedForm.elements[i].type == "radio" && selectedForm.elements[i].checked == true) {
                if(selectedForm.elements[i].value == "Other") {
                    //console.log(selectedForm.elements[i+1].name+" : "+selectedForm.elements[i+1].value);
                    postData[selectedForm.elements[i+1].name] = selectedForm.elements[i+1].value;
                }
                else {
                    //console.log(selectedForm.elements[i].name+" : "+selectedForm.elements[i].value);
                    postData[selectedForm.elements[i].name] = selectedForm.elements[i].value;
                }
            }
            else if(selectedForm.elements[i].type == "checkbox" ) {
                postData[selectedForm.elements[i].id] = document.getElementById(selectedForm.elements[i].id).checked;
            }
            else if(selectedForm.elements[i].type != "radio" && selectedForm.elements[i].id) {
                //console.log(selectedForm.elements[i].id+" : "+selectedForm.elements[i].value);
                postData[selectedForm.elements[i].id] = selectedForm.elements[i].value;
            }
        }

        console.log(postData);
        if(!$.isEmptyObject(postData)) {
            $.ajax({
                type: "POST",
                url: "/saveFormData",
                data: postData
            })
            .done(function(d){console.log(d);})
            .fail(function(e){console.log(e);console.log('post fail');})
            .always(function(){
            });
        }
        else {
            console.log("Nothing to save.");
        }
    }

    //Util function to get form data
    function getFormData(formId) {
        //console.log("In getFormData for "+ formId);
        var getData = {};

        $.ajax({
            type: "GET",
            url: "/fetchFormData",
            data: { "form_id" : formId}
        })
        .done(function(data){
            console.log("GET successful for "+formId);
            //console.log(data);
            
            for(var key in data) {
                //console.log(key+" : "+data[key]);
                if( document.getElementById(key) ) {
                    var element = document.getElementById(key);
                    if(element.type == "checkbox") {
                        element.checked = data[key];
                    }
                    else {
                        element.value = data[key];
                    }
                }
                else if(document.getElementsByName(key)) {
                    //console.log(key+" : "+data[key]);
                    var elements = document.getElementsByName(key);
                    for(var i = 0; i < elements.length; i++) {
                        if(elements[i].value == data[key]) {
                            elements[i].checked = true;
                            break;
                        }
                        else {
                            //It belongs to Other option in radio button
                            if(
                                elements[i].value == "Other" 
                                && elements[i].type == "radio"
                            ) 
                            {
                                elements[i].checked = true;
                                elements[i+1].value = data[key];
                                break;
                            }
                        }

                    }
                }
            }
        })
        .fail(function(e){console.log(e);console.log('get fail');})
        .always(function(){
        });
        
    }

    //Util function to create pdf
    function createPDF(clickedBtnId){
        formInteractedWith = getClickedForm(clickedBtnId);
        
        //If clicked button corresponds to a form
        if(formInteractedWith) {
            getCanvas().then(function(canvas){
                var 
                img = canvas.toDataURL("image/png"),
                doc = new jsPDF('p','in','letter');
                /*
                doc = new jsPDF({
                  unit:'px', 
                  format:'a4'
                });
                */

                //Element handler only works for id
                var elementHandler = {
                    '#create_pdf_sublist_1_1': function (element, renderer) {
                        return true;
                    }
                };

                //screenshotToPdf dpes not have good resolution and prints the save and create pdf buttons
                //doc = screenshotToPdf(doc, img);

                //htmltoPdf does not print input fields
                //doc = htmlToPdf(doc, elementHandler);

                doc = textToPdf(doc, $(formInteractedWith));

                doc.save($(formInteractedWith).attr('id')+'.pdf');
            });
        }        
    }

    //Util function to write a form to a pdf
    function textToPdf(jsPdfDoc, form) {
        //$(form).attr('id')
        var formToConvertId = $(form).attr('id');
        switch(formToConvertId) {
            case "form_1_1": jsPdfDoc = textToPdfForm(jsPdfDoc, "form_1_1", "Contact Form");break;
            case "form_1_2": jsPdfDoc = textToPdfForm(jsPdfDoc, "form_1_2", "Team Formation Form");break;
            case "form_1_3": jsPdfDoc = textToPdfForm(jsPdfDoc, "form_1_3", "Assess and Monitor Form");break;
            case "form_1_4": jsPdfDoc = textToPdfForm(jsPdfDoc, "form_1_4", "Education and Outreach Form");break;
            case "form_1_5": jsPdfDoc = textToPdfForm(jsPdfDoc, "form_1_5", "Waste Reduction Form");break;
            case "form_1_6": jsPdfDoc = textToPdfForm(jsPdfDoc, "form_1_6", "Recycling Form");break;
            case "form_1_7": jsPdfDoc = textToPdfForm(jsPdfDoc, "form_1_7", "Hazardous Materials Management Form");break;
        }
        
        return jsPdfDoc;
    }

    //Util function to write a form to a pdf
    function screenshotToPdf(jsPdfDoc, img) {
        //Takes a screenshot of the form and converts to pdf
        jsPdfDoc.addImage(img, 'PNG', 20, 20);
        return jsPdfDoc;
    }

    //Util function to write a form to a pdf
    function htmlToPdf(jsPdfDoc, elementHandler) {
        //converts the html to pdf 
        //Limitation : does not save input field values
        var source = 
            window.document.getElementById($(formInteractedWith).attr('id')) || 
            window.document.getElementsByTagName("body")[0];

        jsPdfDoc.fromHTML(
            source,
            15,
            15,
            {
              'width': 180,'elementHandlers': elementHandler
            }
        );

        return jsPdfDoc;
    }

    //Util function to create canvas object
    function getCanvas(){
        console.log("in getCanvas");
        form.width((a4[0]*1.33333) -80).css('max-width','none');
        return html2canvas(form,{
            imageTimeout:2000,
            removeContainer:true
        });
    }

    //Util function for textToPdf for form_1_1
    function textToPdfForm ( doc, formId, formTitle ) {
        console.log("Writing "+formId+" contents to pdf");
        var lines
            ,margin = 0.5 // inches on a 8.5 x 11 inch sheet.
            ,verticalOffset = margin,
            fontSize,
            fontName = "helvetica",
            docHeight = doc.internal.pageSize.height;
        
        fontSize = 22;
        doc.setFontSize(fontSize);

        lines = doc.setFont(fontName)
                    .setFontSize(fontSize)
                    .splitTextToSize(formTitle, 7.5); 
        
        doc.text(0.5, verticalOffset + fontSize / 72, lines);
        verticalOffset += (lines.length + 0.5) * fontSize / 72;
        
        fontSize = 12;
        doc.setFontSize(fontSize);
        
        var elem = document.getElementById(formId).elements;
        var radioGrpItem = 0;
        var radioGrpName = '';

        for(var i = 0; i < elem.length; i++)
        {
            var parentText = $(elem[i]).parent()[0].innerText;
            var valueText = elem[i].value;            
            
            if( elem[i].type == "radio" ) {
                if(radioGrpItem == 0) {
                    radioGrpName = elem[i].name;
                    radioGrpItem = 1;
                }
                else if(elem[i].name == radioGrpName) {
                    radioGrpItem++;
                }
                
                if(elem[i].checked == true) {
                    //console.log("checked radio button");
                    //console.log(parentText);
                    //console.log(valueText);
                    //console.log("------------");
                    
                    if ((verticalOffset + fontSize / 72) + 0.5 >= docHeight)
                    {
                      doc.addPage();
                      verticalOffset = margin; // Restart height position
                    }                    
                    
                    doc.setTextColor(0,0,0);
                    lines = doc.setFont(fontName)
                                .setFontSize(fontSize)
                                .splitTextToSize(parentText, 7.5);            
                    doc.text(0.5, verticalOffset + fontSize / 72, lines);
                    verticalOffset += (lines.length +1) * fontSize / 72;
                    
                    if ((verticalOffset + fontSize / 72) + 0.5 >= docHeight)
                    {
                      doc.addPage();
                      verticalOffset = margin; // Restart height position
                    }                    

                    doc.setTextColor(0,0,255);
                    lines = doc.setFont(fontName)
                                .setFontSize(fontSize)
                                .splitTextToSize(valueText, 7.5);
                    doc.text(0.5, verticalOffset + fontSize / 72, lines);
                    verticalOffset += (lines.length + 1) * fontSize / 72;
                    
                }
                else {
                }
            }
            else if( elem[i].id ){
                if(elem[i].type == "checkbox") {
                    //console.log(parentText);
                    //console.log(valueText);

                    if ((verticalOffset + fontSize / 72) + 0.5 >= docHeight)
                    {
                      doc.addPage();
                      verticalOffset = margin; // Restart height position
                    }                    
                    
                    if(elem[i].checked) {
                        doc.setDrawColor(51, 153, 0);
                    }
                    else {
                        doc.setDrawColor(0, 0, 0);
                    }
                    doc.rect(0.30,( verticalOffset + fontSize / 72 ) - 0.025, 0.002, 0.002); // empty square
                    doc.setTextColor(0,0,0);
                    lines = doc.setFont(fontName)
                                .setFontSize(fontSize)
                                .splitTextToSize(parentText, 7.5);            
                    doc.text(0.5, verticalOffset + fontSize / 72, lines);
                    verticalOffset += (lines.length + 1) * fontSize / 72;
                    
                    if(elem[i+1] && elem[i].id == elem[i+1].name) {
                        //console.log("NOTE");
                        var noteText = elem[i+1].value;
                        //console.log(noteText);

                        if ((verticalOffset + fontSize / 72) + 0.5 >= docHeight)
                        {
                          doc.addPage();
                          verticalOffset = margin; // Restart height position
                        }                    

                        doc.setTextColor(0,0,255);
                        lines = doc.setFont(fontName)
                                    .setFontSize(fontSize)
                                    .splitTextToSize(noteText, 7.5);
                        doc.text(0.5, verticalOffset + fontSize / 72, lines);
                        verticalOffset += (lines.length + 1) * fontSize / 72;
                    }
                    //console.log("------------");

                    
                }
                else {
                    if(elem[i-1] && elem[i].name != elem[i-1].id) {
                        //console.log("not a checkbox");
                        //console.log(parentText);
                        //console.log(valueText);
                        //console.log("------------");

                        if ((verticalOffset + fontSize / 72) + 0.5 >= docHeight)
                        {
                          doc.addPage();
                          verticalOffset = margin; // Restart height position
                        }                    

                        doc.setTextColor(0,0,0);
                        lines = doc.setFont(fontName)
                                    .setFontSize(fontSize)
                                    .splitTextToSize(parentText, 7.5);            
                        doc.text(0.5, verticalOffset + fontSize / 72, lines);
                        verticalOffset += (lines.length) * fontSize / 72;

                        if ((verticalOffset + fontSize / 72) + 0.5 >= docHeight)
                        {
                          doc.addPage();
                          verticalOffset = margin; // Restart height position
                        }                    

                        doc.setTextColor(0,0,255);
                        lines = doc.setFont(fontName)
                                    .setFontSize(fontSize)
                                    .splitTextToSize(valueText, 7.5);
                        doc.text(0.5, verticalOffset + fontSize / 72, lines);
                        verticalOffset += (lines.length + 1) * fontSize / 72;
                    }
                    else if(!elem[i-1]) {
                        //console.log("not a checkbox");
                        //console.log(parentText);
                        //console.log(valueText);
                        //console.log("------------");

                        if ((verticalOffset + fontSize / 72) + 0.5 >= docHeight)
                        {
                          doc.addPage();
                          verticalOffset = margin; // Restart height position
                        }                    

                        doc.setTextColor(0,0,0);
                        lines = doc.setFont(fontName)
                                    .setFontSize(fontSize)
                                    .splitTextToSize(parentText, 7.5);            
                        doc.text(0.5, verticalOffset + fontSize / 72, lines);
                        verticalOffset += (lines.length) * fontSize / 72;

                        if ((verticalOffset + fontSize / 72) + 0.5 >= docHeight)
                        {
                          doc.addPage();
                          verticalOffset = margin; // Restart height position
                        }                    

                        doc.setTextColor(0,0,255);
                        lines = doc.setFont(fontName)
                                    .setFontSize(fontSize)
                                    .splitTextToSize(valueText, 7.5);
                        doc.text(0.5, verticalOffset + fontSize / 72, lines);
                        verticalOffset += (lines.length + 1) * fontSize / 72;
                    }
                }
            }
        }

        return doc;           
    }
    
    /*******************************************************
        Event Handlers
    *******************************************************/

    //Specify click behavior on individual sections Level 1 : List 1 headers
    $(".hdr_l1").click(function(){
        var clickedElementId = $(this).attr('id');

        switch(clickedElementId) {
            case "progress_h1":
                //Do something
                if($("#sublist1").css('display') == 'block') {
                    $(".div_sublist").css('display','none');
                    $("#sublist1").css('display','none');
                }
                else {
                    $(".div_sublist").css('display','none');
                    $("#sublist1").css('display','block');
                }
                break;
            case "progress_h2":
                //Do something
                if($("#sublist2").css('display') == 'block') {
                    $(".div_sublist").css('display','none');
                    $("#sublist2").css('display','none');
                }
                else {
                    $(".div_sublist").css('display','none');
                    $("#sublist2").css('display','block');
                }
                break;
            case "progress_h3":
                //Do something
                if($("#sublist3").css('display') == 'block') {
                    $(".div_sublist").css('display','none');
                    $("#sublist3").css('display','none');
                }
                else {
                    $(".div_sublist").css('display','none');
                    $("#sublist3").css('display','block');
                }
                break;
            case "progress_h4":
                //Do something
                if($("#sublist4").css('display') == 'block') {
                    $(".div_sublist").css('display','none');
                    $("#sublist4").css('display','none');
                }
                else {
                    $(".div_sublist").css('display','none');
                    $("#sublist4").css('display','block');
                }
                break;
            default:
                //Do something
                $(".div_sublist").css('display','none');
        }
    });

    //Specify click behavior on navigation buttons 
    $(".progress ").click(function(){
        console.log($(this).attr('class'));
        var clickedNavClass = $(this).attr('class');
        switch(clickedNavClass) {
            case "progress progress_1" :
                $("#progress_h1").click();
                break;
            case "progress progress_2" :
                $("#progress_h2").click();
                break;
            case "progress progress_3" :
                $("#progress_h1").click();
                break;
            case "progress progress_4" :
                $("#progress_h1").click();
                break;
            default :
                //Do nothing;
        }
    });
    
    //Specify click behavior on individual sections Level 1_1: level 1 headers
    $(".hdr_l1_l1").click(function(){
        var clickedElementId = $(this).attr('id');

        switch(clickedElementId) {
            case "progress_h1_h1" : 
                if($("#sublist1_1").css('display') == 'block') {
                    $(".div_sublist_1").css('display','none');
                    $("#sublist1_1").css('display','none');
                }
                else {
                    $(".div_sublist_1").css('display','none');
                    $("#sublist1_1").css('display','block');
                    //Fetch form data
                    getFormData("form_1_1");
                }
                break;
            case "progress_h1_h2" : 
                if($("#sublist1_2").css('display') == 'block') {
                    $(".div_sublist_1").css('display','none');
                    $("#sublist1_2").css('display','none');
                }
                else {
                    $(".div_sublist_1").css('display','none');
                    $("#sublist1_2").css('display','block');
                    //Fetch form data
                    getFormData("form_1_2");
                }
                break;
            case "progress_h1_h3" :
                if($("#sublist1_3").css('display') == 'block') {
                    $(".div_sublist_1").css('display','none');
                    $("#sublist1_3").css('display','none');
                }
                else {
                    $(".div_sublist_1").css('display','none');
                    $("#sublist1_3").css('display','block');
                    //Fetch form data
                    getFormData("form_1_3");
                }
                break;
            case "progress_h1_h4" :
                if($("#sublist1_4").css('display') == 'block') {
                    $(".div_sublist_1").css('display','none');
                    $("#sublist1_4").css('display','none');
                }
                else {
                    $(".div_sublist_1").css('display','none');
                    $("#sublist1_4").css('display','block');
                    //Fetch form data
                    getFormData("form_1_4");
                }
                break;
            case "progress_h1_h5" :
                if($("#sublist1_5").css('display') == 'block') {
                    $(".div_sublist_1").css('display','none');
                    $("#sublist1_5").css('display','none');
                }
                else {
                    $(".div_sublist_1").css('display','none');
                    $("#sublist1_5").css('display','block');
                    //Fetch form data
                    getFormData("form_1_5");
                }
                break;
            case "progress_h1_h6" :
                if($("#sublist1_6").css('display') == 'block') {
                    $(".div_sublist_1").css('display','none');
                    $("#sublist1_6").css('display','none');
                }
                else {
                    $(".div_sublist_1").css('display','none');
                    $("#sublist1_6").css('display','block');
                    //Fetch form data
                    getFormData("form_1_6");
                }
                break;
            case "progress_h1_h7" :
                if($("#sublist1_7").css('display') == 'block') {
                    $(".div_sublist_1").css('display','none');
                    $("#sublist1_7").css('display','none');
                }
                else {
                    $(".div_sublist_1").css('display','none');
                    $("#sublist1_7").css('display','block');
                    //Fetch form data
                    getFormData("form_1_7");
                }
                break;
            default : 
                $(".div_sublist_1").css('display','none');
        }
    });

    $('.save-form-button').on('click', function(){
        console.log("Save the contact form in sublist 1");
        console.log("Send an ajax POST request to store data in db");

        postFormData($(this).attr('id'));
    });

    $('.logout_button').on('click', function() {
        console.log("Log out button clicked");
        $.ajax({
            type: "POST",
            url: "/logout"
        })
        .done(function(d){ console.log("log out POST successful"); window.location.reload(); })
        .fail(function(e){console.log(e);console.log('post fail');})
        .always(function(){
        });
    });

    //Implement create a pdf for form 1 of sublist 1
    $('.create-pdf-button').on('click',function(){
        $('body').scrollTop(0);
        createPDF($(this).attr('id'));
    });

});
