# engine.py
class VolumeRisk:
    def validate(self, amount):
        return "🚨 High Risk" if amount > 40000 else "✅ Low Risk"

class RiskScanner:
    def __init__(self):
        self.strategy = VolumeRisk()
        
    def check(self, amount):
        return self.strategy.validate(amount)