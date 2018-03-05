$(document).ready(function () {
    $.getJSON('jsonData.json', function (elem) {
        var arr = [];
        var col = [];
        var table = document.createElement("table")
        $(table).addClass('table table-bordered table-striped');
        var tbody = document.createElement("tbody");
        table.appendChild(tbody);
        var tr = table.insertRow(-1);
        tbody.appendChild(tr)

        $.each(elem, function (index, val) {
            arr.push(val) 
        });
        
        //Header
        for (var i=0; i < arr.length; i++) {
           for (var key in arr[i]) {
               if (col.indexOf(key) === -1) {
                    col.push(key);
               };
           };
        };
        
        //table header values from previous step
        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        //Add Data to table
        for (var i = 0; i < arr.length; i++) {
            tr = table.insertRow(-1);
            for (var j = 0; j < col.length; j++) {
                var cell = tr.insertCell(-1);
                cell.innerHTML = arr[i][col[j]];
            }
        }
        
         //append table to div
        $('#showData').append("");
        $('#showData').append(table);  
        
        //pagination
        $('#showData').after('<div id=nav ></div>')
        var rowsShown = 50;
        var rowsTotal = $('table tr').length;
        var numPages = rowsTotal/rowsShown;
        for(var i = 0; i < numPages; i++) {
            var pageNum = i + 1;
            $('#nav').append('<a href="#" rel="'+i+'">'+pageNum+'</a> ');
        };
        $('.table tr').hide();
        $('.table tr').slice(0, rowsShown).show(); 
        $('#nav a:first').addClass('active');
        $('#nav a').bind('click', function () {
            $('#nav a').removeClass('active');
            $(this).addClass('active');
            var currPage = $(this).attr('rel');
            var startItem = currPage * rowsShown;
            var endItem = startItem + rowsShown;
            $('.table tr').hide().slice(startItem, endItem).css('display','table-row');
        });      
    });
    
    //Search..
    $("#input").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $('.table tr').filter(function() { 
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});
