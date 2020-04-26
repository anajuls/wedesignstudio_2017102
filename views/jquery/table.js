function draw_table()
{
    //$("#results").empty();
	$.getJSONuncached = function (url)
	{
		return $.ajax(
		{
			url: url,
			type: 'GET',
			cache: false,
			success: function (html)
			{
                buildTable(html);
                //$("#results").append(html);
				//select_row();
			}
		});
	};
	$.getJSONuncached("/users")
};

function buildTable(html) {
    
    let usersHTML = '';
    $.each(html, function(index) {
        usersHTML += '<tr id="'+html[index]._id+'">'
            +  '<td align="left">'
            +  '<h5>'+html[index].item+'</h5>'
            +  '</td>'
            +  '<td align="right">'+html[index].price+'</td>'
            +  '<td>'
            +  '<button class="btn btn-sm btn-primary edit-row" data-item="'+html[index]._id+'">Edit</button>'
            +  '</td></tr>';
    });
    $('#results_table tbody').html(usersHTML);
}

function select_row()
{
	$("#quote tbody tr[id]").click(function ()
	{
		$(".selected").removeClass("selected");
		$(this).addClass("selected");
		var section = $(this).prevAll("tr").children("td[colspan='3']").length - 1;
		var entree = $(this).attr("id") - 1;
		delete_row(section, entree);
	})
};

function delete_row(sec, ent)
{
	$("#delete").click(function ()
	{
		$.ajax(
		{
			url: "/post/delete",
			type: "POST",
			data:
			{
				section: sec,
				entree: ent
			},
			cache: false,
			success: setTimeout(draw_table, 1000)
		})
	})
};

$(document).ready(function ()
{
    draw_table();

    // Select Row for Edit/Delete
    $('body').on('click', '.edit-row', function() {
        itemId = $(this).data('item');

        $.ajax({
            url: '/users/' + itemId,
            type: 'GET',
            dataType: 'json',
            cache: false, // Appends _={timestamp} to the request query string
            success: function(data) {
                // data is a json object.
                $("input[name='item_id']").val(data._id);
                $("input[name='item']").val(data.item);
                $("input[name='price']").val(data.price);
            }
        });
    });

    // Delete Product
    $('body').on('click', '#delete', function() {
        // If we have our item id
        if($('#item_id').val()) {
            $.ajax({
                url: '/users/' + $('#item_id').val(),
                type: 'DELETE',
                dataType: 'json',
                success: function(data) {
                    // Reload updated admin table
                    draw_table();
                }
            });
        }
    });
    
    $(document).on('submit','#adminForm',function(e){
        e.preventDefault();

        // Here I submit the form with Ajax
        $.ajax({
            url: '/users/',
            type: 'POST',
            data: { 
                item: $("input[name='item']").val(),  
                price: $("input[name='price']").val()
            },
            dataType: 'json',
            success: function(data) {
                // Reinit updated admin table
                draw_table();
            }
        });
    })

});