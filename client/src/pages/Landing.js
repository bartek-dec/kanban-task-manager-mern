import styled from "styled-components";
import {Logo} from '../components';
import {Link} from 'react-router-dom';
import image from '../assets/images/undraw_scrum_board_re_wk7v.svg';

const Landing = () => {
    return (
        <Wrapper>
            <div className='container'>
                <nav className='nav'>
                    <Logo/>
                </nav>
                <div className='content'>
                    <div className='info'>
                        <h1>Kanban <span>Task</span> Manager</h1>
                        <p>Bodega boys health goth listicle synth ascot glossier. Bushwick affogato bitters photo booth
                            single-origin coffee la croix gluten-free. Chicharrones everyday carry gatekeep, sustainable
                            thundercats vice meggings synth pork belly humblebrag ascot flexitarian portland.</p>
                        <Link to='/register' className='btn register-btn'>Login/Register</Link>
                    </div>
                    <div className='graphic'>
                        <img src={image} alt='kanban image'/>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default Landing;

const Wrapper = styled.main`
  background-color: var(--Dark-Light-Mode-Switch-Background-Color);

  .container {
    width: 90vw;
    max-width: var(--application-width);
    margin: 0 auto;
  }

  .nav {
    height: 7rem;
    display: flex;
    align-items: center;
  }

  .content {
    height: calc(100vh - 7rem);
    margin-top: -3rem;
    display: grid;
    align-items: center;
  }

  .info {
    h1 {
      color: var(--Main-Text-Color);
      font-size: 3rem;
      margin-bottom: 2rem;
      letter-spacing: 2px;
    }

    span {
      color: var(--Main-Purple);
    }

    p {
      line-height: var(--line-height-30);
      letter-spacing: 1px;
      margin-bottom: 3rem;
    }
  }

  .register-btn {
    color: var(--Main-Text-Color);
    background-color: var(--Main-Purple);
  }

  .register-btn:hover {
    background-color: var(--Main-Purple-Hover-2);
  }

  .graphic {
    display: none;
  }

  @media (min-width: 992px) {
    .content {
      grid-template-columns: 1fr 1fr;
      column-gap: 5rem;
    }

    .graphic {
      display: block;
    }
  }
`;