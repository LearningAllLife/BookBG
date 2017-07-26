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

    $(document).on('click', '#dropdownI', function(e) {

        let html = $(this).text();
        $.ajax({
            method: 'POST',
            url: '/books/ordered',
            data: { input: html },
        }).done(function(data) {
            $content = $('#content');
            $content.html(data);
        });
    });
});