$(function() {
    $.get('/books/allPartial?p=1',
        function(data) {
            $content = $('#content');
            $content.html(data);
        });
    $.get('/genres/allForDropDown',
        function(data) {
            $('#genres-dropdown').html(data);
        });
    //on klick of pageing show new page documet.on click...

});