# To push the code 
git add .  // file name

git commit -m "message"

git push origin main

# To pull the code
git pull origin main

# To start frontend 
- cd client/
- npm i
- npm start

# To start backend
- cd server
- npm i
- npm start

# To start ML
- cd server/src/ml
- source env/Scripts/activate
- pip install flask numpy pandas datetime textblob scikit-learn
- py pattern_detection.py  or  python pattern_detection.py 


# env file setup
- create env file outside client and server folder
- MONGODB_URL=..........
- PORT=5000
- JWT_SECRET=...........
