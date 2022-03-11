from Crypto.Util.Padding import pad, unpad
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
import json
import sys

# Files
ivFile = 'iv.txt'
keyFile = 'key.txt'
jsonFile = 'fruits.json'
encryptedJsonFile = 'encrypted-json.txt'

algo = AES.MODE_CFB  # Block cipher mode
iv = get_random_bytes(16)  # Initialization vector
key = get_random_bytes(32)

cipher = AES.new(key, algo, iv)  # Generate cipher


def get_json():
    with open(jsonFile, 'r') as f:
        json_data = json.load(f)
        print(json_data)


def get_encrypted_json():
    with open(encryptedJsonFile, 'rb') as f:
        encrypted_json = f.read()
        print(encrypted_json)


def get_iv():
    with open(ivFile, 'rb') as f:
        iv_data = f.read()
        print(iv_data)


def get_key():
    with open(keyFile, 'rb') as f:
        key_data = f.read()
        print(key_data)


def handle_encryption():
    encrypted = cipher.encrypt(pad(get_encrypted_json()))
    print(encrypted)
    with open(encryptedJsonFile, 'wb')as f:
        f.write(encrypted)


def handle_decryption():
    decrypted = cipher.decrypt(unpad(get_encrypted_json()))
    print(decrypted)


# Run the program
arg = sys.argv[1]  # Command line args
if arg == 'encrypt':
    handle_encryption()
    sys.exit(0)
elif arg == 'decrypt':
    handle_decryption()
    sys.exit(0)
else:
    sys.exit("Argument required: python3 main.py [encrypt][decrypt]")

#========================================#
# Alternative ideas:
# import hashlib
# password = "password".encode()
# key = hashlib.sha256(password).digest()
#========================================#
