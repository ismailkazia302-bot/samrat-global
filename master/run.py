import os
import sys
import uvicorn

if __name__ == "__main__":
    backend_dir = os.path.join(os.path.dirname(__file__), "backend")
    sys.path.insert(0, backend_dir)
    print("=" * 60)
    print(">>> Starting Apex AI Business Salesman Agent System...")
    print("-> Dashboard URL : http://localhost:8000")
    print("-> Widget Script : http://localhost:8000/widget.js")
    print("-> API Docs      : http://localhost:8000/docs")
    print("=" * 60)
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True, app_dir=backend_dir)
