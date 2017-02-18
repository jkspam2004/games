(function () {
    $(document).ready(function() {
        $('#guess_form').on('submit', function(event){
            if ($.trim($("#guess_text").val()) === "") {
                $("div#errors").html("<p>You did not enter a guess</p>");
                return false;
            }

            event.preventDefault();
            make_guess();
        });
    });
   
    /* make guess */
    function make_guess() {
        $.ajax({
            url: 'guess',
            type: 'post', 
            async: 'true', 
            data: { guess : $("#guess_text").val() },
            success: function(data) {
                $("#guess_text").val("");
                //$("div#wordPlay").html(data); // render the partial html in div
                var html_str = "";

                if (data.error) {
                    $("div#errors").html("<p>" + data.error + "</p>");
                } else {
                    html_str += "<p>Word: " + data.word + "</p>";
                    html_str += "<p>Guesses left: " + data.guess_count + "</p>";
                    html_str += "<p>Missed: " + data.missed + "</p>";

                    if (data.win) {
                        html_str += "<h1>You've Won!</h1>";
                        html_str += '<a href="/reset">Play Again</a>'
                    } else if (data.secret) {
                        html_str += "<h1>You have no more guesses.  The word is "  + data.secret + ".</h1>";
                        html_str += '<a href="/reset">Play Again</a>'
                    }
                    $("div#wordPlay").html(html_str);
                    $("div#errors").html(""); // clear any previous errors

                    if (data.game_over) {
                        $("#formDiv").css("display", "none");
                    }
                }
            },
            failure: function(data) { 
                console.log("Error from guess submit");
            }
        }); 
    }
    /* end make_guess */

    /* get csrftoken */
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');
    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
    /* end get csrftoken */

})();

