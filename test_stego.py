from steganography import encode_image, decode_image

# Original image
input_image = "test_images/original.png"

# Encoded image
output_image = "test_images/encoded.png"

# Secret message
secret_message = "Hello! This is my secret message."

# Password
password = "MySecret123"

# Hide the encrypted message
encode_image(input_image, output_image, secret_message, password)

# Extract and decrypt the message
extracted_message = decode_image(output_image, "password")

print("Original Message:", secret_message)
print("Extracted Message:", extracted_message)

# Verify the result
if secret_message == extracted_message:
    print("SUCCESS! AES encryption and steganography are working.")
else:
    print("FAILED! Messages do not match.")