import random

#  meal database
MEALS_DB = {
    "vegetarian": [
        {"meal": "Vegetable Stir Fry", "calories": 300, "protein": 10},
        {"meal": "Chickpea Salad", "calories": 250, "protein": 12},
        {"meal": "Quinoa Bowl", "calories": 400, "protein": 15},
        {"meal": "Pasta Primavera", "calories": 350, "protein": 12},
        {"meal": "Stuffed Bell Peppers", "calories": 280, "protein": 9},
        {"meal": "Caprese Salad", "calories": 220, "protein": 8},
        {"meal": "Vegetable Curry", "calories": 450, "protein": 12},
        {"meal": "Falafel Wrap", "calories": 400, "protein": 14},
    ],
    "vegan": [
        {"meal": "Vegan Tacos", "calories": 350, "protein": 8},
        {"meal": "Tofu Scramble", "calories": 200, "protein": 18},
        {"meal": "Lentil Soup", "calories": 300, "protein": 10},
        {"meal": "Chickpea Stir Fry", "calories": 320, "protein": 15},
        {"meal": "Vegan Buddha Bowl", "calories": 450, "protein": 20},
        {"meal": "Avocado Toast", "calories": 250, "protein": 4},
        {"meal": "Sweet Potato and Black Bean Chili", "calories": 350, "protein": 12},
        {"meal": "Quinoa Salad with Lemon Dressing", "calories": 290, "protein": 10},
    ],
    "non-vegetarian": [
        {"meal": "Grilled Chicken Salad", "calories": 400, "protein": 30},
        {"meal": "Beef Stir Fry", "calories": 500, "protein": 35},
        {"meal": "Fish Tacos", "calories": 450, "protein": 28},
        {"meal": "Turkey Chili", "calories": 400, "protein": 32},
        {"meal": "Shrimp Fried Rice", "calories": 550, "protein": 30},
        {"meal": "Pork Tenderloin with Vegetables", "calories": 450, "protein": 40},
        {"meal": "Chicken Parmesan", "calories": 600, "protein": 45},
        {"meal": "Salmon with Quinoa and Spinach", "calories": 500, "protein": 40},
    ],
    "gluten-free": [
        {"meal": "Grilled Chicken with Vegetables", "calories": 300, "protein": 25},
        {"meal": "Zucchini Noodles with Marinara", "calories": 200, "protein": 8},
        {"meal": "Quinoa and Black Bean Salad", "calories": 320, "protein": 12},
        {"meal": "Eggplant Parmesan (gluten-free)", "calories": 450, "protein": 20},
        {"meal": "Stuffed Sweet Potatoes", "calories": 350, "protein": 10},
        {"meal": "Cauliflower Fried Rice", "calories": 250, "protein": 6},
        {"meal": "Shrimp and Avocado Salad", "calories": 400, "protein": 30},
        {"meal": "Baked Salmon with Asparagus", "calories": 500, "protein": 35},
    ],
}

def recommend_meals(diet_type):
    meals = MEALS_DB.get(diet_type.lower())
    if meals:
        return random.sample(meals, 2)  # Recommend 2 random meals
    return []
