(function () {
    $(document).ready(function() {
        $('input[type=radio][name=gamelevel]').on('change', function() {
            $('.select_level').toggle();
        });

        $('#index_form').on('submit', function(event){
            if ($.trim($("#name").val()) === "") {
                $("#errors").append("Please enter a name");
                return false;
            }
        });
    });
}());

