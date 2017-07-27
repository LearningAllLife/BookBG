$(function() {
    $.get('/books/allPartial/1',
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

    $(document).on('click', '.genreItem', function(e) {

        let html = $(this).text();

        $.ajax({
            method: 'GET',
            url: '/books/byGenre',
            data: { input: html },
        }).done(function(data) {
            $content = $('#content');
            $content.html(data);
        });
    });
    $(document).on('click', '.btn-page', function(e) {
        let page = $(this).text();
        $.ajax({
            method: 'GET',
            url: '/books/allPartial/' + page,
        }).done(function(data) {
            $content = $('#content');
            $content.html(data);
        });

        return false;
    });
    $(document).on('click', '#showMessages,#hideMessages', function(e) {
        $('#showMessages').toggle();
        $('#messages').toggle();
    });
    $(document).on('click', '#clearMessages', function(e) {
        $('.innerMessage').remove();
    });
});