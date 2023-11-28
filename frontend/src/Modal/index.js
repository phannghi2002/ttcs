import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

function ModalSeatBooking({ show, setShow }) {
    const handleClose = () => {
        setShow(false);
        console.log('khó à');
    };

    const navigate = useNavigate();

    const handleClickYes = () => {
        navigate('/seatBook');
    };

    return (
        <div className="modal show" style={{ display: 'block', position: 'initial' }}>
            {/* if but not .toString then screen console notify bug */}
            <Modal.Dialog show={show.toString()}>
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title>Bạn có muốn chuyển đến trang đặt chỗ không ?</Modal.Title>
                </Modal.Header>

                <Modal.Footer>
                    <Button variant="primary" onClick={handleClickYes}>
                        Có
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Không
                    </Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
}

function ModalPaying({ show, setShow }) {
    const handleClose = () => {
        setShow(false);
        console.log('khó à');
    };

    const navigate = useNavigate();

    const handleClickYes = () => {
        navigate('/pay');
    };

    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'fixed', left: '30%' }}
            // style={{ display: "block", position: "initial" }}
        >
            <Modal.Dialog show={show.toString()}>
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title>Bạn có muốn chuyển đến trang thanh toán không ?</Modal.Title>
                </Modal.Header>

                <Modal.Footer>
                    <Button variant="primary" onClick={handleClickYes}>
                        Có
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Không
                    </Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
}
export { ModalSeatBooking, ModalPaying };
