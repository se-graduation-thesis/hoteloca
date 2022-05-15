import * as React from 'react';
// import InsertBrandDialog from './InsertDialog'
// import UpdateBrand from './UpdateDialog'

import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import * as actions from "actions/customer.action"
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2'
import moment from 'moment-timezone'

ChartJS.register(...registerables);

export default function DayStatistics() {
    const dispatch = useDispatch();
    const listCustomer = useSelector((state) => state.customer.customers);
    const [listShow, setListShow] = useState([])

    useEffect(() => {
        dispatch(actions.fetchAllCustomer())
    }, [])

    const getYear = () => {
        const year = new Date().getFullYear();
        const years = [];
        for (let i = 2021; i <= year; i++) {
            years.push(i)
        }
        return years;
    }

    const list_year = getYear()

    useEffect(() => {
        if (listCustomer) {
            let counts = []
            list_year.forEach((e1) => {
                let count = 0;
                listCustomer.forEach((e) => {
                    let year = moment(e.ngayThamGia).year();
                    if (e1 === year) {
                        count += 1
                    }

                })
                counts.push(count)
            })

            setListShow(counts)
        }
    }, [listCustomer])
    return (
        <>
            <h3>Biểu đồ số lượng khách hàng theo năm</h3>
            <Bar
                data={{
                    labels: list_year,
                    datasets: [
                        {
                            label: "Số Người",
                            backgroundColor: [
                                "#3e95cd",
                            ],
                            data: listShow
                        }
                    ]
                }}
                options={{
                    legend: { display: false },
                    title: {
                        display: true,
                        text: "Predicted world population (millions) in 2050"
                    }
                }}
            />
        </>
    );
}
