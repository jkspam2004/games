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
            }
            if ($.trim($("#level_batch1").val()) === "" && $.trim($("#level_batch2").val()) === "") {
                $("#level_error").html("Select a level");
                error = true;
            }
            if (error) {
                return false;
            }
        });
    });
}());

