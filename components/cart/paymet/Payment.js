import React, { useState, useEffect } from "react";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import visaLogo from "../assets/visa.png";
import masterCardLogo from "../assets/mastercard.png";
import amexLogo from "../assets/american-express.png";
import { CircularProgress } from "@mui/material";
import { CheckCircleIcon } from "@heroicons/react/24/outline"; // Usa Heroicons o cualquier otro ícono de check

const PaymentMethodForm = () => {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardType, setCardType] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false); // Estado para manejar la carga
  const [success, setSuccess] = useState(false); // Estado para manejar el éxito del pago

  useEffect(() => {
    const firstTwoDigits = cardNumber.replace(/\D/g, "").slice(0, 2);
    if (firstTwoDigits.startsWith("4")) {
      setCardType("visa");
    } else if (firstTwoDigits >= "51" && firstTwoDigits <= "55") {
      setCardType("mastercard");
    } else if (firstTwoDigits === "34" || firstTwoDigits === "37") {
      setCardType("amex");
    } else {
      setCardType("");
    }
  }, [cardNumber]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      cardName,
      cardNumber,
      expiryDate,
      cvv,
      address,
      city,
      state,
      zipCode,
      country,
    });
    setLoading(true); // Muestra el indicador de carga
    setSuccess(false); // Asegúrate de ocultar el mensaje de éxito

    // Simulación de solicitud de pago
    setTimeout(() => {
      setLoading(false);
      setSuccess(true); // Muestra el mensaje de éxito
    }, 2000); // Simula una carga de 2 segundos
  };

  const getCardLogo = () => {
    switch (cardType) {
      case "visa":
        return <img src={visaLogo} alt="Visa" className="w-8 h-auto" />;
      case "mastercard":
        return (
          <img src={masterCardLogo} alt="MasterCard" className="w-8 h-auto" />
        );
      case "amex":
        return (
          <img src={amexLogo} alt="American Express" className="w-8 h-auto" />
        );
      default:
        return <CreditCardIcon />;
    }
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove all non-digit characters
    let formattedValue = "";

    if (cardType === "amex") {
      // American Express: 4-6-5 format
      if (value.length > 15) {
        value = value.slice(0, 15);
      }
      formattedValue = value
        .replace(/(\d{4})(\d{6})(\d{0,5})/, "$1-$2-$3")
        .replace(/-$/, "");
    } else {
      // Visa and MasterCard: 4-4-4-4 format
      if (value.length > 16) {
        value = value.slice(0, 16);
      }
      formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1-").replace(/-$/, "");
    }

    setCardNumber(formattedValue);
  };

  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove all non-digit characters
    if (value.length > 4) {
      value = value.slice(0, 4);
    }
    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    setExpiryDate(value);
  };

  const handleNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Remove non-letter characters
    setCardName(value);
  };

  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove all non-digit characters
    if (value.length > 4) {
      value = value.slice(0, 4);
    }
    setCvv(value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handleZipCodeChange = (e) => {
    setZipCode(e.target.value.replace(/\D/g, "")); // Remove non-digit characters
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  return (
    <div className="relative flex items-center justify-center bg-gray-100">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <CircularProgress size={60} />
        </div>
      )}
      {success && !loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800">
              Pago Realizado
            </h2>
          </div>
        </div>
      )}
      {!loading && !success && (
        <div className="w-full max-w-lg bg-white p-8">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Información de la tarjeta */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Información de la Tarjeta
                </h2>
                <div>
                  <label
                    htmlFor="cardName"
                    className="block text-gray-700 text-sm font-medium"
                  >
                    Nombre en la tarjeta
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    value={cardName}
                    onChange={handleNameChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="cardNumber"
                    className="block text-gray-700 text-sm font-medium"
                  >
                    Número de la tarjeta
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="cardNumber"
                      className="w-full border border-gray-300 rounded-lg p-2 pl-12 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      {getCardLogo()}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="expiryDate"
                      className="block text-gray-700 text-sm font-medium"
                    >
                      Fecha de Expiración
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="MM/AA"
                      required
                      value={expiryDate}
                      onChange={handleExpiryDateChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cvv"
                      className="block text-gray-700 text-sm font-medium"
                    >
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      value={cvv}
                      onChange={handleCvvChange}
                    />
                  </div>
                </div>
              </div>

              {/* Dirección de facturación */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Dirección de Facturación
                </h2>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-gray-700 text-sm font-medium"
                  >
                    Dirección
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    value={address}
                    onChange={handleAddressChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-gray-700 text-sm font-medium"
                    >
                      Ciudad
                    </label>
                    <input
                      type="text"
                      id="city"
                      className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      value={city}
                      onChange={handleCityChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-gray-700 text-sm font-medium"
                    >
                      Estado/Provincia
                    </label>
                    <input
                      type="text"
                      id="state"
                      className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      value={state}
                      onChange={handleStateChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-gray-700 text-sm font-medium"
                    >
                      País
                    </label>
                    <input
                      type="text"
                      id="country"
                      className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      value={country}
                      onChange={handleCountryChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="zipCode"
                      className="block text-gray-700 text-sm font-medium"
                    >
                      Código Postal
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      value={zipCode}
                      onChange={handleZipCodeChange}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#2563eb] text-white py-2 rounded-lg hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Pagar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodForm;
