# recipes/urls.py
from django.urls import path
from . import views

urlpatterns = [
   path("recipes/create/", views.create_recipe, name='create_recipe'),
   path("recipes/", views.get_all_recipes, name='get_all_recipes'),
    path("recipes/<uuid:uuid>/", views.get_recipe_by_uuid, name='get_recipe_by_uuid'),

]
