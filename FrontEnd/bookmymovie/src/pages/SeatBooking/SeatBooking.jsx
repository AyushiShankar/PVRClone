import {useSelector} from "react-redux";
import { getSelectedMovie } from "../../Redux/movieSlice";
import MovieCrousel from "../../components/MovieCrousel/MovieCrousel";


export default function SeatBooking(){
const movie = useSelector(getSelectedMovie);

    return <p>Seat Booked....</p>
}