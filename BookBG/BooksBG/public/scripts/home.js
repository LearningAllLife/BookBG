/* eslint linebreak-style: ["error", "windows"]*/
/* global $*/
/* eslint no-alert: "error"*/
$(function() {
    const search = function(input, searchParam) {
        const page = input || 1;
        const searchP = searchParam || $('#search-input').val().trim();
        $.ajax({
            method: 'POST',
            url: '/books/search/' + page,
            data: { input: searchP },
        }).done(function(data) {
            const $content = $('#content');
            $content.html(data);
        });
    };
    const genre = function(input, html) {
        const page = input || 1;
        $.ajax({
            method: 'GET',
            url: '/books/byGenre/' + page,
            data: { input: html },
        }).done(function(data) {
            const $content = $('#content');
            $content.html(data);
        });
    };

    $.get('/books/allPartial/1',
        function(data) {
            const $content = $('#content');
            $content.html(data);
        });

    $.get('/genres/allForDropDown',
        function(data) {
            $('#genres-dropdown').html(data);
        });

    $(document).on('click', '#search-btn', function(e) {
        const value = $('#search-input').val().trim();
        if (value) {
            return search();
        }
        return false;
    });

    $(document).on('click', '#dropdownI', function(e) {
        const html = $(e.target).text();
        $.ajax({
            method: 'POST',
            url: '/books/ordered',
            data: { input: html },
        }).done(function(data) {
            const $content = $('#content');
            $content.html(data);
        });
    });

    $(document).on('click', '.genreItem', function(e) {
        const html = $(e.target).text();
        $('#genresDropdown').data('selection', html);
        genre(1, html);
    });

    $(document).on('click', '.btn-page', function(e) {
        const route = $(e.target).data('route');
        const page = $(e.target).text();
        if (route === 'search') {
            search(page);
        } else if (route === 'byGenre') {
            genre(page, $('#genresDropdown').data('selection'));
        } else {
            $.ajax({
                method: 'GET',
                url: '/books/' + route + '/' + page,
            }).done(function(data) {
                const $content = $('#content');
                $content.html(data);
            });
        }
        return false;
    });

    $(document).on('click', '.remove-button', function(e) {
        if (confirm('Are you sure you want to delete this book?') === true) {
            const bookId = $(e.target).attr('data-id');
            $(e.target).parent().remove();
            $.ajax({
                method: 'PUT',
                url: '/books/delete',
                data: { input: bookId },
            });
        }
        return false;
    });
});
