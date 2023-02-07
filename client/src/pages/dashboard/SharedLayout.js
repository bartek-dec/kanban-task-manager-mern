import {Link, Outlet} from "react-router-dom";

const SharedLayout = () => {
    return (
        <div>
            <nav>
                <Link to='/add-board'>add board</Link>
                <Link to='/profile'>profile</Link>
            </nav>
            <Outlet/>
        </div>
    );
};

export default SharedLayout;