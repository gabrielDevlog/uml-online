import * as React from "react";
import axios from "axios";
import { config } from "../config";
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
      tooLong: "Too long. %{count} characters maximum"
    }
  });

const email = (val: string): string | undefined =>
  validate.single(val, {
    presence: { message: "Required" },
    email: { message: "Invalid email" }
  });

interface State {
  error: null | string;
  success: null | boolean;
}

export class SignupForm extends React.Component<{}, State> {
  state = {
    success: null,
    error: null
  };

  signupHandler = async (values: { email: string; password: string }) => {
    const dto = {
      email: values.email,
      password: values.password
    };

    try {
      await axios.post(config.api.url + "/public/account", dto);
      this.setState({ error: null, success: true });
    } catch (e) {
      this.setState({ error: "Error while signup" });
    }
  };

  closeHandler = () => this.setState({ error: null });

  render() {
    return (
      <div>
        {/* success message */}
        {this.state.success && (
          <div className="alert alert-success" role="alert">
            Account created. Now you can <Link to="/login">login</Link>
          </div>
        )}

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
          onSubmit={this.signupHandler}
          validate={(values: {
            email: string;
            password: string;
            confirmation: string;
          }) => {
            if (values.confirmation !== values.password) {
              return { confirmation: "Password does not match" };
            }
          }}
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

              <FieldFF
                name="confirmation"
                id="confirmation"
                label="confirmation"
                type="password"
                placeholder="xxxx"
                children={InputTxt}
              />

              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={pristine || invalid}
                >
                  Sign up
                </button>
              </div>
            </form>
          )}
        />

        {/* Go to ... */}
        <p className="text-center">
          Already have an account ? <Link to="/login">Login</Link>
        </p>
      </div>
    );
  }
}
