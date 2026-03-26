import pandas as pd
import numpy as np


data = {
    'trade_id': range(1, 100001),
    'amount': np.random.randint(100, 50000, size=100000),
    'currency': np.random.choice(['USD', 'EUR', 'GBP'], size=100000)
}
pd.DataFrame(data).to_csv('trades.csv', index=False)
print("✅ Success! trades.csv created.")