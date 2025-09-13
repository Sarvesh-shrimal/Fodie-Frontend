import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext, useAuth } from "@/context/AuthContext";
import { AuthGoogle, AuthLogin, AuthSignup } from "@/services/auth/Auth";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
declare const google: any;

export function Login() {

  const {login} = useAuth();
  const [signup, setSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);
  const [confirmpassword, setConfirmPassword] = useState("");
  const Navigate = useNavigate();

  const handleGoogleLogin = () => {
    try {
      const client = google.accounts.oauth2.initTokenClient({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: "openid email profile",
        callback: async (response: any) => {
          const idToken = response.access_token;
          const data = await AuthGoogle({ idToken });
          login({ accessToken: data.accessToken, user: data.user });
          toast.success("Login successfully");
        },
      });

      Navigate("/")
      client.requestAccessToken();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  console.log("hello")
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      if (signup) {
        if (password !== confirmpassword) {
          toast.error(" Password and Confirm Password Should Match");
        }
        const payload = {
          name,
          email,
          password,
          confirmpassword,
        };

        const data = await AuthSignup({ payload });
        if (!data.ok) {
          setSignup(false);
        }
        toast.success("Account Created");
      } else {
        const payload = {
          email,
          password,
        };
        const data = await AuthLogin({ payload });

        login({ accessToken: data.accessToken, user: data.user });
        toast.success("Login Successfully");
        Navigate("/")
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div className="flex items-center justify-center max-h-screen p-25">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button
              variant="link"
              onClick={() => {
                setSignup(!signup);
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setName("");
              }}
            >
              {signup ? "Login" : "Sign Up"}
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              {signup ? (
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              ) : (
                ""
              )}

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {signup ? (
                    ""
                  ) : (
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
                    tabIndex={-1}
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
              </div>
              {signup ? (
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showconfirmPassword ? "text" : "password"}
                      placeholder="Re-enter Password"
                      value={confirmpassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowconfirmPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
                      tabIndex={-1}
                    >
                      {showconfirmPassword ? (
                        <Eye size={18} />
                      ) : (
                        <EyeOff size={18} />
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full bg-[#ff6347]"
            onClick={handleSubmit}
          >
            {signup ? "Sign Up" : "Login"}
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleLogin}
          >
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
