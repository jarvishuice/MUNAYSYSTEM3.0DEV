from core.Entities.wallet.walletEntity import WalletEntity
from abc import ABC,abstractmethod
from config.Logs.LogsActivity import Logs
class IWallet(ABC):
    def __init__(self):
       pass
    
    @abstractmethod
    def consultaSaldo(idCLeinte:int)->float:
        pass
    @abstractmethod
    def descuentowallet(wallet:WalletEntity)-> WalletEntity:
        pass
    @abstractmethod
    def reacargarWallet(wallet:WalletEntity)->WalletEntity:
        pass
    
    