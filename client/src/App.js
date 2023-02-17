import {Landing, Register, Error, ProtectedRoute} from './pages';
import {AddBoard, Profile, SharedLayout} from './pages/dashboard';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useEffect} from "react";
import {useSelector} from "react-redux";

function App() {
    const {theme} = useSelector((state) => state.theme);

    useEffect(() => {
        if (theme === 'light') {
            document.body.classList.add('light');
        }
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<ProtectedRoute><SharedLayout/></ProtectedRoute>}>
                    <Route path='profile' element={<Profile/>}/>
                    <Route path='add-board' element={<AddBoard/>}/>
                </Route>
                <Route path='/register' element={<Register/>}/>
                <Route path='/landing' element={<Landing/>}/>
                <Route path='*' element={<Error/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
