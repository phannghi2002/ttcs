import express from 'express';

const router = express.Router();
import NodeMailer from 'nodemailer';
// const emailController = require("../controllers/sendEmailController.js");

//create new ticket
// router.post("/", emailController.sendMail);
router.post('/', (req, res) => {
    //   console.log(req.body);

    const { email, code } = req.body;

    try {
        const transporter = NodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Sending Email With ReactJS and NodeJS',
            html: `<h1> Mã code của bạn là: ${code} </h1>
      Vui lòng đến trang web: http://192.168.237.1:3000/myFlight để tra cứu chuyến bay của bạn`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error', error);
            } else {
                console.log('Email sent', info.response);
                res.status(201).json({ status: 201, info });
            }
        });
    } catch (error) {
        res.status(201).json({ status: 401, error });
    }
});

router.post('/all', (req, res) => {
    const { email, code, data } = req.body;
    try {
        const transporter = NodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });
        const handleLocation = (location) => {
            const transform = {
                HAN: 'HÀ NỘI',
                SGN: 'HỒ CHÍ MINH',
                HPH: 'Hải Phòng',
                DIN: 'Điện Biên',
                THD: 'Thanh Hóa',
                VDO: 'Quảng Ninh',
                VII: ' Vinh ',
                HUI: 'Huế',
                VDH: 'Đồng Nai',
                DAD: 'Đà Nẵng',
                PXU: 'Pleiku',
                TBB: 'Tuy Hòa ',
                CXR: 'Nha Trang',
                DLI: 'Đà Lạt',
                PQC: 'Phú Quốc',
                VCL: 'Tam Kì',
                UIH: 'Qui Nhơn',
                VCA: 'Cần Thơ',
                VCS: 'Côn Đảo',
                BMV: 'Ban Mê Thuật',
                VKG: 'Rạch Giá',
                CAH: 'Cà Mau',
            };
            return transform[location];
        };

        const handleAirline = (company) => {
            const COMPANY = [
                { name: 'VIETNAM AIRLINES' },
                { name: 'BAMBO AIRWAYS' },
                { name: 'VIETJET AIR' },
                { name: 'JETSTAR PACIFIC AIRLINES' },
            ];
            if (company.includes('VNA')) return COMPANY[0].name;
            else if (company.includes('QH')) return COMPANY[1].name;
            else if (company.includes('VJ')) return COMPANY[2].name;
            else return COMPANY[3].name;
        };

        const getDay = (time) => {
            const time2 = time.split('T')[0];
            const time3 = time2.split('-');
            const timeNew = time3[2] + '/' + time3[1] + '/' + time3[0];
            return timeNew;
        };
        const getTime = (time) => {
            const time2 = time.split('T')[1];
            const time3 = time2.split(':');
            const timeNew = time3[0] + ':' + time3[1];
            return timeNew;
        };

        const handleSendmail = () => {
            let html = '';
            console.log(data.length);
            for (let index = 0; index < data.length; index++) {
                html =
                    html +
                    `<div style="width: 600px">
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
              "
            >
              <h3 style="margin: 0; padding: 5px 0px">
              NGÀY ${getDay(data[index].DateGo)} đến NGÀY ${getDay(data[index].DateGo)} </h3>
              <h3 style="margin: 0; padding: 5px 0px">
                Chuyến đi từ ${handleLocation(data[index].AirportFrom)}  đến ${handleLocation(data[index].AirportTo)}
              </h3>
            </div>
      
            <div style="width: 100%; height: 2px; background-color: #000"></div>
            <div style="margin-top: 5px">
              <span style="font-size: 14px">ĐÃ CHUẨN BỊ CHO</span>
              <h3 style="margin: 0; padding: 5px 0px">
                Ông (Bà) ${data[index].UserName}
                <span style="text-transform: uppercase"></span>
              </h3>
            </div>
            <div style="font-size: 14px; margin-top: 10px">
              MÃ ĐẶT CHỖ: <span>${code}</span>
            </div>
            <div style="width: 100%; height: 2px; background-color: #000"></div>
      
            <table
              border="1"
              style="
                border-collapse: collapse;
                margin-top: 10px;
                border: 1px solid #000;
                width: 100%;
              "
            >
              <tr>
                <td rowspan="2" style="background-color: #ccc; padding: 5px;">
                  <div>${handleAirline(data[index].FlightNumber)}</div>
                  <div>${data[index].FlightNumber}</div>
                </td>
                <td colspan="2" style="padding: 5px;">
                  <div style="text-align: center">
                    ${data[index].AirportFrom}(${handleLocation(data[index].AirportFrom)})
                    <i
                      style="
                        margin: auto;
                        text-align: center;
                        -webkit-transform: rotate(-45deg);
                        border: solid black;
                        border-width: 0 3px 3px 0;
                        display: inline-block;
                        padding: 3px;
                        transform: rotate(-45deg);
                      "
                    ></i>
                    ${data[index].AirportTo} (${handleLocation(data[index].AirportTo)})
                  </div>
                </td>
              </tr>
              <tr style="padding: 5px;">
                <td style="width: 50%; text-align: center">
                  <span style="display: block; font-size: 14px"> Giờ khởi hành </span>
                  <span>${getTime(data[index].FlightTime)}</span>
                </td>
                <td style="width: 50%; text-align: center">
                  <span style="display: block; font-size: 14px"> Giờ đến </span>
                  <span>${getTime(data[index].LandingTime)}</span>
                </td>
              </tr>
            </table>
            <table border="1" style="border-collapse: collapse; border: 1px solid #000; margin-top: 10px; width: 100%;">
              <tr style="text-align: left;">
                  <th>Tên khách hàng</th>
                  <th>Ghế</th>
                  <th>Hạng</th>
                  <th>Tình trạng chỗ</th>
              </tr>
              <tr style="text-align: left;">
                  <td>${data[index].UserName}</td>
                  <td>${data[index].CodeSeat}</td>
                  <td>${data[index].TypeTicket}</td>
                  <td>Đã xác nhận</td>
              </tr>
              
          </table>
          <div style="width: 100%; height: 2px; background-color: #000; margin: 10px 0px;"></div>
      </div>`;
            }
            return html;
        };

        console.log(handleSendmail());

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Sending Email With ReactJS and NodeJS',
            html: handleSendmail(),
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error-super', error);
            } else {
                console.log('Email sent', info.response);
                res.status(201).json({ status: 201, info });
            }
        });
    } catch (error) {
        res.status(201).json({ status: 401, error });
    }
});

export default router;
