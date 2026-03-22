import { useState } from "react";
import Navbar from "../components/Navbar";

import BookingSteps from "../components/booking/BookingSteps";
import VehicleSelector from "../components/booking/VehicleSelector";
import PackageSelector from "../components/booking/PackageSelector";
import DateTimeSelector from "../components/booking/DateTimeSelector";
import UserForm from "../components/booking/UserForm";
import OrderSummary from "../components/booking/OrderSummary";

export default function Booking() {
  const [step, setStep] = useState(1);

  const [bookingData, setBookingData] = useState({
    vehicle: "",
    package: null,
    date: "",
    time: "",
    name: "",
    phone: "",
    address: ""
  });

  return (
    <>
      <Navbar />

      <div className="page active">
        <div className="booking-layout container">

          <div className="booking-main">
            <h1 className="booking-title">Book Service</h1>

            <BookingSteps step={step} />

            {step === 1 && (
              <VehicleSelector
                bookingData={bookingData}
                setBookingData={setBookingData}
                next={() => setStep(2)}
              />
            )}

            {step === 2 && (
              <PackageSelector
                bookingData={bookingData}
                setBookingData={setBookingData}
                next={() => setStep(3)}
              />
            )}

            {step === 3 && (
              <DateTimeSelector
                bookingData={bookingData}
                setBookingData={setBookingData}
                next={() => setStep(4)}
              />
            )}

            {step === 4 && (
              <UserForm
                bookingData={bookingData}
                setBookingData={setBookingData}
                next={() => alert("Ready for payment 🔥")}
              />
            )}
          </div>

          <OrderSummary bookingData={bookingData} />
        </div>
      </div>
    </>
  );
}