import {Outlet} from "react-router-dom";
import styled from "styled-components";
import {Sidebar, Navbar} from '../../components';

const SharedLayout = () => {
    return (
        <Wrapper>
            <main className='dashboard'>
                <Sidebar/>
                <div>
                    <Navbar/>
                    <Outlet/>
                </div>
            </main>
        </Wrapper>
    );
};

export default SharedLayout;

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns:auto 1fr;
  }
`;