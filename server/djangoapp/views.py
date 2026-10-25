

from .restapis import get_request, analyze_review_sentiments, post_review


def get_dealerships(request, state="All"):
    if state == "All":
        endpoint = "/fetchDealers"
    else:
        endpoint = "/fetchDealers/" + state
    dealerships = get_request(endpoint)
    return JsonResponse({"status": 200, "dealers": dealerships})


def get_dealer_reviews(request, dealer_id):
    endpoint = "/fetchReviews/dealer/" + str(dealer_id)
    reviews = get_request(endpoint)
    for review_detail in reviews:
        response = analyze_review_sentiments(review_detail['review'])
        review_detail['sentiment'] = response['sentiment']
    return JsonResponse({"status": 200, "reviews": reviews})


def get_dealer_details(request, dealer_id):
    endpoint = "/fetchDealer/" + str(dealer_id)
    dealership = get_request(endpoint)
    return JsonResponse({"status": 200, "dealer": dealership})


@csrf_exempt
def add_review(request):
    if not request.user.is_anonymous:
        data = json.loads(request.body)
        try:
            post_review(data)
            return JsonResponse({"status": 200})
        except Exception:
            return JsonResponse({"status": 401, "message": "Error in posting review"})
    return JsonResponse({"status": 403, "message": "Unauthorized"})