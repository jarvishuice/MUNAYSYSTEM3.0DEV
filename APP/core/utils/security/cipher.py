import hashlib
class Cypher:
    def __init__(self):
        print("iniciando unidad de cifrado .... ")
    def encriptar(self, cadena: str) -> str:
        print(f"text a cipher{cadena}")
        print(f" result cipher -> {hashlib.sha256(cadena.encode()).hexdigest()}")
        return hashlib.sha256(cadena.encode()).hexdigest()
    
if __name__ == "__main__":
    t = Cypher()
    t.encriptar("123456789")