$(function() {
    let search = function(input, searchParam) {
        const page = input || 1;
        const search = searchParam || $('#search-input').val();
        $.ajax({
            method: 'POST',
            url: '/books/search/' + page,
            data: { input: search },
        }).done(function(data) {
            $content = $('#content');
            $content.html(data);
        });
    };
    let genre = function(input, html) {
        const page = input || 1;
        $.ajax({
            method: 'GET',
            url: '/books/byGenre/' + page,
            data: { input: html },
        }).done(function(data) {
            $content = $('#content');
            $content.html(data);
        });
    };

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
        search();
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
        $('#genresDropdown').data('selection', html);
        genre(1, html);
    });
    $(document).on('click', '.btn-page', function(e) {
        const route = $(this).data('route');
        const page = $(this).text();
        if (route === 'search') {
            search(page);
        } else if (route === 'byGenre') {
            genre(page, $('#genresDropdown').data('selection'));
        } else {
            $.ajax({
                method: 'GET',
                url: '/books/' + route + '/' + page,
            }).done(function(data) {
                $content = $('#content');
                $content.html(data);
            });
        }
        return false;
    });
    $(document).on('click', '.remove-button', function(e) {
        if (confirm("Are you sure you want to delete this book?") == true) {
            var bookId = $(this).attr('data-id');
            $(this).parent().remove();
            $.ajax({
                method: 'PUT',
                url: '/books/delete',
                data: { input: bookId }
            });
        } else {
            return false;
        }
    });

    $(document).on('click', '.remove-button', function(e) {

    });
});