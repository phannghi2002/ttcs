import { toast } from 'react-toastify';
import ToastCustom from '../../../Toast';
import * as React from 'react';

import axios from 'axios';

import { convertCompany } from '../../../function/ConvertCompany';

const deleteNotify = (data) => {
    axios
        .delete(`http://localhost:4000/cancel/${data._id}`)
        .then((res) => {
            console.log(res);
            console.log('Deletions successful');
            toast.success('Hủy vé thành công');
            window.location.reload();
        })
        .catch((error) => {
            console.log(error);
        });
};

const editInfoRoundtripReturn = (data) => {
    try {
        console.log('lay du lieu', data);
        console.log('lay du lieu dataInfo', data.ID_Info);

        axios
            .get(`http://localhost:4000/info/${data.ID_Info}`)
            .then((response) => {
                console.log('bo m lay du lieu day', response);
                const dataFetch = response.data.data;

                // Remove fields from dataFetch object
                delete dataFetch.TotalMoneyReturn;
                delete dataFetch.TypeTicketReturn;
                delete dataFetch.FlightNumberReturn;
                delete dataFetch.FlightTimeReturn;
                delete dataFetch.LandingTimeReturn;
                delete dataFetch.CodeSeatReturn;
                delete dataFetch.DateReturn;
                delete dataFetch._id;

                // Modify TypeFlight field
                dataFetch.TypeFlight = 'Oneway';
                dataFetch.TotalMoney = dataFetch.TotalMoneyGo;

                console.log('data fetch nay', dataFetch);

                axios
                    .patch(`http://localhost:4000/info/updateReturn/${data.ID_Info}`, dataFetch)
                    .then((res) => {
                        console.log(res);

                        console.log('Du lieu nay:', dataFetch);
                    })
                    .catch((error) => {
                        console.log(error);
                        toast.error('Bi loi roi');
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    } catch (error) {
        console.log(error);
    }
};

const editInfoRoundtripGo = (data) => {
    try {
        console.log('lay du lieu', data);
        console.log('lay du lieu dataInfo', data.ID_Info);

        axios
            .get(`http://localhost:4000/info/${data.ID_Info}`)
            .then((response) => {
                console.log('bo m lay du lieu day', response);
                const dataFetch = response.data.data;

                // Modify TypeFlight field
                dataFetch.TypeFlight = 'Oneway';
                dataFetch.TypeTicket = dataFetch.TypeTicketReturn;
                dataFetch.TotalMoneyGo = dataFetch.TotalMoneyReturn;
                dataFetch.FlightTime = dataFetch.FlightTimeReturn;
                dataFetch.LandingTime = dataFetch.LandingTimeReturn;
                dataFetch.DateGo = dataFetch.DateReturn;
                dataFetch.TotalMoney = dataFetch.TotalMoneyReturn;
                dataFetch.FlightNumber = dataFetch.FlightNumberReturn;
                dataFetch.CodeSeat = dataFetch.CodeSeatReturn;

                // dataFetch.CodeTicket = randomCharacters();

                // Remove fields from dataFetch object
                delete dataFetch.TotalMoneyReturn;
                delete dataFetch.TypeTicketReturn;
                delete dataFetch.FlightNumberReturn;
                delete dataFetch.FlightTimeReturn;
                delete dataFetch.LandingTimeReturn;
                delete dataFetch.CodeSeatReturn;
                delete dataFetch.DateReturn;
                delete dataFetch._id;

                console.log('data fetch nay', dataFetch);

                // Assuming deleteInfo() is a function that deletes the document

                axios
                    .patch(`http://localhost:4000/info/updateGo/${data.ID_Info}`, dataFetch)
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((error) => {
                        console.log(error);
                        toast.error('Bi loi roi');
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    } catch (error) {
        console.log(error);
    }
};
const deleteInfo = (data) => {
    axios
        .delete(`http://localhost:4000/info/${data.ID_Info}`)
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {
            console.log(error);
        });
};

const deleteCodeSeat = (data) => {
    try {
        console.log('lay du lieu', data);
        axios
            .get(`http://localhost:4000/tickets/${data.ID_Ticket}`)
            .then((response) => {
                console.log('bo m lay du lieu day', response);
                const dataFetch = response.data.data;

                // Modify the data as needed
                if (dataFetch && dataFetch[data.TypeTicket] && Array.isArray(dataFetch[data.TypeTicket].CodeSeat)) {
                    dataFetch[data.TypeTicket].CodeSeat = dataFetch[data.TypeTicket].CodeSeat.filter(
                        (code) => code !== data.CodeSeatCancel,
                    );
                }

                axios
                    .put(`http://localhost:4000/tickets/${data.ID_Ticket}`, dataFetch)
                    .then((res) => {
                        console.log(res.data);
                        console.log('Data updated successfully');
                        // Rest of your code
                        console.log('cai day dung de chinh sua', dataFetch);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    } catch (error) {
        console.log(error);
    }
};

const deleteCodeSeatInCheck = (data) => {
    console.log('dang lam ma', data);
    try {
        console.log('lay du lieu', data);
        axios.put(`http://localhost:4000/codeSeat/removeCodeSeat/${data.FlightNumber}`, {
            CodeSeatCancel: data.CodeSeatCancel,
            TypeTicket: data.TypeTicket,
        });
    } catch (error) {
        console.log(error);
    }
};
const handleSendEmailCancelTicket = async (data) => {
    await axios;
    fetch('http://localhost:4000/sendEmail/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: data.Email,
            company: convertCompany(data.Company),
        }),
    });
    console.log('Da gui email ve may ');
};
function ShowNotifyCancel({ data }) {
    const handleDelete = async (data) => {
        console.log('In id', data);

        deleteCodeSeat(data);
        if (data.TypeFlight === 'Oneway') {
            deleteInfo(data);
        } else if (data.TypeFlight === 'RoundtripReturn') {
            editInfoRoundtripReturn(data);
        } else if (data.TypeFlight === 'RoundtripGo') {
            editInfoRoundtripGo(data);
        }
        handleSendEmailCancelTicket(data);
        deleteNotify(data);
        deleteCodeSeatInCheck(data);
    };

    return (
        <div onClick={() => handleDelete(data)}>
            {' '}
            Yêu cầu hủy vé từ mã {data.CodeTicket}
            <ToastCustom />
        </div>
    );
}

export default ShowNotifyCancel;
