import styled from "styled-components";

const Landing = () => {
    return (
        <Wrapper>
            <h1>landing page</h1>
        </Wrapper>
    );
};

export default Landing;

const Wrapper = styled.main`
  background-color: var(--Dark-Light-Mode-Switch-Background-Color);
  color: var(--Main-Text-Color);
`;