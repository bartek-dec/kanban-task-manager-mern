import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux";
import {closeModal} from "../features/logoutSlice/logoutSlice";
import {setUser, setToken} from "../features/registerLogin/registerLoginSlice";
import {removeUserFromLocalStorage} from "../utils/localStorage";

const LogoutModal = () => {
    const {isModalOpen} = useSelector((state) => state.logout);
    const dispatch = useDispatch();

    const handleModalClick = (e) => {
        if (e.target.classList.contains('modal')) {
            dispatch(closeModal());
        }
    }

    const logoutUser = () => {
        dispatch(closeModal());
        dispatch(setToken(null));
        dispatch(setUser(null));
        removeUserFromLocalStorage();
    }

    return (
        <Wrapper className={isModalOpen ? 'modal show-modal' : 'modal'} onClick={handleModalClick}>
            <button type='button' onClick={logoutUser}>Logout</button>
        </Wrapper>
    );
};

export default LogoutModal;

const Wrapper = styled.div`
  button {
    position: absolute;
    right: 1rem;
    top: calc(var(--Navbar-Height) - 1rem);

    padding: 0.85rem 1.5rem;
    background-color: var(--Dark-Light-Mode-Switch-Background-Color);
    border: none;
    border-radius: var(--border-radius-6);
    color: var(--Red);
    font-weight: var(--font-weight-7);
    font-size: var(--font-size-20);
    cursor: pointer;
    transition: transform 0.3s linear;
  }

  button:hover {
    transform: scale(1.1);
  }
`;