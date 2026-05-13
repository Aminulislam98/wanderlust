"use client";
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { redirect } from "next/navigation";
const LoginPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password, // user password -> min 8 characters by default
    });
    if (data) {
      redirect("/");
    }
  };
  return (
    <div className="max-w-7xl mx-auto w-full py-10 px-4">
      <div className="py-4">
        <p className="text-center text-xl font-semibold">Login your account</p>
        <p className="text-center text-sm ">
          Start your adventure with Wanderlust
        </p>
      </div>

      <Form
        className="flex max-w-md mx-auto rounded-2xl p-5 flex-col gap-4 border "
        onSubmit={onSubmit}
      >
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label>Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>
        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }
            return null;
          }}
        >
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
          <FieldError />
        </TextField>
        <div className="flex gap-2">
          <Button className="w-full" type="submit">
            <Check />
            Login
          </Button>
          <Button type="reset" variant="secondary" className="w-full">
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
