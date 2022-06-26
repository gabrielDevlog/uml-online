import * as React from "react";
import axios from "axios";
import { config } from "../config";
import { JwtToLocalStorage } from "uml-jwt";
import { emit } from "front-components";
import { EventEnum } from "uml-event-bus";
import * as validate from "validate.js";
import { Form as FormFF, Field as FieldFF } from "react-final-form";
import { InputTxt } from "./InputTxt";
import { Link } from "react-router-dom";

/**
 * Input validators
 */
const password = (val: string): string | undefined =>
  validate.single(val, {
    presence: { message: "Required" },
    length: {
      minimum: 2,
      tooShort: "Too short. %{count} characters minimum",
      maximum: 20,
      tooLong: "Too long. %{count} characters maximum",
    },
  });

const email = (val: string): string | undefined =>
  validate.single(val, {
    presence: { message: "Required" },
    email: { message: "Invalid email" },
  });

interface State {
  error: null | string;
}

export class LoginForm extends React.Component<{}, State> {
  state = {
    error: null,
  };

  loginHandler = async (values: { email: string; password: string }) => {
    const dto = {
      email: values.email,
      password: values.password,
    };

    try {
      const resp = await axios.post(config.api.url + "/public/login", dto);
      this.setState({ error: null });

      JwtToLocalStorage(resp.data);
      emit(EventEnum.LOGIN);
    } catch (e) {
      this.setState({ error: "Wrong login" });
    }
  };

  closeHandler = () => this.setState({ error: null });

  render() {
    return (
      <div>
        {/* error */}
        {this.state.error && (
          <div className="alert alert-danger" role="alert">
            {this.state.error}
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={this.closeHandler}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}

        {/* Form */}
        <FormFF
          onSubmit={this.loginHandler}
          render={({ handleSubmit, pristine, invalid }) => (
            <form onSubmit={handleSubmit}>
              <FieldFF
                name="email"
                id="email"
                label="email"
                type="text"
                placeholder="mail@host.com"
                children={InputTxt}
                validate={email}
              />
              <FieldFF
                name="password"
                id="password"
                label="password"
                type="password"
                placeholder="xxxx"
                children={InputTxt}
                validate={password}
              />
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={pristine || invalid}
                >
                  Log in
                </button>
              </div>
            </form>
          )}
        />

        {/* Go to ... */}
        <p className="text-center">
          No account ?<Link to="/signup"> Create one</Link>
        </p>
      </div>
    );
  }
}
