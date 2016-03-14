$(document).ready(function(){
    //Specify click behavior on individual sections Level 1 : List 1
    $(".progress .hdr_l1").click(function(){
        var clickedElementId = $(this).attr('id');
        console.log(clickedElementId);

        switch(clickedElementId) {
            case "progress_h1":
                //Do something Sanjana
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
        console.log(clickedElementId);

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
	a4  =[ 595.28,  841.89];  // for a4 size paper width and height

$('#create_pdf_sublist_1_1').on('click',function(){
	$('body').scrollTop(0);
	createPDF();
});
//create pdf
function createPDF(){
    console.log("in createPDF");
	getCanvas().then(function(canvas){
		var 
		img = canvas.toDataURL("image/png"),
		doc = new jsPDF({
          unit:'px', 
          format:'a4'
        });     
        doc.addImage(img, 'JPEG', 20, 20);
        doc.save('techumber-html-to-pdf.pdf');
        form.width(cache_width);
	});
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
