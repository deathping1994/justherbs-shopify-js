setTimeout(function() {
    $(".tdf_normal_btn").on("custom-event", function() {
            console.log("custom");
            $(".tdf_normal_btn").on("click touchstart", function(event) {
                event.preventDefault();
                $(".tdf_normal_btn").click();
            });
        )
    };
    $(document).on(`load change`, '.tdf_input_discount', function() {
        console.log("started")
        var token = ""
        $.getJSON('/cart.js', function(cart) {
            token = cart.token
        });
        $(".tdf_normal_btn").on("click touchstart", function(event) {
            event.preventDefault();
            var basecode = $(".tdf_input_discount")[0].value;
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
                    $(".tdf_input_discount")[0].value = basecode;
                    $(".tdf_normal_btn").click();
                }
            }).fail(() => {
                $(".tdf_input_discount")[0].value = basecode;
                $(".tdf_normal_btn").trigger("custom-event");
            });
        });
    });
}, 5000);
