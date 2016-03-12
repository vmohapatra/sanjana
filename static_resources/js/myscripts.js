$(document).ready(function(){
    //Specify click behavior on individual sections Level 1 : List 1
    $(".progress .hdr_l1").click(function(){
        var clickedElementId = $(this).attr('id');
        console.log(clickedElementId);

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
            default : 
                $(".div_sublist_1").css('display','none');
        }

    });
});
