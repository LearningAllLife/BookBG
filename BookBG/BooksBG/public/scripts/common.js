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
$(document).on('click', '.btn-remove', function(e) {
    const targer = $(e.target);
    const id = targer.data('id');
    const value = parseInt(targer.parent().find('.book-price').text(), 10);
    let totalPrice = parseInt($('#total-value').text(), 10);
    totalPrice -= value;
    $('#total-value').text(totalPrice);
    targer.parent().remove();
    const sessionValue = $('.btn-remove').toArray().map(x => x.dataset.id).join('|');
    if (totalPrice === 0) {
        sessionStorage.removeItem('card');
        sessionStorage.removeItem('totalValue');
        $('#checkout').addClass('disabled');
    } else {
        sessionStorage.setItem('card', sessionValue);
        sessionStorage.setItem('totalValue', totalPrice);
    }
});
$(document).on('click', '#nav-btn-logout,#nav-btn-login,#confirm-order', function(e) {
    sessionStorage.removeItem('card');
    sessionStorage.removeItem('totalValue');
});
$(document).on('click', '#checkout', function(e) {
    $.ajax({
        method: 'POST',
        url: '/orders/createOrder',
        data: { ids: sessionStorage.getItem('card'), total: sessionStorage.getItem('totalValue') },
    }).done(function(data) {
        $content = $('#container');
        $content.html(data);
    });
    return false;
});