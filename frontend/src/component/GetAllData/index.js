import './GetAllData.scss';

function GetAllData({ data }) {
    return (
        <div className="contain_00 mt-3 ms-3">
            <h3>Thông tin chuyến bay của bạn</h3>

            <div>Mã vé: {data.CodeTicket} </div>
            <div>Chặng đường: {data.TypeFlight}</div>

            <div>Tên hành khách: {data.UserName} </div>

            <div>
                Chuyến bay: {data.AirportFrom}-{data.AirportTo}
            </div>

            <div>Loại vé đi: {data.TypeTicket}</div>

            <div>Chỗ ngồi đi: {data.CodeSeat}</div>

            {data.TypeFlight === 'Roundtrip' && (
                <>
                    <div>Loại vé về: {data.TypeTicketReturn}</div>

                    <div>Chỗ ngồi về: {data.CodeSeatReturn}</div>
                </>
            )}

            <div>Tổng tiền: {data.TotalMoney}</div>
        </div>
    );
}

export default GetAllData;
