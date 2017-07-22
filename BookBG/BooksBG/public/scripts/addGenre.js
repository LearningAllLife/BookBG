$(function() {
    $.get('/api/genres',
        function(data) {
            const names = data.map((x) => x._name);
            $('#autocomplete').typeahead({ source: names });
        });
});