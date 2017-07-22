$(function() {
    $.get('/books/allPartial',
        function(data) {
            $content = $('#content');
            $content.html(data);
        });
    $.get('/genres/allForDropDown',
        function(data) {
            $('#genres-dropdown').html(data);
        });
});