/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable new-cap,no-undef,no-alert,consistent-return,eol-last*/
$(document).on('click', '.order-remove', function(e) {
    if (confirm('Is this order done?') === true) {
        const id = $(e.target).data('id');
        $.ajax({
            method: 'PUT',
            url: '/orders/complete',
            data: { id: id },
            success: function() {
                $(e.target).parent().remove();
            },
        });
    } else {
        return false;
    }
});