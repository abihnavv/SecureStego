from PIL import Image
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
import os


# Generate encryption key from password
def generate_key(password, salt):

    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=600000
    )

    return kdf.derive(password.encode())


# Function to hide an encrypted message inside an image
def encode_image(input_path, output_path, message, password):

    image = Image.open(input_path).convert("RGB")
    pixels = list(image.getdata())

    # Generate salt and encryption key
    salt = os.urandom(16)
    key = generate_key(password, salt)

    # Encrypt message using AES-256-GCM
    aes = AESGCM(key)
    nonce = os.urandom(12)

    encrypted_message = aes.encrypt(
        nonce,
        message.encode("utf-8"),
        None
    )

    # Combine salt, nonce and encrypted message
    magic_header = b"STEG"
    data = magic_header + salt + nonce + encrypted_message

    # Store data length in 32 bits
    length_header = len(data).to_bytes(4, "big")

    data = length_header + data

    binary_message = ''.join(
        format(byte, '08b') for byte in data
    )

    # Check image capacity
    if len(binary_message) > len(pixels) * 3:
        raise ValueError("Message is too large for this image!")

    new_pixels = []
    bit_index = 0

    # Hide encrypted data inside pixels
    for pixel in pixels:

        new_pixel = []

        for color in pixel:

            if bit_index < len(binary_message):

                new_color = (color & 254) | int(
                    binary_message[bit_index]
                )

                bit_index += 1

            else:
                new_color = color

            new_pixel.append(new_color)

        new_pixels.append(tuple(new_pixel))

    # Save encoded image
    encoded_image = Image.new("RGB", image.size)
    encoded_image.putdata(new_pixels)
    encoded_image.save(output_path, format="PNG")

    print("Encrypted message hidden successfully!")


# Function to extract and decrypt the message
def decode_image(image_path, password):

    image = Image.open(image_path).convert("RGB")
    pixels = list(image.getdata())

    # Extract binary data
    binary_data = ""

    for pixel in pixels:
        for color in pixel:
            binary_data += str(color & 1)

    # Read data length
    if len(binary_data) < 32:
        raise ValueError("Invalid encoded image!")

    data_length = int(binary_data[:32], 2)

    required_bits = 32 + data_length * 8

    if required_bits > len(binary_data):
        raise ValueError("Invalid or incomplete hidden message!")

    # Extract encrypted data
    message_binary = binary_data[32:required_bits]

    data = bytes(
        int(message_binary[i:i + 8], 2)
        for i in range(0, len(message_binary), 8)
    )

    # Extract salt, nonce and ciphertext
    if len(data) < 48:
        raise ValueError("Invalid encrypted data!")

    magic_header = data[:4]

    if magic_header != b"STEG":
        raise ValueError("No valid hidden message found!")

    salt = data[4:20]
    nonce = data[20:32]
    encrypted_message = data[32:]

    # Generate key using entered password
    key = generate_key(password, salt)

    # Decrypt message
    aes = AESGCM(key)

    decrypted_message = aes.decrypt(
        nonce,
        encrypted_message,
        None
    )

    return decrypted_message.decode("utf-8")