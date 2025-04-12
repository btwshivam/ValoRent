import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, FormControl, Modal, Row, Col, Card, Alert } from "react-bootstrap";
import { useApiPrivate } from "../hooks";
import "./NewBooking.sass";

dayjs.extend(isBetween);

export default function NewBooking({ show, handleClose, car }) {
    const [bookingStartTime, setBookingStartTime] = useState(dayjs().format("YYYY-MM-DDTHH:mm"));
    const [bookingEndTime, setBookingEndTime] = useState(dayjs().format("YYYY-MM-DDTHH:mm"));
    const [bookingErr, setBookingErr] = useState("");
    const [bookingHours, setBookingHours] = useState(1);
    const [showBookingBtn, setShowBookingBtn] = useState(false);

    const { newBooking } = useApiPrivate();

    const handleDateTimeChange = (e, setter) => {
        let dateTime = dayjs(e.target.value);
        const minute = dateTime.minute();
        if (minute > 30) dateTime.add(1, "hour");
        dateTime = dateTime.minute(0).second(0).millisecond(0);
        setter(dateTime.format("YYYY-MM-DDTHH:mm"));
    };

    useEffect(() => {
        let now = dayjs();
        if (now.minute > 30) now.add(1, "hour");
        now = now.minute(0).second(0).millisecond(0);
        setBookingStartTime(now.format("YYYY-MM-DDTHH:mm"));
        setBookingEndTime(now.add(1, "hour").format("YYYY-MM-DDTHH:mm"));
    }, [show]);

    const checkAvailability = (e) => {
        e.preventDefault();
        if (bookingStartTime === bookingEndTime) {
            setBookingErr("Start Date & End Date cannot be same!");
            return;
        }
        const startTime = dayjs(bookingStartTime);
        const endTime = dayjs(bookingEndTime);

        const diffHours = endTime.diff(startTime, "hours");
        if (diffHours < 1) {
            setBookingErr("Booking should be of minimum 1 hour!");
            return;
        }
        if (diffHours > 48) {
            setBookingErr("Booking can be of maximum 2 days!");
            return;
        }
        const isBookingDateInRange = car.bookingDetails.some((booking) => {
            const bookingFrom = dayjs(booking.from);
            const bookingTo = dayjs(booking.to);
            return (
                startTime.isBetween(bookingFrom, bookingTo, "minute", "[]") ||
                endTime.isBetween(bookingFrom, bookingTo, "minute", "[]") ||
                bookingFrom.isBetween(startTime, endTime, "minute", "[]") ||
                bookingTo.isBetween(startTime, endTime, "minute", "[]")
            );
        });
        if (isBookingDateInRange) return setBookingErr("Car is booked for selected date!");
        setBookingErr("");
        setBookingHours(diffHours);
        setShowBookingBtn(true);
    };

    const closeModal = () => {
        setBookingErr("");
        setBookingHours(1);
        setShowBookingBtn(false);
        handleClose();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await newBooking({ carId: car.id, bookingStartTime, bookingEndTime, bookingHours });
        if (data.next === "redirect") {
            window.open(data.url, "_blank");
            closeModal();
        } else alert(data.message || "Something went wrong!");
    };

    return (
        car && (
            <Modal show={show} onHide={closeModal} backdrop="static" keyboard={false} className="booking-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Book Your Ride</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="mb-4">
                        <Col md={4} className="car-image-col">
                            <div className="car-image-container">
                                <img src={car.imgSrc} alt={car.name} className="img-fluid" />
                            </div>
                        </Col>
                        <Col md={8}>
                            <h3 className="car-title">{car.name}</h3>
                            <div className="car-details">
                                <div className="car-detail-item">
                                    <span className="detail-label">Fuel Type:</span>
                                    <span className="detail-value">{car.fuel.replace(/\b\w/g, (char) => char.toUpperCase())}</span>
                                </div>
                                <div className="car-detail-item">
                                    <span className="detail-label">Seats:</span>
                                    <span className="detail-value">{car.seats}</span>
                                </div>
                                <div className="car-detail-item">
                                    <span className="detail-label">Hourly Rate:</span>
                                    <span className="detail-value price">₹{car.rent}/hour</span>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Form className="booking-form" onSubmit={handleSubmit}>
                        <Card className="mb-4">
                            <Card.Body>
                                <h5 className="mb-3">Select Booking Time</h5>
                                <Row className="g-3 mb-3">
                                    <Col md={6}>
                                        <FloatingLabel controlId="bookingStartTime" label="From">
                                            <FormControl
                                                type="datetime-local"
                                                value={bookingStartTime}
                                                onChange={(e) => setBookingStartTime(e.target.value)}
                                                onBlur={(e) => handleDateTimeChange(e, setBookingStartTime)}
                                                disabled={showBookingBtn}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                    <Col md={6}>
                                        <FloatingLabel controlId="bookingEndTime" label="To">
                                            <FormControl
                                                type="datetime-local"
                                                value={bookingEndTime}
                                                onChange={(e) => setBookingEndTime(e.target.value)}
                                                onBlur={(e) => handleDateTimeChange(e, setBookingEndTime)}
                                                disabled={showBookingBtn}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                
                                {bookingErr && <Alert variant="danger">{bookingErr}</Alert>}
                                
                                {!showBookingBtn && (
                                    <div className="d-grid">
                                        <Button variant="accent" onClick={checkAvailability}>
                                            Check Availability
                                        </Button>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>

                        {showBookingBtn && (
                            <Card className="summary-card">
                                <Card.Header>
                                    <h5 className="mb-0">Booking Summary</h5>
                                </Card.Header>
                                <Card.Body>
                                    <div className="summary-item">
                                        <span>Rent</span>
                                        <span>₹{car.rent}/hour</span>
                                    </div>
                                    <div className="summary-item">
                                        <span>Duration</span>
                                        <span>{bookingHours} hours</span>
                                    </div>
                                    <div className="summary-item total">
                                        <span>Total Cost</span>
                                        <span>₹{(car.rent ?? 0) * bookingHours}</span>
                                    </div>
                                    
                                    <div className="d-flex justify-content-between mt-4">
                                        <Button variant="outline-secondary" onClick={() => setShowBookingBtn(false)}>
                                            Change Details
                                        </Button>
                                        <Button variant="accent" type="submit">
                                            Book Now
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        )}
                    </Form>
                </Modal.Body>
            </Modal>
        )
    );
}
