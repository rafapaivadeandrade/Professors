import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import TeacherList from "./pages/TeacherList";
import TeacherForm from "./pages/TeacherForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Concluded from "./pages/Concluded";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import RedefinitionSent from "./pages/RedefinitionSent";
import RegistraterSaved from "./pages/RegisterSaved";
import User from "./pages/User";

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/landing" component={Landing} />
      <Route path="/study" component={TeacherList} />
      <Route path="/give-classes" component={TeacherForm} />
      <Route path="/" component={Login} exact />
      <Route path="/register" component={Register} />
      <Route path="/concluded" component={Concluded} />
      <Route path="/forgotPassword" component={ForgotPassword} />
      <Route path="/resetPassword/:id" component={ResetPassword} />
      <Route path="/redefinitionSent" component={RedefinitionSent} />
      <Route path="/registrationSaved" component={RegistraterSaved} />
      <Route path="/profile/:value" component={User} />
    </BrowserRouter>
  );
}
export default Routes;
