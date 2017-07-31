/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable new-cap,no-undef,eol-last*/
$(function() {
    $.get('/api/authors',
        function(data) {
            const names = data.map((x) => x._name);
            $('#autocomplete').typeahead({ source: names });
        });
});