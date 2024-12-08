from flask import Flask, request, jsonify
from flask_cors import CORS
import razorpay
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize Razorpay client
razorpay_client = razorpay.Client(
    auth=(os.getenv('RAZORPAY_KEY_ID'), os.getenv('RAZORPAY_KEY_SECRET'))
)

@app.route('/create-order', methods=['POST'])
def create_order():
    try:
        data = request.json
        amount = data.get('amount')  # amount should be in paise (multiply by 100)
        
        # Create Razorpay Order
        order_data = {
            'amount': amount,
            'currency': 'INR',
            'payment_capture': 1,  # Auto capture payment
            'upi_link': True  # Enable UPI payment link
        }
        
        order = razorpay_client.order.create(data=order_data)
        
        return jsonify({
            'id': order['id'],
            'amount': order['amount'],
            'currency': order['currency']
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/verify-payment', methods=['POST'])
def verify_payment():
    try:
        data = request.json
        
        # Verify payment signature
        params_dict = {
            'razorpay_payment_id': data.get('paymentId'),
            'razorpay_order_id': data.get('orderId'),
            'razorpay_signature': data.get('signature')
        }
        
        razorpay_client.utility.verify_payment_signature(params_dict)
        
        return jsonify({'status': 'success'})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
