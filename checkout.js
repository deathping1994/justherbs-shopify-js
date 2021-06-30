setTimeout(function() {
    $(document).on(`load change`, '.tdf_input_discount', function() {
        console.log("started")
        $('#tdf_discount_box').append(`<div class="field">
      <div class="commander-wrapper" style="display:none">
          <input placeholder="Discount Code" class="commander-input" data-discount-field="true" autocomplete="off" aria-required="true" size="30" type="text" name="checkout[reduction_code]">
        </div>
        <button name="button" type="submit" class="commander-btn" aria-busy="false">
              <span class="btn__content visually-hidden-on-mobile" aria-hidden="true">
                Apply
              </span>
              <span class="visually-hidden">
                Apply Discount Code
              </span>
              <svg class="icon-svg icon-svg--size-16 btn__icon shown-on-mobile" aria-hidden="true" focusable="false"> <use xlink:href="#arrow"></use> </svg>
              <svg class="icon-svg icon-svg--size-18 btn__spinner icon-svg--spinner-button" aria-hidden="true" focusable="false"> <use xlink:href="#spinner-button"></use> </svg>
    </button>      </div>
    </div>`)
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
                $(".commander-input")[0].value = basecode;
                $(".commander-btn").click();
            });
        });
    });
}, 5000);
