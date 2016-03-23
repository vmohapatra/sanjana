$(document).ready(function(){
     //Vars to be used in client
     var 
        form = $('.form'),
        cache_width = form.width(),
        a4  =[ 595.28,  841.89], // for a4 size paper width and height
        formInteractedWith = undefined;

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
                formInteractedWith = window.document.getElementsByTagName("body")[0];
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
        console.log("In getFormData for "+ formId);
        var getData = {};

        
        $.ajax({
            type: "GET",
            url: "/fetchFormData",
            data: { "form_id" : formId}
        })
        .done(function(data){
            console.log("GET successful");
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
                    var elements = document.getElementsByName(key);
                    for(var i = 0; i < elements.length; i++) {
                        if(elements[i].value == data[key]) {
                            elements[i].checked = true;
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

    //Specify click behavior on individual sections Level 1 : List 1 headers
    $(".progress .hdr_l1").click(function(){
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

    //Specify click behavior on individual sections Level 1_1: level 1 headers
    $(".progress .hdr_l1_l1").click(function() {
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
    $('#create_pdf_sublist_1_1').on('click',function(){
        $('body').scrollTop(0);
        createPDF($(this).attr('id'));
    });

    //create pdf
    function createPDF(clickedBtnId){
        console.log("in createPDF");

        formInteractedWith = getClickedForm(clickedBtnId);
        
        getCanvas().then(function(canvas){
            var 
            img = canvas.toDataURL("image/png"),
            doc = new jsPDF({
              unit:'px', 
              format:'a4'
            });

            var elementHandler = {
                '#create_pdf_sublist_1_1': function (element, renderer) {
                    return true;
                }
            };
            
            //doc = screenshotToPdf(doc, img);

            //doc = htmlToPdf(doc, elementHandler);

            //doc = textToPdf(doc, $(formInteractedWith));

            //doc.save('Vijaya-KCGS.pdf');
        });
    }

    //Util function to write a form to a pdf
    function textToPdf(jsPdfDoc, form) {
        console.log(form);
        //text(POSITION X, POSITION Y, Text)
        jsPdfDoc.text(20, 20, "Contact Info");
        jsPdfDoc.text(20, 35, "Input");
        
        var str = '';
        var elem = document.getElementById($(form).attr('id')).elements;
        for(var i = 0; i < elem.length; i++)
        {
            str ='';
            str += "Type: " + elem[i].type + " ";
            str += "Name:" + elem[i].name + " ";
            str += " Value: " + elem[i].value + " ";
            console.log(str);
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
            window.document.getElementById($(formToPrint).attr('id')) || 
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

    //create canvas object
    function getCanvas(){
        console.log("in getCanvas");
        form.width((a4[0]*1.33333) -80).css('max-width','none');
        return html2canvas(form,{
            imageTimeout:2000,
            removeContainer:true
        });
    }

});
