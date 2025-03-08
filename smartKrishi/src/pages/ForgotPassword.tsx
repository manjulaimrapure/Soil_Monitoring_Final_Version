
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sprout, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ForgotPassword = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Send password reset email (to be implemented)
    console.log("Password reset request for:", email);
    setIsSubmitted(true);
    toast({
      title: "Reset link sent",
      description: "If an account exists with that email, you'll receive a password reset link",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] animate-fade-in">
      <Card className="w-full max-w-md border-soil-200">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <Sprout className="h-12 w-12 text-soil-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-soil-800">Reset your password</CardTitle>
          <CardDescription className="text-soil-600">
            Enter your email address and we'll send you a link to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-soil-700">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-soil-200 focus:border-soil-500"
                />
              </div>
              <Button type="submit" className="w-full bg-soil-600 hover:bg-soil-700">
                Send Reset Link
              </Button>
            </form>
          ) : (
            <div className="text-center py-4 space-y-4">
              <div className="bg-green-50 text-green-700 p-4 rounded-md">
                Check your email for a reset link. It will expire in 1 hour.
              </div>
              <Button 
                variant="outline" 
                className="mt-4" 
                onClick={() => setIsSubmitted(false)}
              >
                Try another email
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Link to="/login" className="text-soil-600 hover:text-soil-800 inline-flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPassword;
