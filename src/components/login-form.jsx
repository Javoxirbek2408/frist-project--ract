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
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "@/api/instance";
import { AuthContext } from "@/context/AuthContext";

export function LoginForm({ className, ...props }) {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
const [isLoading, setIsLoading] = React.useState(false);
  const { login: LoginFn } = React.useContext(AuthContext)

  const navigate = useNavigate();
  const userData = {
    email,
    password,
  };
  const login = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await instance.post("/auth/login", userData);
      LoginFn(response.data.access_token)
      setIsLoading(false);
      if (response.data.access_token) {
        return navigate("/");
      }
    } catch (error) {
      toast("xato malumot kiritilgan");
      setIsLoading(false);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={login}>
            <div className="flex flex-col gap-6">
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
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link className="underline underline-offset-4" to="/register">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
