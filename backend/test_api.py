#!/usr/bin/env python3
"""
Quick API test script for BearTracks.Nice
"""
import requests
import json

BASE_URL = "http://localhost:8000"

def test_api():
    print("🧪 Testing BearTracks.Nice API")
    print("=" * 40)
    
    try:
        # Test health endpoint
        print("1. Testing health endpoint...")
        response = requests.get(f"{BASE_URL}/")
        if response.status_code == 200:
            print("✅ API is running!")
            print(f"   Response: {response.json()}")
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return
        
        # Test locations endpoint
        print("\n2. Testing locations...")
        response = requests.get(f"{BASE_URL}/api/locations")
        if response.status_code == 200:
            locations = response.json()
            print(f"✅ Found {len(locations)} locations")
            for loc in locations[:3]:  # Show first 3
                print(f"   - {loc['name']}")
        else:
            print(f"❌ Locations failed: {response.status_code}")
        
        # Test found items endpoint
        print("\n3. Testing found items...")
        response = requests.get(f"{BASE_URL}/api/found")
        if response.status_code == 200:
            items = response.json()
            print(f"✅ Found {len(items)} items")
            for item in items[:3]:  # Show first 3
                print(f"   - {item['title']} ({item['status']})")
        else:
            print(f"❌ Found items failed: {response.status_code}")
        
        # Test stats endpoint
        print("\n4. Testing stats...")
        response = requests.get(f"{BASE_URL}/api/stats")
        if response.status_code == 200:
            stats = response.json()
            print("✅ Stats loaded:")
            print(f"   - Total items: {stats['total_items']}")
            print(f"   - Available: {stats['available_items']}")
            print(f"   - On hold: {stats['on_hold_items']}")
        else:
            print(f"❌ Stats failed: {response.status_code}")
        
        print("\n🎉 All tests passed! API is working correctly.")
        print("\nNext steps:")
        print("- Open http://localhost:3000 for the frontend")
        print("- Open http://localhost:8000/docs for API documentation")
        
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to API server")
        print("Make sure the backend is running:")
        print("  cd backend")
        print("  python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")

if __name__ == "__main__":
    test_api()