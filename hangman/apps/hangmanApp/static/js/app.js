(function () {
    $(document).ready(function() {
        setup = load_canvas();
        $.get("/count", function(res) {
            setup(res.guess_count);
        });

        $('#guess_form').on('submit', function(event){
            if ($.trim($("#guess_text").val()) === "") {
                $("#errors").html("You did not enter a guess.");
                $("#occurrences").html("");
                $("#missed").html("");
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
                var html_str = "";

                $("#guess_text").val(""); // clear the input textbox

                if (data.error) {
                    $("#errors").html(data.error);
                    $("#occurrences").html("");
                    $("#missed").html("");
                } else {
                    // display the progress so far
                    $("#word").html(data.word);
                    $("#guess_count").html(data.guess_count);

                    // messages: correct letter, missed guess
                    $("#errors").html(""); // clear any previous errors
                    $("#occurrences").html(data.occurrences); // correct letter occurrence frequency
                    $("#missed").html(data.missed); // missed guess message

                    // game status
                    if (data.win) {
                        html_str += "<h3 class='text-success'>You guessed it!</h3>";
                        html_str += "<h6><a target='_blank' class='text-info' href='http://www.dictionary.com/browse/" + data.secret + "'>Click for definition</a></h6>"
                        html_str += "<a href='/reset' class='btn btn-primary'>Play Again</a>"
                    } else if (data.secret) {
                        html_str += "<h4 class='text-info'>You have no more guesses.  The word is <a target='_blank' class='text-info' style='text-decoration: underline;' title='Click for definition' href='http://www.dictionary.com/browse/" + data.secret + "'>"  + data.secret + "</a>.</h4>";
                        html_str += "<a href='/reset' class='btn btn-primary'>Play Again</a>"
                    }
                    $("div#status").html(html_str);

                    $("#missed_guesses").html(data.missed_guesses); // list of missed guesses

                    if (data.missed) { // drop an apple if missed guess
                        setup(data.guess_count); 
                    }
                    
                    if (data.game_over) { // hide the form when game over
                        $("#guessForm").css("display", "none");
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

