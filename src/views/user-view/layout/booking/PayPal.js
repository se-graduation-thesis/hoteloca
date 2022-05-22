
import { useState, useEffect, useRef } from 'react';

export default function Payment({ onClick, deposit }) {
    const paypal = useRef();

    // const value_de = deposit / 24000

    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "Cool looking table",
                                amount: {
                                    currency_code: "USD",
                                    value: 100
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    onClick()
                },
                onError: (err) => {
                    console.log(err);
                },
            })
            .render(paypal.current);
    }, []);

    return (
        <div style={{ width: "10%", display: 'flex' }}>
            <div ref={paypal}></div>
        </div>
    );
}
