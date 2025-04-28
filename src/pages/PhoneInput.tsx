
import { useState, useEffect, useRef } from "react";

const PhoneInput = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Apply mask as the user types: (xx)xxxxx-xxxx
  const applyPhoneMask = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "");
    
    // Limit to maximum 11 digits (Brazilian phone format)
    const limitedDigits = digits.slice(0, 11);
    
    // Apply the mask based on the number of digits
    if (limitedDigits.length <= 2) {
      return limitedDigits.length ? `(${limitedDigits}` : "";
    } else if (limitedDigits.length <= 7) {
      return `(${limitedDigits.slice(0, 2)})${limitedDigits.slice(2)}`;
    } else {
      return `(${limitedDigits.slice(0, 2)})${limitedDigits.slice(2, 7)}-${limitedDigits.slice(7)}`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = applyPhoneMask(e.target.value);
    setPhoneNumber(maskedValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow only digits, backspace, delete, tab, arrows
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'];
    if (!/\d/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  // Focus input field when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Insira seu Telefone:</h1>
        </div>
        
        <div className="mb-4">
          <input
            ref={inputRef}
            type="tel"
            value={phoneNumber}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="w-full border-2 border-gray-300 rounded-md px-4 py-3 text-xl text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="(00)00000-0000"
            autoComplete="off"
          />
        </div>

        <div className="text-sm text-gray-500 text-center">
          {phoneNumber.replace(/\D/g, "").length}/11 dígitos
        </div>

        {phoneNumber.replace(/\D/g, "").length === 11 && (
          <div className="mt-4 text-center text-green-600 font-medium">
            Número de telefone válido!
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneInput;
