$(function() {
    $.get('/api/genres',
        function(data) {
            const names = data.map((x) => x._name);
            $('#genre').typeahead({ source: names });
        });
    $.get('/api/authors',
        function(data) {
            const names = data.map((x) => x._name);
            $('#author').typeahead({ source: names });
        });
});