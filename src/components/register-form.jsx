import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { instance } from "@/api/instance";


export function RegisterForm({ className, ...props }) {
  const [name, setName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [avatar, setAvatar] = React.useState(null);
  const navigate = useNavigate();
  let userData = {
    name,
    email,
    password,
    avatar,
  };

  console.log(userData);


  const register = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post("/users", userData);
      console.log(response);
      navigate("/");
    } catch (error) {
      toast(error.message);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="shadow-none border-none">
        <CardHeader>
          <CardTitle>Register to your account</CardTitle>
          <CardDescription>Enter your email to sign up.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={register}>
            <div className="flex flex-col gap-6">

              {/* name */}
              <div className="grid gap-3">
                <Label htmlFor="name">Last Name</Label>
                <Input
                  onChange={({ target }) => setName(target.value)}
                  id="name"
                  type="name"
                  placeholder="Your Last Name"
                  required
                />
              </div>

              {/* email  */}
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={({ target }) => setEmail(target.value)}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>

              {/* password */}
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  onChange={({ target }) => setPassword(target.value)}
                  id="password"
                  type="password"
                  placeholder="********"
                  required
                />
              </div>

              {/* avater */}
              <div className="grid gap-3">
                <Label htmlFor="avatar">Avater (url)</Label>

                <Input
                  onChange={({ target }) => setAvatar(target.value)}
                  id="avatar"
                  type="url"
                  placeholder="Your avatar "
                  required
                />
              </div>

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  register
                </Button>
                <Button variant="outline" className="w-full">
                  <Link to="/login"> Login</Link>
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "} <Link to={"/login"} className="underline underline-offset-4" >
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
