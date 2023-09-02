import { Link } from "@remix-run/react";

export default function ReservationDenied(){
    return <div>
        <p>You have passed the limit of 1 reservation per person.
            Please cancel your current reservation if you wish to continue.
        </p>
        <Link to="/dashboard/reservationStatus">Check Reservation Status</Link>
    </div>
}