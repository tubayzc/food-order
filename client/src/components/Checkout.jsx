import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
import { checkoutOrderAction } from "../actions/orderActions";

function Checkout({ toplamfiyat }) {
  const orderState = useSelector((state) => state.checkoutOrderReducer);

  const { success, error, loading } = orderState;
  const dispatch = useDispatch();
  const tokenHandler = (token) => {
    console.log(token);
    dispatch(checkoutOrderAction(token, toplamfiyat));
    if (!error) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Ödeme Başarılı",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <StripeCheckout
        amount={toplamfiyat * 100}
        shippingAddress
        billingAddress
        token={tokenHandler}
        stripeKey="pk_test_51MV9VIAEY249VO0yq3SGbP130P9341uHf9LRtAZ0DVw27oZ5c1w2pWq83cRBUuzDLDxYUaXGq4i2De2pv5Gnxkrw00m21s3RGJ"
        currency="TRY"
      >
        <button className="btn btn-outline-danger mb-3 w-25">HEMEN ÖDE!</button>
      </StripeCheckout>
    </div>
  );
}

export default Checkout;
