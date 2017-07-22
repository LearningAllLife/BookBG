$(document).on('click', '#shoping-card', function(e) {
    if (sessionStorage.getItem('totalValue')) {
        $.ajax({
            method: 'POST',
            url: '/orders/form',
            data: { ids: sessionStorage.getItem('card'), total: sessionStorage.getItem('totalValue') },
        }).done(function(data) {
            $content = $('#container');
            $content.html(data);
        });
    } else {
        if ($('.tooltip.fade.bottom.in').length > 0) {
            return false;
        }
        if (!$('#shoping-card').hasClass('hasTooltip')) {
            $('#shoping-card').tooltip({
                'trigger': 'click',
                'placement': 'bottom',
            });
            $('#shoping-card').addClass('hasTooltip');
            $('#shoping-card').tooltip('show');
        }
    }
    return false;
});