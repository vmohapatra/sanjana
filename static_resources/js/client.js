$(document).ready(function(){
    //Specify click behavior on individual sections Level 1 : List 1
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

    //Level 1 - Levels
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
                }
                break;
            default : 
                $(".div_sublist_1").css('display','none');
        }
    });
    
     var 
        form = $('.form'),
        cache_width = form.width(),
        a4  =[ 595.28,  841.89],
        formToPrint = undefined;  // for a4 size paper width and height

    $('#create_pdf_sublist_1_1').on('click',function(){
        $('body').scrollTop(0);
        createPDF($(this).attr('id'));
    });
    
    //create pdf
    function createPDF(clickedBtnId){
        console.log("in createPDF");
        console.log("Send an ajax POST request to store data in db");
        $.ajax({
            type: "POST",
            url: "/saveUserData",
            data: {
                name: "Vijaya",
                email: "vmohapatra@hotmail.com",
                password: "mypassword"
            }
        })
        .done(function(){})
        .fail(function(){console.log('post fail');})
        .always(function(resp){
            console.log("in always POST client script");
        });

        switch(clickedBtnId) {
            case "create_pdf_sublist_1_1" : 
                formToPrint = $("#form_1_1");
                break;
            default: 
                //Print the whole document
                formToPrint = window.document.getElementsByTagName("body")[0];
        }

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

            //doc = textToPdf(doc, $(formToPrint));

            //doc.save('Vijaya-KCGS.pdf');
            
            //Commenting this out as it resets the form width on the web page
            //form.width(cache_width);
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

    // create canvas object
    function getCanvas(){
        console.log("in getCanvas");
        form.width((a4[0]*1.33333) -80).css('max-width','none');
        return html2canvas(form,{
            imageTimeout:2000,
            removeContainer:true
        });
    }

});
