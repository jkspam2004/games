(function () {
    $(document).ready(function() {
        $('#index_form').on('submit', function(event){
            if ($.trim($("#name").val()) === "") {
                $("#errors").append("Please enter a name");
                return false;
            }
        });
    });
}());

