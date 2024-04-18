import { Route, Routes } from "react-router-dom";
import TestPage from "../../pages/test/testPage";

const TestRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/testdb" element = {<TestPage/>}></Route>   
      </Routes>
    </div>
  );
};

export default TestRouter;