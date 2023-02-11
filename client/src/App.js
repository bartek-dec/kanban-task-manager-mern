import {Landing, Register, Error, ProtectedRoute} from './pages';
import {AddBoard, Profile, SharedLayout} from './pages/dashboard';
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
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
