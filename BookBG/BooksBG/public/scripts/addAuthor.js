$(function() {
    $.get('/api/authors',
        function(data) {
            const names = data.map((x) => x._name);
            $('#autocomplete').typeahead({ source: names });
        });
});