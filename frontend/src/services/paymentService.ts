const API_URL = 'http://localhost:5000';

export const createOrder = async (amount: number) => {
    try {
        const response = await fetch(`${API_URL}/create-order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: amount * 100, // Convert to paise
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to create order');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

export const verifyPayment = async (paymentId: string, orderId: string, signature: string) => {
    try {
        const response = await fetch(`${API_URL}/verify-payment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                paymentId,
                orderId,
                signature,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to verify payment');
        }

        return await response.json();
    } catch (error) {
        console.error('Error verifying payment:', error);
        throw error;
    }
};
