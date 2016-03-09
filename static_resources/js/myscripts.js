$(document).ready(function(){
    $(".progress h3").click(function(){
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
});
