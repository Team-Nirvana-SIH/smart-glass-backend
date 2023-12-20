import asyncio
import aiohttp

async def call_api_async():
    api_url = 'http://localhost:5001/api/object/658068fda0c5d9fa406df3cf'  # Replace this with your API endpoint URL

    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(api_url) as response:
                # Check if the request was successful (status code 200)
                if response.status == 200:
                    data = await response.json()  # Convert response to JSON format
                    print("API Response:", data)
                else:
                    print("Failed to call API. Status code:", response.status)
    except aiohttp.ClientError as e:
        print("Error calling API:", e)

# Run the asynchronous function
asyncio.run(call_api_async())