
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center max-w-md w-full px-4">
        <h1 className="text-3xl font-bold mb-6">Terminal POS PAX D230</h1>
        <p className="text-lg text-gray-700 mb-8">Demonstração de interface para entrada de telefone</p>
        
        <Button 
          className="w-full py-6 text-lg" 
          onClick={() => navigate("/phone")}
        >
          Iniciar Demonstração
        </Button>
      </div>
    </div>
  );
};

export default Index;
