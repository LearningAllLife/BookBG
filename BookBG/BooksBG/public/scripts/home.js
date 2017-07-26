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
    $(document).on('click', '#search-btn', function(e) {
        $.ajax({
            method: 'POST',
            url: '/books/search',
            data: { input: $('#search-input').val() },
        }).done(function(data) {
            $content = $('#content');
            $content.html(data);
        });
    });
});