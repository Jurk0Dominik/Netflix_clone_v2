import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import classes from "./Payment.module.css";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { subscribePlan } from "../atoms/modalAtom";

function Paymanet() {
  const naviagate = useNavigate();
  const [priceValue, setPriceValue] = useState("1.99");
  const [click, setClick] = useState(false);
  const [subscribe, setSubscribe] = useRecoilState(subscribePlan);

  const payPalHandler = (e) => {
    const price = e.target.value;
    setSubscribe(
      planSubscribe.map((plan) => plan.price === price && plan.planName)
    );
    setPriceValue(price);
    setClick(true);
  };

  const planSubscribe = [
    {
      planName: "Podstawowy",
      price: "29",
    },
    {
      planName: "Standard",
      price: "43",
    },
    {
      planName: "Premium",
      price: "60",
    },
  ];

  return (
    <div className={classes.paymantContainer}>
      <div className={`${classes.paymantContext} ${click && classes.blur}`}>
        <h1>Wybierz plan odpowiedni do twoich potrzeb</h1>
        <h3>
          <b>&#10004;</b> Oglądaj bez ograniczeń. Bez reklam
        </h3>
        <h3>
          <b>&#10004;</b> Recomendacje specjalnie dla Ciebie
        </h3>
        <h3>
          <b>&#10004;</b> Możesz zmienić lub anulować w dowolnym momencie
        </h3>
        <div className={classes.paymentForm}>
          <h3>Cena miesięczna</h3>
          {planSubscribe.map((plan) => (
            <div className={classes.paySubscribe} key={plan.planName}>
              <h4>{plan.planName}</h4>
              <span>{plan.price} zł</span>
              <button value={plan.price} onClick={payPalHandler}>
                Wybierz
              </button>
            </div>
          ))}
        </div>
      </div>
      {click && (
        <div className={classes.paypalForm}>
          <h3>Wybierz forme płatności</h3>
          <PayPalScriptProvider
            options={{
              "client-id":
                "AZ1cc9Pi1kvMK8FdDkzSucXUoRopcOM2pdBy_kce9nNVMKYguEEiFFB8qqBhekgcXjlkZLgb5w6u9oTb",
            }}
          >
            <PayPalButtons
              createOrder={(data, actions) => {
                console.log(actions);
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: priceValue,
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  const name = details.payer.name.given_name;
                  alert(`Transaction completed by ${name}`);
                });
              }}
            />
          </PayPalScriptProvider>
          <button className={classes.closeBtn} onClick={() => setClick(false)}>
            &#x2715;
          </button>
          <button
            className={classes.freeBtn}
            onClick={() => {
              naviagate("/main", { replace: true });
            }}
          >
            try free
          </button>
          <h4>without payment</h4>
        </div>
      )}
    </div>
  );
}

export default Paymanet;
