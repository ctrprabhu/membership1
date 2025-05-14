import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-6">
        Subscription Management System
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Manage your subscription plans and members efficiently
      </p>
      <Button size="lg" onClick={() => navigate("/dashboard")} className="px-8">
        Go to Dashboard
      </Button>
    </div>
  );
}

export default Home;
