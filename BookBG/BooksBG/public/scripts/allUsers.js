$(document).on('click', '.user-remove', function(e) {
    if (confirm("Are you sure you want to delete this user!") == true) {
        const id = $(e.target).data('id');
        $.ajax({
            method: 'PUT',
            url: '/users/remove',
            data: { id: id },
            success: function() {
                $(e.target).parent().remove();
            },
        });
    } else {
        return false;
    }
});