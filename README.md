SecureStego – Image Steganography Tool

SecureStego is a web-based image steganography application that allows users to hide secret messages inside images securely.

It combines AES-256-GCM encryption and Least Significant Bit (LSB) steganography to provide an additional layer of privacy.

Features

- Hide secret messages inside images.
- Extract hidden messages using a password.
- AES-256-GCM encryption.
- Password-based key generation using PBKDF2-HMAC-SHA256.
- Image preview and drag-and-drop upload.
- Password strength indicator.
- Download encoded images.
- Copy extracted messages.
- Input validation and CSRF protection.

Technologies Used

Frontend

- HTML
- CSS
- JavaScript

Backend

- Python
- Flask

Libraries

- Pillow
- Cryptography
- Flask-WTF

How It Works

1. The user selects an image and enters a secret message.
2. The application encrypts the message using AES-256-GCM.
3. The encrypted data is converted into binary.
4. The binary data is hidden inside the image using LSB steganography.
5. The encoded image is downloaded as a PNG file.
6. The receiver uploads the encoded image and enters the correct password to extract the original message.

Installation and Setup

1. Clone the repository

git clone https://github.com/abihnavv/SecureStego.git

2. Open the project folder

cd SecureStego

3. Install dependencies

pip install -r requirements.txt

4. Run the application

python app.py

5. Open the website

Open your browser and visit:

http://127.0.0.1:5000

Security Features

- AES-256-GCM authenticated encryption.
- PBKDF2-HMAC-SHA256 key derivation.
- Random salt and nonce generation.
- File type and file size validation.
- CSRF protection.
- Password strength validation.

Limitations

- Resizing, editing, or compressing an encoded image may damage the hidden message.
- The original encoded PNG image and correct password are required for extraction.
- The application currently supports PNG and JPEG images for encoding and PNG images for decoding.

Author

Developed as a cybersecurity internship project.

License

This project is currently intended for educational and internship purposes.