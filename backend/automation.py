import time
import pandas as pd
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class NewDataHandler(FileSystemEventHandler):
    def on_modified(self, event):
        if event.src_path.endswith("trades.csv"):
            print("🚀 New Data Detected! Re-calculating Risk Scores...")
            df = pd.read_csv("trades.csv")
            # Pro tip: Show you can "Process" data automatically
            high_risk_count = len(df[df['amount'] > 40000])
            print(f"📊 Auto-Report: Found {high_risk_count} High Risk trades.")

if __name__ == "__main__":
    event_handler = NewDataHandler()
    observer = Observer()
    observer.schedule(event_handler, path='.', recursive=False)
    observer.start()
    print(" Watcher Started... Drop a new 'trades.csv' to trigger.")
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()