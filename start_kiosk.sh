#!/bin/bash

# Wait for network
sleep 10

# Start the backend server
cd /home/mithun/Documents/vending_front_backend/backend
source venv/bin/activate
python app.py &

# Wait for backend to start
sleep 5

# Start frontend server
cd /home/mithun/Documents/vending_front_backend/frontend
npm run dev &

# Wait for frontend to start
sleep 10

# Launch Chromium in kiosk mode
chromium --kiosk --incognito --disable-pinch --overscroll-history-navigation=0 --disable-features=TranslateUI --noerrdialogs --disable-infobars --check-for-update-interval=31536000 --disable-session-crashed-bubble --disable-component-update --disable-restore-session-state http://localhost:5173/
