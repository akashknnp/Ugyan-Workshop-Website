import razorpay
from django.http import JsonResponse
from .models import UserDetail
import json
from django.views.decorators.csrf import csrf_exempt


razorpay_client = razorpay.Client(auth=("rzp_live_4jlTaGujXP3Y2z", "Zwtf8O98PDNq1MsKBkAyQ4BP"))

@csrf_exempt
def save_user_details(request):
    if request.method == "POST":
        data = json.loads(request.body)
        name = data.get("name")
        email = data.get("email")
        phone_number = data.get("phone_number")
        try:
        # Save user details to the database
            user = UserDetail(name=name, email=email, phone_number=phone_number)
            user.save()
        except Exception as e:
            print("raised exec ",e)

        # Create Razorpay Order
        amount = 50000  # Amount in paise (e.g., 50000 = ₹500)
        currency = "INR"
        try:
            order = razorpay_client.order.create({
                "amount": amount,
                "currency": currency,
                "receipt": f"order_rcptid_{user.id}",
            })

            # Save the Razorpay order ID
            user.order_id = order["id"]
            user.save()
        except Exception as e:
            print("raised exec ",e)

        return JsonResponse({"success": True, "order_id": order["id"]})

    return JsonResponse({"success": False, "message": "Invalid method"})
