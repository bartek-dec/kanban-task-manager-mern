import {TbLayoutBoardSplit} from 'react-icons/tb';
import {useDispatch} from "react-redux";
import {setCurrentBoardName, setActiveBoard} from "../features/board/boardSlice";
import {NavLink} from "react-router-dom";

const BoardListItem = ({title, id}) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setCurrentBoardName(title));
        dispatch(setActiveBoard(id));
    }

    return (
        <NavLink to={`/${id}`} className={({isActive}) => {
            return isActive ? 'board-btn active' : 'board-btn'
        }} onClick={handleClick}>
            <TbLayoutBoardSplit className='icon-img'/>
            <h4>{title}</h4>
        </NavLink>
    );
};

export default BoardListItem;