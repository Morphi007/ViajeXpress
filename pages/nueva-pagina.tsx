import React, { useState, ChangeEvent } from 'react';
import { ExpressLayout } from '@/components/layout';
import { useRouter } from 'next/router';

const NuevaPagina = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [currentBalance, setCurrentBalance] = useState(0);
  const [message, setMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const router = useRouter();

  const handleRecharge = () => {
    if (cardNumber && amount && paymentMethod) {
      setCurrentBalance(currentBalance + parseFloat(amount));
      setMessage(`Tarjeta ${cardNumber} recargada con ${amount} unidades usando ${paymentMethod}.`);
    } else {
      setMessage('Por favor, completa todos los campos.');
    }
  };

  const handlePaymentMethodChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handleCardDetailsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCardDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value
    }));
  };

  return (
    <ExpressLayout title="Recargar Tarjeta">
      <div className="bg-gray-100 dark:bg-gray-800 py-12 relative">
        <div className="max-w-screen-xl mx-auto px-4">
          <button
            onClick={() => router.back()}
            className="mb-4 px-4 py-2 bg-gray-600 text-white rounded-lg shadow-lg hover:bg-gray-700"
          >
            Volver
          </button>
          <h1 className="text-4xl font-bold text-center mb-6 text-gray-900 dark:text-white animate-fadeInUp">
            Recargar Tarjeta del Metro
          </h1>
          <p className="text-xl text-center mb-8 text-gray-700 dark:text-gray-300 animate-fadeInUp">
            Introduce el número de tu tarjeta y el monto que deseas recargar.
          </p>
          <div className="max-w-md mx-auto bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
            <div className="mb-4">
              <label htmlFor="cardNumber" className="block text-gray-700 dark:text-gray-300 text-lg font-semibold mb-2">
                Número de Tarjeta
              </label>
              <input
                type="text"
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                placeholder="Número de tarjeta"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="amount" className="block text-gray-700 dark:text-gray-300 text-lg font-semibold mb-2">
                Monto a Recargar
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                placeholder="Monto"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="paymentMethod" className="block text-gray-700 dark:text-gray-300 text-lg font-semibold mb-2">
                Método de Pago
              </label>
              <select
                id="paymentMethod"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              >
                <option value="">Selecciona un método</option>
                <option value="tarjeta de crédito">Tarjeta de Crédito</option>
                <option value="tarjeta de débito">Tarjeta de Débito</option>
              </select>
            </div>
            {paymentMethod && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Detalles de la Tarjeta
                </h2>
                <div className="mb-4">
                  <label htmlFor="expiryDate" className="block text-gray-700 dark:text-gray-300 text-lg font-semibold mb-2">
                    Fecha de Expiración
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    value={cardDetails.expiryDate}
                    onChange={handleCardDetailsChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    placeholder="MM/AA"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="cvv" className="block text-gray-700 dark:text-gray-300 text-lg font-semibold mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    value={cardDetails.cvv}
                    onChange={handleCardDetailsChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    placeholder="CVV"
                  />
                </div>
              </div>
            )}
            <button
              onClick={handleRecharge}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700"
            >
              Recargar
            </button>
            {message && <p className="mt-4 text-center text-lg font-semibold text-gray-900 dark:text-white">{message}</p>}
          </div>
          <div className="absolute top-4 right-4 bg-blue-800 text-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Monto Actual</h3>
            <p className="text-lg font-bold">${currentBalance.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </ExpressLayout>
  );
};

export default NuevaPagina;
