import styled from "styled-components";
import {BsEye} from 'react-icons/bs';
import {useRef, useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {showSidebar} from "../features/sidebarSlice/sidebarSlice";

const ShowButton = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const {isSidebarVisible} = useSelector((state) => state.sidebar);
    const dispatch = useDispatch();
    const btnRef = useRef(null);

    const checkWidth = () => {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', checkWidth);
        // hide button when screen size is less than 650px
        if (width < 650) {
            btnRef.current.classList.remove('visible');
        }

        // show button when screen size is more than 650px and sidebar is hidden
        if (width >= 650 && !isSidebarVisible) {
            btnRef.current.classList.add('visible');
        }

        return () => {
            window.removeEventListener('resize', checkWidth);
        };
    });

    useEffect(() => {
        if (isSidebarVisible) {
            btnRef.current.classList.remove('visible');
        } else {
            btnRef.current.classList.add('visible');
        }
    }, [isSidebarVisible]);

    const handleClick = () => {
        dispatch(showSidebar());
    }

    return (
        <Wrapper type='button' ref={btnRef} onClick={handleClick}>
            <BsEye className='icon-img show-icon'/>
        </Wrapper>
    );
};

export default ShowButton;

const Wrapper = styled.button`
  position: fixed;
  left: 0;
  bottom: calc(var(--Settings-Height) / 2);
  transform: translateY(54%);

  border: none;
  border-bottom-right-radius: var(--border-radius-24);
  border-top-right-radius: var(--border-radius-24);
  cursor: pointer;
  padding: 0.85rem;
  padding-left: 1.25rem;
  background-color: var(--Main-Purple);
  transition: var(--transition);
  display: none;

  &:hover {
    background-color: var(--Main-Purple-Hover-3);
  }

  .show-icon {
    margin-right: 0;
    color: var(--White);
  }
`;
