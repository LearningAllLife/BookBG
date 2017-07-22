$(function() {

    $.get('/books/allPartial',
        function(data) {
            $content = $('#content');
            $content.html(data);
        });
    $.get('/genres/allForDropDown',
        function(data) {
            $('#genres-dropdown').html(data)
        });


    // .then((books) => {
    //     // result = _this.booksData.orderBooksBy(result, orderByCode);
    //     // booksOnPage = UTILS.createBooksOnPage(result, pageNumber, CONSTANTS.PAGE_SIZE_BIG);
    //     // pageIndeces = UTILS.createPageIndeces(result, CONSTANTS.PAGE_SIZE_BIG);
    //     // totalBooks = {
    //     //     books: booksOnPage,
    //     //     indeces: pageIndeces
    //     // };

    //     return templates.getTemplate('home');
    // })
    // .then(function(template) {

    //     UTILS.showFilters()
    //     UTILS.fixPaginationForOrderBy(orderByCode);
    // });

    // if (UTILS.isUserLoggedIn()) {
    //     $('#nav-btn-login, #nav-btn-register').addClass('hidden');
    //     $('#shopping-cart-button').removeClass('hidden');
    //     $('#nav-btn-logout').removeClass('hidden');
    // } else {
    //     $('#nav-btn-login, #nav-btn-register').removeClass('hidden');
    //     $('#shopping-cart-button').addClass('hidden');
    //     $('#nav-btn-logout').addClass('hidden');
    // }

    // $('#nav-btn-logout').on('click', function() {
    //     $('#shopping-cart-button').addClass('hidden');
    //     $('#nav-btn-logout').addClass('hidden');
    //     $('#nav-btn-logout').addClass('hidden');
    //     $('#nav-btn-login').removeClass('hidden');
    //     $('#nav-btn-register').removeClass('hidden');
    //     $('#shopping-cart-menu').addClass('hidden');
    //     $('.cart').toggleClass('activated');

    //     usersController.logoutUser();
    // });

    // $('#shopping-cart-button').on('click', function() {
    //     $('#shopping-cart-menu').toggleClass('hidden');
    //     $('.cart').toggleClass('activated');

    //     booksController.booksData.getUserBooks()
    //         .then(function(result) {
    //             UTILS.addBooksToCart(result.booksInCart);
    //         });
    // });

    // $('#shopping-cart-menu').on('click', '.btn-remove', function() {
    //     let bookToRemoveTitle = $(this).parent()
    //         .find($('.book-characteristics'))
    //         .find('.book-title').text();
    //     let updatedBooksAfterRemoval;
    //     let idToRemove;

    //     $(this).parents('li').eq(0).fadeOut('slow');

    //     booksController.booksData.getBookByTitle(bookToRemoveTitle)
    //         .then(function(result) {
    //             idToRemove = result[0]._id;
    //         })
    //         .then(function() {
    //             return booksController.booksData.getUserBooks();
    //         })
    //         .then(function(userBooks) {
    //             updatedBooksAfterRemoval = JSON.parse(JSON.stringify(userBooks.booksInCart));
    //             for (var i = 0; i < userBooks.booksInCart.length; i += 1) {
    //                 var currentBook = userBooks.booksInCart[i];
    //                 if (currentBook.bookId === idToRemove) {
    //                     updatedBooksAfterRemoval.splice(i, 1);
    //                     break;
    //                 }
    //             }

    //             return updatedBooksAfterRemoval;
    //         })
    //         .then(function(books) {
    //             UTILS.addBooksToCart(books);
    //             booksController.booksData.addBooksToUser(books);
    //         });
    // });

    // $('.dropdown-menu a').on('click', function() {
    //     $orderByChoice.html($(this).html() + '<span class="caret"></span>');
    // });

    // $('#navbar-brand-id').on('click', function() {
    //     UTILS.resetOrderByTypeOnChange();
    // });

    // $('aside > ul.nav.nav-pills.nav-stacked > li > a').each((i, item) => {
    //     if (i !== 0) {
    //         item.addEventListener('click', UTILS.resetOrderByTypeOnChange);
    //     }
    // });

    // $('#search-btn').on('click', function() {
    //     var searchQuery = $('#search-input').val();
    //     $('#search-input').val("");
    //     UTILS.resetOrderByTypeOnChange();

    //     window.location.replace(`#/search/${searchQuery}&1&0`);
    // });

    // $('#search-input').keyup(function(e) {
    //     if (e.keyCode === 13) {
    //         $('#search-btn').trigger('click');
    //     }
    // });
});