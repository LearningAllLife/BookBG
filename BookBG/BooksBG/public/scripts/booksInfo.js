 $(document).on('click', '#btn-add-to-cart', function(e) {
     const id = $('#book-id').text();
     const value = $('#bookPrice').text();

     const alreadySaved = sessionStorage.getItem('card');
     const totalValue = sessionStorage.getItem('totalValue');
     let newTotalValue = 0;
     let dataTosave = '';
     if (typeof alreadySaved !== 'undefined' && alreadySaved !== null) {
         newTotalValue = parseInt(totalValue, 10) + value;
         dataTosave = alreadySaved + '|' + id;
     } else {
         newTotalValue = value;
         dataTosave = id;
     }

     sessionStorage.setItem('card', dataTosave);
     sessionStorage.setItem('totalValue', newTotalValue);
 });