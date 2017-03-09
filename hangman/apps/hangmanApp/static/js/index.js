(function () {
    $(document).ready(function() {
        // toggle the level select form for kids/grown ups
        $('input[type=radio][name=gamelevel]').on('change', function() {
            $('.select_level').toggle();
        });

        // ensure fields are entered/selected
        $('#index_form').on('submit', function(event){
            var error = false;

            if ($.trim($("#name").val()) === "") {
                $("#name_error").html("Enter a name");
                error = true;
            } else {
                $("#name_error").html("");
            }
            if ($.trim($("#level_batch1").val()) === "" && $.trim($("#level_batch2").val()) === "") {
                $("#level_error").html("Select a level");
                error = true;
            } else {
                $("#level_error").html("");
            }
            if (error) {
                return false;
            }
        });
    });
}());

