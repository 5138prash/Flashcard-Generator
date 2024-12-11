import { TiDelete } from "react-icons/ti";
import { useDispatch } from "react-redux";
import {deleteCard} from "../../redux/reducers/cardSlice"

// Deletes the FlashCard
export default function DeleteFlashCardButton({ index }) {

    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteCard(index));
    };

    return (
        <button
            onClick={handleDelete}
            className="absolute z-10 top-1 right-1 text-xl hover:text-[#cc1313] cursor-pointer w-11 h-11 flex items-center justify-center"
            aria-label="Delete"
        >
            <TiDelete />
        </button>
    );
}
