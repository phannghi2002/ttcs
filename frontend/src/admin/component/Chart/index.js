import React from 'react';
import { Chart } from 'react-google-charts';
import { TableRevenueTypeFlight, TableRevenueCompany } from '../../pages/Revenue/TotalMoney';

const getCurrentMonthAndYear = (date) => {
    const currentDate = new Date();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    return `${month}/${year}`;
};

export const PieChartCompareTypeFlight = () => {
    let ratingOneway = TableRevenueTypeFlight().ratingOneway * 100;
    let ratingroundtrip = 100 - ratingOneway;

    const dataTypeFlight = [
        ['TypeFlight', 'Percent'],
        ['Một chiều', ratingOneway],
        ['Khứ hồi', ratingroundtrip],
    ];

    const optionsTypeFlight = {
        title: `Biểu đồ so sánh doanh thu một chiều và khứ hồi trong tháng ${getCurrentMonthAndYear()}`,
        is3D: true,
    };

    return (
        <div style={{ width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '70%', marginLeft: '-10%', marginTop: '-2%' }}>
                <Chart
                    chartType="PieChart"
                    data={dataTypeFlight}
                    options={{
                        ...optionsTypeFlight,
                        legend: {
                            textStyle: {
                                fontSize: 16,
                            },
                            labels: {
                                fontSize: 20,
                            },
                        },
                        titleTextStyle: {
                            fontSize: 16,
                        },
                    }}
                    width={'100%'}
                    height={'400px'}
                />
            </div>
            <div style={{ width: '30%', paddingRight: '5%', paddingTop: '8%' }}>
                <h5 className="mb-3">Bảng doanh thu theo loại vé</h5>
                {TableRevenueTypeFlight().render}
            </div>
        </div>
    );
};

export const PieChartCompany = () => {
    let ratingVJ = TableRevenueCompany().ratingVJ * 100;
    let ratingVNA = TableRevenueCompany().ratingVNA * 100;
    let ratingBL = TableRevenueCompany().ratingBL * 100;

    let ratingQH = 100 - ratingBL - ratingVJ - ratingVNA;
    console.log(ratingVJ, ratingQH, ratingBL, ratingVNA);
    const dataCompany = [
        ['Company', 'Percent'],
        ['Vietnam Airlines', ratingVNA],
        ['VietJet Air', ratingVJ],
        ['Jetstar Pacific Airlines', ratingBL],
        ['BamBo Airways', ratingQH],
    ];

    const optionsCompany = {
        title: `Biểu đồ so sánh doanh thu giữa các hãng hàng không trong tháng ${getCurrentMonthAndYear()}`,
        is3D: true,
    };
    return (
        <div style={{ width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '70%', marginLeft: '-10%', marginTop: '-2%' }}>
                <Chart
                    chartType="PieChart"
                    data={dataCompany}
                    options={{
                        ...optionsCompany,
                        legend: {
                            textStyle: {
                                fontSize: 16,
                            },
                            labels: {
                                fontSize: 20,
                            },
                        },
                        titleTextStyle: {
                            fontSize: 16,
                        },
                    }}
                    width={'100%'}
                    height={'400px'}
                />
            </div>
            <div style={{ width: '30%', paddingRight: '5%', paddingTop: '5%' }}>
                <h5 className="mb-3">Bảng doanh thu theo hãng hàng không</h5>
                {TableRevenueCompany().render}
            </div>
        </div>
    );
};
