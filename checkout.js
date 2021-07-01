setTimeout(function () {
    $('#tdf_discount_box').after(`<div id="tdf_discount_box_2" class="tdf_content_section_discounted tdf_container tdf_nonpopup">   <div class="tdf_input_form"><input type="text" class="tdf_input_discount" placeholder="Discount code"><button type="button" class="tdf_normal_btn" data-e="dcode_apply" tdfbinded="1">Apply</button></div> </div>`)
    $("#tdf_discount_box_2").css({ "text-align": "center", "margin-bottom": "10px" })
    $("#tdf_discount_box_2 .tdf_input_form").css({ "color": "#212b36" })
    $("#tdf_discount_box_2 .tdf_input_discount").css({
        "width": "130px",
        "border": "1px solid #d3d3db",
        "margin-right": "5px",
        "display": "inline-block",
        "padding": "11px 12px",
        "font-size": "14px",
        "height": "36px",
        "color": "#212b36",
        "letter-spacing": ".8px",
        "border-radius": "2px"
    })
    $("#tdf_discount_box_2 .tdf_input_discount").css({
        "background-color": "#5ea44c",
        "border": "none",
        "width": "80px",
        "padding": "8px 13px",
        "color": "white",
        "line-height": "20px",
        "border-radius": "2px",
        "cursor": "pointer"
    })

    console.log("started")
    $("#tdf_discount_box_2 .tdf_normal_btn").on("click touchstart", function (event) {
        event.preventDefault();
        var token = ""
        $.getJSON('/cart.js', function (cart) {
            token = cart.token
        });
        var basecode = $("#tdf_discount_box_2 .tdf_input_discount")[0].value;
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
                $("#tdf_discount_box .tdf_input_discount")[0].value = basecode;
                $("#tdf_discount_box .tdf_normal_btn").click();

            }
        }).fail(() => {
            $("#tdf_discount_box .tdf_input_discount")[0].value = basecode;
            $("#tdf_discount_box .tdf_normal_btn").click();
        });
    });

    var interval = setInterval(() => {
        if ($("#tdf_discount_box .tdf_input_form").length != 0 && $("#tdf_discount_box .tdf_discounted_dcode").length == 0) {
            console.log("no")
            $("#tdf_discount_box_2").show()
            $("#tdf_discount_box").hide()
        }
        if ($("#tdf_discount_box .tdf_discounted_dcode").length != 0) {
            console.log("yes")
            $("#tdf_discount_box").show()
            $("#tdf_discount_box_2").hide()
        }
    }, 200);
}, 8000);
