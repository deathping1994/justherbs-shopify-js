setTimeout(function () {
    $('#tdf_discount_box').after(`<div id="tdf_discount_box_2" class="tdf_content_section_discounted tdf_container tdf_nonpopup">   <div class="tdf_input_form"><input type="text" class="tdf_input_discount" placeholder="Discount code"><button type="button" class="tdf_normal_btn" data-e="dcode_apply" tdfbinded="1">Apply</button></div> </div>`)
    $(document).on(`load change`, '.tdf_input_discount:eq(1)', function () {
        console.log("started")
        var token = ""
        $.getJSON('/cart.js', function (cart) {
            token = cart.token
        });

        $(".tdf_normal_btn:eq(1)").on("click touchstart", function (event) {
            event.preventDefault();
            var basecode = $(".tdf_input_discount:eq(1)")[0].value;
            $.ajax({
                type: "POST",
                url: "https://farzipromo-api-stage.farziengineer.co/discount",
                headers: {
                    "Content-Type": "application/json"
                },
                data: `{"code":"${basecode}", "cartId":"${token}"}`,
            }).then((response) => {
                console.log("found")
                if (response == "true" || response == "True") {
                    $(".tdf_input_discount:eq(0)")[0].value = basecode;
                    $(".tdf_normal_btn:eq(0)").click();

                }
            }).fail(() => {
                $(".tdf_input_discount:eq(0)")[0].value = basecode;
                $(".tdf_normal_btn:eq(0)").click();
            });
        });
    });
    var interval = setInterval(() => {

        if ($("#tdf_discount_box .tdf_input_form").length != 0 && $("#tdf_discount_box .tdf_discounted_dcode").length == 0) {
            console.log("no")
            $("#tdf_discount_box_2").show()
            $("#tdf_discount_box").hide()
        }
        if ($("#tdf_discount_box .tdf_discounted_dcode").length != 0){
            console.log("yes")
            $("#tdf_discount_box").show()
            $("#tdf_discount_box_2").hide()
        }

    }, 200);

}, 1000);
